import React from 'react';
import '../styles/createBoard.css';

function AddBoard(props) {
  return (
      <div className="createBoard">
        <div className='modal'></div>
        <div className="modal-container">
          <div className='modal-content'>
            <div className='modal-head'>
              <h5>Создание доски</h5>
              <button><i className="fas fa-times" onClick={props.close} /></button>
            </div>
            <div className='modal-body'>
              <input
                value={props.boardName}
                onChange={props.setName}
                type="text"
                className="form-control mb-2"
                placeholder="Введите название доски" />
              <div className="center">
                <button onClick={props.createBoard}
                  className="btn btn-sm btn-success">
                  Создать
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default AddBoard;
