# react-modal-slider

I'm glad to introduce you react-modal-slider.

- This library based on the react-modal.
- Open and close modal (animated) from right or left side

[Demo](https://mallchel.github.io/react-modal-slider.html)

## Install

```
  npm i react-modal-slider
```

## Usage

```js
import React from 'react';

import Modal from 'react-modal-slider';
import 'react-modal-slider/lib/main.css';

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
    <button onClick={this.toggleVisibleModal}>
      <img src={'/close.svg'} />
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
```
