import * as React from 'react';
import * as classNames from 'classnames';
import {NavLink} from 'react-router-dom';
import {BaseProps} from '../../src/components/common/BaseProps';
import {Content} from '../../src/components/Page';
import Button from '../../src/components/Button';

interface IntroduceProps extends BaseProps {
}

export default class Introduce extends React.PureComponent<IntroduceProps, any> {
    render() {
        const {className, ...other} = this.props;
        const styleClass = classNames(
            'Introduce',
            className,
        );
        return (
            <Content className={styleClass} {...other}>
                <section className="Introduce-jumbotron">
                    <img src="assets/logo-white.svg" width="200" height="200" alt=""/>
                    <h1 style={{fontSize:50}} className="margin-top-20 text-center">alanui-mobile</h1>
                    <div className="subtitle">
                        基于Material Design的React移动组件库
                    </div>
                    <div className="margin-top-30 text-center">
                        <Button size="lg" theme="success" to="#/docs/getting-started">
                            开始
                        </Button>
                        <Button size="lg" className="margin-left-20" to="#/components/overview">
                            示例
                        </Button>
                    </div>
                </section>
            </Content>
        );
    }
}
