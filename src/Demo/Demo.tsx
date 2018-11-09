import React from 'react';

import Modal from '../Modal';

import './demo.scss';

export default class Demo extends React.Component {
  state = {
    isOpen: false,
  };

  toggleVisibleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  renderCloseComponent = () => (
    <button className={'close'} onClick={this.toggleVisibleModal}>
      <img src={'/img/close.svg'} />
    </button>
  );

  render() {
    return (
      <div id={'demo'}>
        <button onClick={this.toggleVisibleModal}>Open modal</button>
        <Modal
          // default false
          isOpen={this.state.isOpen}
          // default 60%
          width={'40%'}
          // default from right
          directionFrom={'right'}
          // default Modal
          contentLabel={'Demo Modal'}
          onRequestClose={this.toggleVisibleModal}
          // optional for accessibility
          setAppElement={'#root'}
          // default false allows you to skip setAppElement prop for react-modal
          ariaHideApp={true}
          // optional
          closeComponent={this.renderCloseComponent}
        >
          Demo content for Modal
        </Modal>
      </div>
    );
  }
}
