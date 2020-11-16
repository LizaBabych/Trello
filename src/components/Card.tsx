import React, {useState} from 'react';
import EditCard from './EditCard';
import '../styles/card.css';

function Card(props) {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  function getDate(created: number) {
    let date = new Date(created);
    return(' ' + date.getDate() + '.' + +(date.getMonth() + 1) + '.' + date.getFullYear() + ' '
    + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
  }

  const saveHandler = () => {
    setIsOpen(false);
    props.getCard();
  }

  return (
    <>
      <div className="name">
        {props.card.title}
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
        {getDate(props.card.created_at)}
      </div>
      {isOpen &&
        <React.Fragment>
          <EditCard
            card={props.card}
            name={props.cardName}
            setName={props.setName}
            description={props.description}
            setDescription={props.setDescription}
            userName={props.userName}
            setUserName={props.setUserName}
            updateDescriptionCard={props.updateDescriptionCard}
            updateUsers={props.updateUsers}
            close={() => setIsOpen(false)}
            save={() => saveHandler()}
            updateTitleCard={props.updateCard}/>
        </React.Fragment>
      }
    </>
  );
}

export default Card;
