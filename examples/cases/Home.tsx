import * as React from 'react';
import {BaseProps} from '../../src/components/common/BaseProps';
import * as classNames from 'classnames';
import {Content} from '../../src/components/Page';
import Button from '../../src/components/Button';

interface IntroduceProps extends BaseProps {
}

export default class Introduce extends React.PureComponent<IntroduceProps, any> {
    render() {
        const {className, ...other} = this.props;
        const styleClass = classNames(
            'Home',
            className,
        );
        return (
            <div className="home-page">
            	<div className="home-left">
            		<div className="home-logo">
            			<img src="assets/logo-white.svg" width="50" height="50" alt=""/>
            			<div>alanui-mobile</div>
            		</div>
            		<div className="home-content">
	            		<div style={{height:320}}>
	            			<div className="index-title">alanui-mobile</div>
	                        <div className="index-line"></div>
	            			<div className="index-content">基于Material Design的React移动组件库</div>
	            			<div className="index-buttons">
	            				<Button size="lg" theme="success" to="#/docs/getting-started">开始</Button>
	        					<Button size="lg" className="margin-left-20" to="#/components/overview">示例</Button>
	            			</div>
	            		</div>
            		</div>
            	</div>
                <div className="home-right"></div>
            </div>
        );
    }
}