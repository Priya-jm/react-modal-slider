import React, { ReactType } from 'react';
import './modal.scss';
interface PropTypes {
    directionFrom?: string;
    className?: string;
    overlayClassName?: string;
    width?: string;
    onRequestClose?: () => void;
    isOpen: boolean;
    contentLabel?: string;
    setAppElement: string | HTMLElement;
    ariaHideApp: boolean;
    closeComponent?: ReactType;
}
interface StateTypes {
}
export default class Modal extends React.Component<PropTypes, StateTypes> {
    constructor(props: PropTypes);
    static defaultProps: {
        isOpen: boolean;
    };
    render(): JSX.Element;
}
export {};
