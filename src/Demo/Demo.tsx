import React from 'react';

import Modal from '../Modal';

import './demo.scss';

export default class Demo extends React.Component {
  state = {
    isOpen: false,
  };

  handleVisible = (isOpen: boolean) => {
    this.setState({
      isOpen,
    });
  };

  renderCloseComponent = () => (
    <button className={'close'} onClick={() => this.handleVisible(false)}>
      <img src={'/img/close.svg'} />
    </button>
  );

  render() {
    return (
      <div id={'demo'}>
        <button onClick={() => this.handleVisible(true)}>Open modal</button>
        <Modal
          // default false
          isOpen={this.state.isOpen}
          // default 60%
          width={'80%'}
          // default from right
          directionFrom={'right'}
          // default Modal
          contentLabel={'Demo Modal'}
          onRequestClose={() => this.handleVisible(false)}
          // optional for accessibility
          setAppElement={'#root'}
          // default false allows you to skip setAppElement prop for react-modal
          ariaHideApp={true}
          // allow you to set the maximum width of the viewport
          // at which the modal will be expanded to full screen
          maxMediaWidth={1024}
        >
          Demo content for Modal
          {this.renderCloseComponent()}
        </Modal>
      </div>
    );
  }
}
