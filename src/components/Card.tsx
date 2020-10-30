import React, {useState} from 'react';
import Modal from './Modal';
import '../styles/card.css';

function Card(props) {

  const [isOpen, setIsOpen] = useState(false);

  function getDate(created) {
    let date = new Date(created);
    return(' ' + date.getDate() + '.' + +(date.getMonth() + 1) + '.' + date.getFullYear() + ' '
    + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
  }

  return (
    <React.Fragment>
      <div className="name">
        {props.title}
        <div className="dropdown">
          <span className="mr-1" id="dropdownMenu1" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-ellipsis-h grey"/>
          </span>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <span className="dropdown-item" onClick={() => setIsOpen(true)}>Редактировать</span>
            <span className="dropdown-item" onClick={props.deleteCard}>Удалить</span>
          </div>
        </div>
      </div>
      <div className="created mt-2">
        {getDate(props.created)}
      </div>
      {isOpen &&
        <React.Fragment>
          <Modal
            title="Редактировать карточку"
            name={props.cardName}
            setName={props.setName}
            close={() => setIsOpen(false)}
            execute={props.updateCard}/>
        </React.Fragment>
      }
    </React.Fragment>
  );
}

export default Card;
