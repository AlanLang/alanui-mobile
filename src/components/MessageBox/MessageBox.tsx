import * as React from 'react';
import * as classNames from 'classnames';
import Message from '../Message';
import Inputtext from '../Inputtext'
import {ZoomIn} from '../Transitions';
import {MessageBoxProps} from './PropsType';

let messageInstance: any;

const getMessageInstance = (props: any) => {
    if (messageInstance) {
        return messageInstance;
    }
    return Message.create({...props});
};

export class MessageBox {
    props: MessageBoxProps;
    currentItem: any;
    inputNode: any;

    constructor(props: any) {
        props.delay = props.delay || 0;
        props.className = 'MessageBox';
        props.visible = true;
        this.props = props;
        messageInstance = getMessageInstance({
            hideBackdrop: true,
            className: 'MessageBox-group',
            onClose: props.onClose || (() => false),
        });
        this.currentItem = this.create();
    }

    componentDidMount () {
        console.log(this.props)
    }

    handleClose = () => {
        if(this.props.onCancle){
            (this.props.onCancle as () => void)();
        }else{
            messageInstance.remove(this.currentItem.key);
        }
    }

    handleConfirm = () => {
        if (this.props.type === 'prompt') {
            if (this.props.onConfirm) {
                (this.props.onConfirm as (event: any) => void)(this.inputNode.state.value);
            }
        }else if (this.props.onConfirm){
            (this.props.onConfirm as () => void)();
        }else{
            messageInstance.remove(this.currentItem.key);
        }
    }

    getRef = (node: any) => {
        this.inputNode = node;
    }

    create() {
        const props = Object.assign({}, this.props);
        const {
            inputType = 'text', confirmButtonText = '确认', cancelButtonText = '取消',
            type, title, message, onClose, placeholder = '',
            showCancelButton, showConfirmButton, visible,confirmStyle,cancleStyle
        }: any = props;
        props.message = (
            <ZoomIn in={visible}>
                <div
                    className={
                        classNames(['MessageBox-item', `MessageBox-${type}`])}
                    key="MessageBox-item"
                >
                    <div className="MessageBox-item-wrapper">
                        {title ? (<div className="MessageBox-header">
                            <div className="MessageBox-header-title">{title}</div>
                        </div>) : null}
                        <div style={{padding:20}}>
                            {message}
                            {type === 'prompt' ? (
                                <Inputtext autoFocus={true} style={{marginTop:18}} type={inputType} placeholder={placeholder} ref={this.getRef}/>) : null}
                        </div>
                        <div className="MessageBox-btn-group">
                            {showCancelButton ? (<button
                                className="MessageBox-btn-cancel"
                                onClick={this.handleClose}
                                style={cancleStyle}
                            >
                                {cancelButtonText}
                            </button>) : null}
                            {showConfirmButton ? (<button
                                className="MessageBox-btn-confirm"
                                onClick={this.handleConfirm}
                                style={confirmStyle}
                            >
                                {confirmButtonText}
                            </button>) : null}
                        </div>
                    </div>
                </div>
            </ZoomIn>
        );
        props.onClose = () => {
            if (onClose) {
                onClose();
            }
        };
        return messageInstance.create({...props});
    }
}

export default {
    show(props: any) {
        return new MessageBox({...props});
    },
    alert(props: any) {
        props.type = 'alert';
        props.showConfirmButton = true;
        return new MessageBox({...props});
    },
    confirm(props: any) {
        props.type = 'confirm';
        props.showCancelButton = true;
        props.showConfirmButton = true;
        return new MessageBox({...props});
    },
    prompt(props: any) {
        props.type = 'prompt';
        props.showCancelButton = true;
        props.showConfirmButton = true;
        return new MessageBox({...props});
    },
    close(e:MessageBox) {
        if (messageInstance) {
            messageInstance.remove(e.currentItem.key);
        }
    },
    closeAll(){
        if (messageInstance) {
            messageInstance.clearAll();
            messageInstance = null;
        }
    }
};
