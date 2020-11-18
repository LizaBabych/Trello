import React, { useState } from 'react';
import '../styles/modal.css';

const EditCard = (props) => {

  const [isOpenTitle, setOpenTitle] = useState<boolean>(false);
  const [isOpenDescr, setOpenDescr] = useState<boolean>(false);

  const keyPressChangeTitle = () => {
    props.updateTitleCard();
    props.getCard();
    setOpenTitle(false);
  }

  const keyPressChangeDescription = () => {
    props.updateDescriptionCard();
    props.getCard();
    setOpenDescr(false);
  }

  return (
      <div className="createBoard">
        <div className='modal'/>
        <div className="modal-container-edit">
          <div className='modal-content'>
            <div className='modal-head'>
            <div className="users-container">
              <h5 className="modal-title" onClick={() => setOpenTitle(true)}>{props.card.title}</h5>
            </div>
            <button><i className="fas fa-times" onClick={props.close} /></button>
            </div>
            <div className='modal-body'>
            {isOpenTitle &&
              <div className="users-container mb-2">
              <input
                value={props.name}
                onChange={props.setName}
                type="text"
                className="form-control"
                placeholder="Введите заголовок карточки..."
                onKeyPress={(e) => {if (e.key === "Enter") keyPressChangeTitle(); }}  />
                <button className="btn"><i className="fas fa-times text-danger" onClick={() => setOpenTitle(false)} /></button>
              </div>
            }
            <div className="users-container">
              <h5>Описание</h5>
              <i className="mt-1 ml-2 fas fa-edit" onClick={() => setOpenDescr(true)}/>
            </div>
              <div className="users-container mb-2">
              {!isOpenDescr && <p>{props.card.description}</p> }
              {isOpenDescr &&
                <>
                  <textarea
                    value={props.description}
                    onChange={props.setDescription}
                    className="form-control"
                    placeholder="Введите описание карточки..." />
                  <button className="btn"><i className="fas fa-times text-danger" onClick={() => setOpenDescr(false)} /></button>
                  <button className="btn btn-success" onClick={() => keyPressChangeDescription()}>Сохранить</button>
                </>
              }
              </div>
              <h5 className="mb-2">Пользователи</h5>
              <div className="wrapper mb-2">
                {props.card.users.map((user, idx) =>
                  <div key={idx} className=" mb-2">
                    <span className="user-wrap mr-2">{user}</span>
                  </div>
                )}
              </div>
                <div className="users-container">
                  <input
                    onChange={props.setUserName}
                    type="text"
                    className="form-control"
                    placeholder="Добавить пользователя..."/>
                    <button className="btn btn-success" onClick={() => props.updateUsers()}><i className="fas fa-plus" /></button>
                </div>
                <div className="users-container mt-1">
                  <input
                    onChange={props.setRemoveUser}
                    type="text"
                    className="form-control"
                    placeholder="Удалить пользователя..."/>
                    <button className="btn btn-danger" onClick={() => props.deleteUsers()}><i className="far fa-trash-alt" /></button>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default EditCard;
