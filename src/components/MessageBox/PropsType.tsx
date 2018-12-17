import * as React from 'react';

export interface MessageBoxProps {
    delay?: number;
    hideBackdrop?:true|false;
    confirmButtonText?: React.ReactNode | string;
    cancelButtonText?: React.ReactNode | string;
    confirmStyle?:object;
    cancleStyle?:object;
    inputType?: string;
    message: React.ReactNode | string;
    placeholder?: string;
    showConfirmButton?: boolean;
    showCancelButton?: boolean;
    title?: React.ReactNode | string;
    type?: string;
    onConfirm?: (event?: any) => void;
    onClose?: (event: any) => void;
    onCancle?:() => void;
}
