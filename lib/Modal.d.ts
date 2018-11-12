import React from 'react';
import ReactModal from 'react-modal';
import { EventResize } from './helpers/matchMaxMediaWidth';
import './modal.scss';
interface PropTypes extends ReactModal.Props {
    directionFrom?: string;
    className?: string;
    overlayClassName?: string;
    width?: string;
    onRequestClose?: () => void;
    isOpen: boolean;
    contentLabel?: string;
    setAppElement: string | HTMLElement;
    ariaHideApp: boolean;
    maxMediaWidth: number;
}
interface StateTypes {
    isOpen: boolean;
    directionClass: string;
    matchMediaWidth: boolean;
}
export default class Modal extends React.Component<PropTypes, StateTypes> {
    constructor(props: PropTypes);
    resizeListener: (e: Event | EventResize) => void;
    state: {
        isOpen: boolean;
        directionClass: string;
        matchMediaWidth: boolean;
    };
    static defaultProps: {
        isOpen: boolean;
    };
    static getDerivedStateFromProps(props: PropTypes, state: StateTypes): Partial<StateTypes> | null;
    componentDidUpdate(prevProps: PropTypes): void;
    render(): JSX.Element;
}
export {};
