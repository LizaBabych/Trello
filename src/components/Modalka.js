import React from 'react';
import '../styles/modal.css';

export default class Modal extends React.Component  {
  state = {
    isOpen: false
  }
  render() {
    return (
      <React.Fragment>
        <div>
          <button onClick={() => this.setState({isOpen: true})}>Open</button>
        </div>
        { this.state.isOpen && (
          <div className='message'>
            <div className='head'>
              <p name="head">Head</p>
              <button onClick={() => this.setState({isOpen: false})}>X</button>
            </div>
            <div className='body'>
            <p>,umjynhtbdgvfdsdgfbdhnfjmk</p>
            </div>
          </div>
        ) }
      </React.Fragment>
    );
  }
}
