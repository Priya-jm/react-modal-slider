import React, { ReactElement, ReactInstance, ReactNode, ReactType } from 'react';
import ReactModal from 'react-modal';

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
interface StateTypes {}

const closeTimeoutMS = 500;

export default class Modal extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);

    if (props.ariaHideApp) {
      ReactModal.setAppElement(props.setAppElement);
    }
  }

  static defaultProps: { isOpen: boolean } = {
    isOpen: false,
  };

  render() {
    const {
      children,
      directionFrom = 'right',
      className,
      overlayClassName,
      closeComponent: CloseComponent,
      ...props
    } = this.props;
    const directionClass = `slide-pane--${directionFrom}`;

    return (
      <ReactModal
        ariaHideApp={false}
        contentLabel={'Modal'}
        closeTimeoutMS={closeTimeoutMS}
        {...props}
        className={`slide-pane ${directionClass} ${className || ''}`}
        overlayClassName={`slide-pane--overlay ${overlayClassName || ''}`}
        style={{
          content: { width: this.props.width || '80%' },
        }}
      >
        <div>
          {children}
          {CloseComponent ? (
            <CloseComponent />
          ) : (
            <button
              className={'slide-pane--close'}
              aria-label={'close'}
              onClick={this.props.onRequestClose}
            >
              <img src={'/close.svg'} />
            </button>
          )}
        </div>
      </ReactModal>
    );
  }
}
