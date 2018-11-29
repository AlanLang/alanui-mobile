import * as React from 'react';
import * as classNames from 'classnames';
import {BaseProps} from '../../src/components/common/BaseProps';
import {Content} from '../../src/components/Page';
import LazyLoad from '../../src/components/LazyLoad';

interface LazyLoadCaseProps extends BaseProps {
}

export default class LazyLoadCase extends React.PureComponent<LazyLoadCaseProps, {}> {
    static defaultProps: LazyLoadCaseProps = {
        prefixCls: 'bm-LazyLoadCase',
    };

    render() {
        const {className, prefixCls} = this.props;
        const styleClass = classNames(
            prefixCls, className,
        );
        return (
            <Content className={styleClass}>
                <LazyLoad height={200}>
                    <img src="assets/images/lists/image1.jpg" style={{width: '100%'}} alt=""/>
                </LazyLoad>
                <div className="padding-10">
                    13232145214124324213412353214532
                </div>
                <LazyLoad height={200}>
                    <img src="assets/images/lists/image2.jpg" style={{width: '100%'}} alt=""/>
                </LazyLoad>
                <div className="padding-10">
                   13232145214124324213412353214532
                </div>
                <LazyLoad height={200}>
                    <img src="assets/images/lists/image3.jpg" style={{width: '100%'}} alt=""/>
                </LazyLoad>
                <LazyLoad height={200}>
                    <img src="assets/images/lists/image4.jpg" style={{width: '100%'}} alt=""/>
                </LazyLoad>
            </Content>
        );
    }
}
