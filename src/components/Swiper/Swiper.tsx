import * as React from 'react';
import * as classNames from 'classnames';
import {getOtherProperties} from '../common/Utils';
import {setTransitionDuration, addEventListener, removeEventListener, parents} from '../common/Dom';
import {preloadImages} from './LoadImage';
import {SwiperProps, SwiperState} from './PropsType';

export default class Swiper extends React.PureComponent<SwiperProps, any> {
    static defaultProps: SwiperProps = {
        activeIndex: 0,
        autoplay: false,
        autoplayDisableOnInteraction: false,
        centerMode: false,
        direction: 'horizontal',
        easing: 'ease',
        effect: 'slide',
        initialSlide: 0,
        loop: false,
        observe: false,
        observeParents: false,
        on: {},
        pagination: true,
        paginationClickable: false,
        prefixCls: 'bm-Swiper',
        spaceBetween: 0,
        speed: 300,
        delay: 3000,
        touch: true,
    };
    state: SwiperState = {
        activeIndex: 0,
        height: 0,
        opacity: 1,
        x: 0,
        y: 0,
        width: 0,
    };
    wrapper: any;
    slider: any;
    isMobile: boolean;
    dragging: boolean;
    autoPlayTimer: any;
    count: number;
    touches: any = {};
    isRunning: boolean = false;
    imagesLoaded: number = 0;
    centerOffset: number = 0;
    observers: Array<any> = [];

    constructor(props: SwiperProps) {
        super(props);
        this.isMobile = 'ontouchstart' in document;
    }

    componentWillMount() {
        if (this.props.on && this.props.on.init!) {
            (this.props.on as any).init();
        }
        if (this.props.autoplay) {
            this.startAutoplay();
        }
        if (this.props.updateOnImagesReady!) {
            preloadImages(this.wrapper, this.imagesLoaded, () => {
                if (this.props.on && this.props.on.imagesReady!) {
                    (this.props.on as any).imagesReady();
                }
            }, (imagesLoaded: number) => {
                this.imagesLoaded = imagesLoaded;
            });
        }
    }

    componentDidMount() {
        if (window) {
            addEventListener(window, 'resize', this.onWindowResized);
        }
    }

    componentWillReceiveProps(nextProps: SwiperProps) {
        if ('activeIndex' in nextProps && this.props.activeIndex !== nextProps.activeIndex) {
            this.slideTo(nextProps.activeIndex!);
        }
    }

    componentWillUnmount() {
        this.wrapper = null;
        this.slider = null;
        this.touches = null;
        this.clearAutoplay();
        if (this.observers.length) {
            for (const observer of this.observers) {
                observer.disconnect();
            }
        }
        removeEventListener(window, 'resize', this.onWindowResized);
    }

    isHorizontal() {
        return this.props.direction === 'horizontal';
    }

    getCurrentSlide(slide: number) {
        let index: number = slide;
        if (index < 0) {
            index = 0;
        } else {
            index = index % this.count;
        }
        return index;
    }

    slideTo(index: number, speed: number = this.props.speed!) {
        this.isRunning = true;
        const {width, height} = this.state;
        const {effect, loop, spaceBetween} = this.props;
        let styles: any;
        if (!loop) {
            index = this.getCurrentSlide(index);
        }
        setTransitionDuration(this.slider, speed);
        let activeIndex = index;
        if (effect === 'fade') {
            if (activeIndex < 0) {
                activeIndex = this.count - 1;
            } else if (activeIndex >= this.count) {
                activeIndex = 0;
            }
        }
        if (this.isHorizontal()) {
            styles = {
                x: -(width + spaceBetween!)! * activeIndex + this.centerOffset,
                activeIndex,
                opacity: 1,
            };
        } else {
            styles = {
                y: -(height! + spaceBetween!) * activeIndex,
                activeIndex,
                opacity: 1,
            };
        }
        if (this.props.on && this.props.on.transitionStart!) {
            (this.props.on as any).transitionStart(index, this);
        }
        this.setState(styles, () => {
            if (!speed) {
                this.isRunning = false;
            }
        });
    }

    slidePrev = (disabled: boolean = true) => {
        if (disabled) {
            return;
        }
        let {activeIndex} = this.state;
        activeIndex--;
        this.slideTo(activeIndex);
    }

    slideNext = (disabled: boolean = true) => {
        if (disabled) {
            return;
        }
        let {activeIndex} = this.state;
        activeIndex++;
        this.slideTo(activeIndex);
    }

    handleNavigation = (disabled: boolean, next: boolean, event: any) => {
        event.stopPropagation();
        if (disabled) {
            return;
        }
        if (next) {
            this.slideNext(disabled);
        } else {
            this.slidePrev(disabled);
        }
    }

    getPoint(e: any) {
        const touchEvent = this.isMobile ? e.changedTouches[0] : e;
        return {
            x: touchEvent.pageX || touchEvent.clientX,
            y: touchEvent.pageY || touchEvent.clientY,
        };
    }

    swipeStart = (event: any) => {
        if (this.props.touch && !this.isRunning) {
            event.stopPropagation();
            const {x, y} = this.getPoint(event);
            this.dragging = true;
            setTransitionDuration(this.slider, 0);
            if (this.props.autoplayDisableOnInteraction) {
                this.clearAutoplay();
            }
            this.touches.startX = x;
            this.touches.startY = y;
        }
    }

    swipeMove = (event: any) => {
        event.stopPropagation();
        if (this.dragging && !this.isRunning) {
            const {x, y} = this.getPoint(event);
            const diffX = x - this.touches.startX;
            const diffY = y - this.touches.startY;
            const {effect, spaceBetween} = this.props;
            const {width, activeIndex, height}: any = this.state;
            if (effect === 'slide') {
                const maxTranslate = this.isHorizontal() ? (width / 2) : (height / 2);
                const minTranslate = 20;
                const diff = this.isHorizontal ? diffX : diffY;
                const position = diff / width * (maxTranslate - minTranslate);
                let translate = this.isHorizontal() ? (-(width + spaceBetween!) * activeIndex + position) :
                    (-(height + spaceBetween!) * activeIndex + position);
                const setPosition = (size: number) => {
                    const collapseEnd = (size * (this.count - 1) + maxTranslate);
                    if (!this.props.loop) {
                        if (translate > maxTranslate) {
                            translate = maxTranslate;
                        } else if (Math.abs(translate) > collapseEnd) {
                            translate = -collapseEnd;
                        }
                    }
                };
                if (this.isHorizontal()) {
                    setPosition(width);
                    this.setState({
                        x: translate + this.centerOffset,
                    });
                } else {
                    setPosition(height);
                    this.setState({
                        y: translate,
                    });
                }
            } else {
                const opacity = this.isHorizontal() ?
                    (Math.abs(diffX) / width) : Math.abs(diffY) / height;
                this.setState({
                    opacity,
                });
            }
            this.touches.diffX = diffX;
            this.touches.diffY = diffY;
            this.touches.currentX = x;
            this.touches.currentY = y;
        }
    }

    swipeEnd = (event: any) => {
        event.stopPropagation();
        if (this.dragging && !this.isRunning) {
            const {width, height}: any = this.state;
            let activeIndex: any = this.state.activeIndex;
            const {loop} = this.props;
            const {diffX, diffY} = this.touches;
            const diffWidth = width / 5;
            const diffHeight = height / 5;
            const getActiveIndex = (diff: any, dist: any) => {
                if (Math.abs(diff) > dist) {
                    if (diff < 0 && (loop || activeIndex !== this.count - 1)) {
                        activeIndex++;
                    } else if (diff > 0 && (loop || activeIndex !== 0)) {
                        activeIndex--;
                    }
                }
            };
            if (this.isHorizontal()) {
                getActiveIndex(diffX, diffWidth);
            } else {
                getActiveIndex(diffY, diffHeight);
            }
            if (this.props.on && this.props.on.slideChange!) {
                (this.props.on as any).slideChange(activeIndex, this);
            }
            if (this.props.effect === 'fade') {
                if (activeIndex < 0) {
                    activeIndex = this.count - 1;
                } else if (activeIndex >= this.count) {
                    activeIndex = 0;
                }
            }
            this.slideTo(activeIndex);
        }
        this.dragging = false;
    }

    getBulletItem(bullets: number[]) {
        const {pagination, prefixCls} = this.props;
        return bullets.map((v: number) => {
            if (typeof pagination === 'function') {
                return pagination(v);
            }
            const styleClass = classNames(
                `${prefixCls}-pagination-bullet`,
                {
                    [`${prefixCls}-pagination-bullet-active`]: this.state.activeIndex === v,
                    [`${prefixCls}-pagination-clickable`]: this.props.paginationClickable,
                },
            );
            let event = {};
            if (this.props.paginationClickable) {
                event = {
                    onMouseDown: !this.isMobile ? this.paginationClick.bind(this, v) : null,
                    onTouchStart: this.isMobile ? this.paginationClick.bind(this, v) : null,
                };
            }
            return (<div key={v} {...event} className={styleClass}/>);
        });
    }

    getNavigation() {
        const nav: any = this.props.navigation;
        const {loop, prefixCls} = this.props;
        const {activeIndex} = this.state;
        const toPrev: boolean = activeIndex <= 0 && !loop;
        const toNext: boolean = activeIndex >= this.count - 1 && !loop;
        const prevClass = classNames(
            `${prefixCls}-prev`,
            {
                [`${prefixCls}-disabled`]: toPrev,
            },
        );
        const nextClass = classNames(
            `${prefixCls}-next`,
            {
                [`${prefixCls}-disabled`]: toNext,
            },
        );
        const prevEvent = {
            onMouseDown: !this.isMobile ? this.handleNavigation.bind(this, toPrev, false) : null,
            onTouchStart: this.isMobile ? this.handleNavigation.bind(this, toPrev, false) : null,
        };
        const nextEvent = {
            onMouseDown: !this.isMobile ? this.handleNavigation.bind(this, toNext, true) : null,
            onTouchStart: this.isMobile ? this.handleNavigation.bind(this, toNext, true) : null,
        };
        const prevEl = (<div key="prev" className={prevClass} {...prevEvent}>{nav.prevEl}</div>);
        const nextEl = (<div key="next" className={nextClass} {...nextEvent}>{nav.nextEl}</div>);
        return [prevEl, nextEl];
    }

    paginationClick(index: number) {
        if (this.props.autoplayDisableOnInteraction) {
            this.clearAutoplay();
        }
        this.slideTo(index);
    }

    updateSize(size: any, slideSize: any) {
        if (size) {
            if (isNaN(Number(size))) {
                if (size.indexOf('%')) {
                    slideSize *= size / 100;
                } else {
                    slideSize = parseFloat(size);
                }
            } else {
                if (size < 1) {
                    slideSize *= size;
                } else {
                    slideSize = size;
                }
            }
        }
        return slideSize;
    }

    reset(cb?: any) {
        if (!this.slider.firstElementChild) {
            return;
        }
        const height = this.slider.firstElementChild.offsetHeight;
        const slideWidth: any = this.props.slideWidth!;
        const slideHeight: any = this.props.slideHeight!;
        const width = this.wrapper.offsetWidth;
        if (this.props.centerMode) {
            this.centerOffset = Math.round(width * (1 - slideWidth) / 2);
        }
        this.setState({
            width: this.updateSize(slideWidth, width),
            height: this.updateSize(slideHeight, height),
        }, () => {
            if (cb) {
                cb();
            }
        });
    }

    getWrapperRef = (node: any) => {
        if (!this.wrapper && node) {
            const {initialSlide} = this.props;
            this.wrapper = node;
            this.slider = node.firstElementChild;
            this.reset(() => {
                this.slideTo(this.getCurrentSlide(initialSlide!), 0);
            });
            if (this.props.autoplay) {
                this.observer();
            }
        }
    }

    startAutoplay() {
        if (this.autoPlayTimer) {
            return false;
        }
        this.autoPlayTimer = setInterval(() => {
            setTransitionDuration(this.slider, this.props.speed!);
            this.slideNext(false);
        }, this.props.delay);
    }

    clearAutoplay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }

    onWindowResized = () => {
        const {activeIndex} = this.state;
        this.reset(() => {
            this.slideTo(this.getCurrentSlide(activeIndex), 0);
        });
    }

    onTransitionEnd = () => {
        let {activeIndex} = this.state;
        if (activeIndex < 0) {
            activeIndex = this.count - 1;
        } else if (activeIndex >= this.count) {
            activeIndex = 0;
        }
        if (this.props.on && this.props.on.transitionEnd!) {
            (this.props.on as any).transitionEnd(activeIndex, this);
        }
        this.slideTo(activeIndex, 0);
        if (this.props.autoplay && !this.props.autoplayDisableOnInteraction) {
            this.startAutoplay();
        }
        this.isRunning = false;
    }

    attach(target: any) {
        const win: any = window;
        const MutationObserver = win.MutationObserver ||
            win.WebKitMutationObserver || win.MozMutationObserver;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach(() => {
                this.reset();
            });
        });

        // 配置观察选项:
        const config = {attributes: true, childList: true, characterData: true};

        // 传入目标节点和观察选项
        observer.observe(target, config);
        return observer;
    }

    observer = () => {
        if (this.props.observe) {
            // 创建观察者对象
            this.observers.push(this.attach(this.wrapper.parentNode));
        }

        if (this.props.observeParents) {
            const containerParents = parents(this.wrapper);
            for (const container of containerParents) {
                this.observers.push(this.attach(container));
            }
        }
    }

    render() {
        const {
            className, children: childrenProps, direction, easing,
            effect, loop, navigation, pagination, prefixCls, spaceBetween, speed, ...other
        } = this.props;
        const horizontal: boolean = this.isHorizontal();
        const styleClass = classNames(prefixCls, className, `${prefixCls}-${direction}`);
        const bullets: number[] = [];
        const {activeIndex, width, height} = this.state;
        let x: any = this.state.x;
        let y: any = this.state.y;
        this.count = React.Children.count(childrenProps);
        const isFade: boolean = effect === 'fade';
        const children = React.Children.map(childrenProps,
            (child: React.ReactElement<any>, index: number) => {
                if (!React.isValidElement(child)) {
                    return;
                }
                let opacity = 0;
                let left: number = horizontal ? index * width! : 0,
                    top: number = !horizontal ? index * height! : 0;
                const {diffX, diffY} = this.touches, childStyles: any = {};
                if (!isFade) {
                    if (loop && this.count > 2) {
                        if (this.count <= activeIndex + 1 && index === 0) {
                            horizontal ? (left = (width + spaceBetween!) * this.count) : top = height! * this.count;
                            childStyles.transform = `translate3d(${left}px, ${top}px, 0)`;
                            childStyles.WebkitTransform = `translate3d(${left}px, ${top}px, 0)`;
                        } else if (activeIndex <= 0 && this.count === index + 1) {
                            horizontal ? left = -(width + spaceBetween!) * this.count : top = -height! * this.count!;
                            childStyles.transform = `translate3d(${left}px, ${top}px, 0)`;
                            childStyles.WebkitTransform = `translate3d(${left}px, ${top}px, 0)`;
                        }
                    }
                    opacity = 1;
                } else {
                    childStyles.transform = `translate3d(-${left}px, -${top}px, 0)`;
                    childStyles.WebkitTransform = `translate3d(-${left}px, -${top}px, 0)`;
                    if (this.dragging) {
                        const diff = horizontal ? diffX : diffY;
                        if (loop && ((activeIndex <= 0 && diff > 0 && this.count === index + 1) ||
                            (this.count >= activeIndex + 1 && diff < 0 && index === 0))) {
                            opacity = this.state.opacity!;
                        }
                        if (diff > 0 && activeIndex > 0 && activeIndex < this.count &&
                            activeIndex - 1 === index) {
                            opacity = this.state.opacity!;
                        }
                        if (diff < 0 && activeIndex >= 0 && activeIndex < this.count - 1 &&
                            activeIndex + 1 === index) {
                            opacity = this.state.opacity!;
                        }
                    }
                    if (index === activeIndex) {
                        opacity = 1;
                    }
                }
                if (isFade) {
                    let duration = speed;
                    if (this.dragging) {
                        duration = 0;
                    }
                    childStyles.transition = `opacity ${duration}ms ${easing}`;
                    childStyles.WebkitTransition = `opacity ${duration}ms ${easing}`;
                }
                const childClass = classNames(
                    `${prefixCls}-slide`,
                    {
                        [`${prefixCls}-slide-active`]: activeIndex === index,
                    },
                );
                if (!isFade && spaceBetween! > 0) {
                    childStyles.marginRight = spaceBetween;
                }
                childStyles.width = width;
                childStyles.opacity = opacity;
                bullets.push(index);
                return React.cloneElement((
                    <div className={childClass} key={index} style={childStyles}>
                        {child}</div>), {});
            });
        if (isFade) {
            x = y = 0;
        }
        const otherProps: any = getOtherProperties(other,
            ['activeIndex', 'autoplayDisableOnInteraction', 'autoplay', 'centerMode', 'delay',
                'initialSlide', 'observeParents', 'observe', 'paginationClickable', 'slideWidth', 'touchRatio', 'touch']);
        const styles = isFade ? {} : {
            transform: horizontal ? `translate3d(${x}px, 0, 0)` : `translate3d(0, ${y}px, 0)`,
            WebkitTransform: horizontal ? `translate3d(${x}px, 0, 0)` : `translate3d(0, ${y}px, 0)`,
            msTransform: horizontal ? `translate3d(${x}px, 0, 0)` : `translate3d(0, ${y}px, 0)`,
            WebkitTransition: `-webkit-transform ${speed}ms ${easing}`,
            transition: `transform ${speed}ms ${easing}`,
        };
        return (
            <div className={styleClass} {...otherProps}>
                <div
                    className={`${prefixCls}-wrapper`}
                    ref={this.getWrapperRef}
                    style={{height: horizontal ? '100%' : height!}}
                    onMouseDown={this.isMobile ? () => false : this.swipeStart}
                    onMouseMove={this.isMobile ? () => false : this.swipeMove}
                    onMouseUp={this.isMobile ? () => false : this.swipeEnd}
                    onMouseLeave={this.isMobile ? () => false : this.swipeEnd}
                    onTouchStart={this.isMobile ? this.swipeStart : () => false}
                    onTouchMove={this.isMobile ? this.swipeMove : () => false}
                    onTouchEnd={this.isMobile ? this.swipeEnd : () => false}
                >
                    <div className={`${prefixCls}-list`} style={styles} onTransitionEnd={this.onTransitionEnd}>
                        {children}
                    </div>
                </div>
                {pagination ? (<div className={`${prefixCls}-pagination`}>
                    <div className={`${prefixCls}-pagination-bullets`}>{this.getBulletItem(bullets)}</div>
                </div>) : null}
                {navigation ? (this.getNavigation()) : null}
            </div>
        );
    }
}
