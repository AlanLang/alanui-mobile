import * as React from 'react';
import * as classNames from 'classnames';
import Button from '../Button/Button';
import {getOtherProperties} from '../common/Utils';
import {ButtonNavigationItemProps} from './PropsType';

export default class ButtonNavigationItem extends React.PureComponent<ButtonNavigationItemProps, {}> {
    static defaultProps: ButtonNavigationItemProps = {
        prefixCls: 'bm-ButtonNavigationItem',
    };

    handleClick = (event: any) => {
        if (this.props.onClick) {
            (this.props.onClick as (event: any) => void)(event);
        }
    }

    render() {
        const {active, children, className, icon,selectedIcon, label, onClick, prefixCls, ...other} = this.props;
        const styleClass = classNames(
            prefixCls, className,
            {
                [`${prefixCls}-active`]: active,
            },
        );
        const otherProps = getOtherProperties(other, ['onClick']);
        const seIcon = selectedIcon?selectedIcon:icon;
        return (
            <Button className={styleClass} onClick={this.handleClick} {...otherProps}>
                <span className={`${prefixCls}-inner`}>
                    {active?seIcon:icon}
                    <span>{label}</span>
                    {children}
                </span>
            </Button>
        );
    }
}
