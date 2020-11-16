import React, { useState } from 'react';
import '../styles/modal.css';

const EditCard = (props) =>{

  // const users = ["cdxs", "vfcdxs", "gvfcd"];
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
      <div className="createBoard">
        <div className='modal'/>
        <div className="modal-container-edit">
          <div className='modal-content'>
            <div className='modal-head'>
            { !isOpen &&
              <h5 onClick={() => setIsOpen(true)}>{props.card.title}</h5>
            }
            </div>
            <div className='modal-body'>
            {isOpen &&
              <div className="users-container mb-2">
              <input
                value={props.name}
                onChange={props.setName}
                type="text"
                className="form-control"
                placeholder={props.card.title} />
                <button onClick={props.updateTitleCard}
                  className="btn">
                  <i className="fas fa-plus"/>
                </button>
              </div>
            }

              <div className="users-container mb-2">
                <textarea
                  value={props.description}
                  onChange={props.setDescription}
                  className="form-control"
                  placeholder={props.card.description} />
                <button onClick={props.updateDescriptionCard}
                  className="btn">
                  <i className="fas fa-plus"/>
                </button>
              </div>
              <p className="mb-2">Пользователи</p>
                {props.card.users.map((user, idx) =>
                  <div key={idx} className="users-container mb-2">
                    <span>{user}</span>
                    <span className="ml-1 close-user" data-toggle="tooltip"
                          data-placement="bottom" title="Удалить">X</span>
                  </div>
                )}
              <div className="users-container">
                <input
                  value={props.userName}
                  onChange={props.setUserName}
                  type="text"
                  className="form-control"
                  placeholder="Добавить" />
                <button className="btn" onClick={props.updateUsers}><i className="fas fa-plus"/></button>
              </div>
              <div className="center mt-2">
                <button className="btn btn-success" onClick={props.save}>Сохранить</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
// <button><i className="fas fa-times" onClick={props.close} /></button>

export default EditCard;
