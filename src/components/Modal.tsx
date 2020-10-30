import React from 'react';
import '../styles/modal.css';

// interface IPropsModal {
//   title: string,
//   name: string,
//   setName(e: React.ChangeEvent<HTMLInputElement>): void,
//   close(): void,
//   execute(e: React.ChangeEvent<HTMLInputElement>): any,
// }

const Modal = (props) =>{
  return (
      <div className="createBoard">
        <div className='modal'/>
        <div className="modal-container">
          <div className='modal-content'>
            <div className='modal-head'>
              <h5>{props.title}</h5>
              <button><i className="fas fa-times" onClick={props.close} /></button>
            </div>
            <div className='modal-body'>
              <input
                value={props.name}
                onChange={props.setName}
                type="text"
                className="form-control mb-2"
                placeholder="Введите название" />
              <div className="center">
                <button onClick={props.execute}
                  className="btn btn-outline-success mt-2">
                  Применить
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Modal;
