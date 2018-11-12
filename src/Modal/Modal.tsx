import React from 'react';
import ReactModal from 'react-modal';

import matchMaxMediaWidth, { EventResize } from './helpers/matchMaxMediaWidth';

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

const closeTimeoutMS = 500;
export default class Modal extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);

    if (props.ariaHideApp) {
      ReactModal.setAppElement(props.setAppElement);
    }
  }
  resizeListener = (e: Event | EventResize) => {
    this.setState({
      matchMediaWidth: matchMaxMediaWidth(this.props.maxMediaWidth)(e),
    });
  };

  state = {
    isOpen: false,
    directionClass: '',
    matchMediaWidth: false,
  };

  static defaultProps: { isOpen: boolean } = {
    isOpen: false,
  };

  static getDerivedStateFromProps(props: PropTypes, state: StateTypes) {
    if (props.isOpen !== state.isOpen) {
      const nextState: Partial<StateTypes> = {
        isOpen: props.isOpen,
      };

      if (props.isOpen) {
        // generate directionClass at each opening for right closing
        nextState.directionClass = `modal-slider--${props.directionFrom}`;
      }

      return nextState;
    }

    return null;
  }

  componentDidUpdate(prevProps: PropTypes) {
    if (this.props.isOpen && !prevProps.isOpen) {
      if (this.props.maxMediaWidth) {
        // init
        this.resizeListener({ target: window });
        // subscribe
        window.addEventListener('resize', this.resizeListener, {
          passive: false,
        });
      }
    }

    if (!this.props.isOpen && prevProps.isOpen) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  render() {
    const { children, className, overlayClassName, ...props } = this.props;
    const { directionClass, matchMediaWidth } = this.state;

    return (
      <ReactModal
        ariaHideApp={false}
        contentLabel={'Modal'}
        closeTimeoutMS={closeTimeoutMS}
        {...props}
        className={`modal-slider ${directionClass} ${className || ''}`}
        overlayClassName={`modal-slider--overlay ${overlayClassName || ''}`}
        style={{
          content: {
            width: matchMediaWidth ? '100%' : this.props.width || '60%',
          },
        }}
      >
        {children}
      </ReactModal>
    );
  }
}
