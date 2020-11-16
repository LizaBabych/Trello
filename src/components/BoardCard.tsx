import React, {useState} from "react";
import { Link } from 'react-router-dom';
import Modal from './Modal';
import { useSelector } from "react-redux";
import '../styles/boardCard.css';

function BoardCard(props) {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>("default");
  const token = JSON.parse(localStorage.getItem('token') || '{}');

  return (
    <div className={"board-card " + color}>
      <div className="board-card-name">
        <Link className="board-card-body-link" to={"/board/" + props.id}>{props.title}</Link>
        <div className="center">
          <div className="dropdown mr-1 dark">
            <span className="mr-1" id="dropdownMenu1" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-palette"/>
            </span>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <span className="dropdown-item" onClick={() => setColor("default")}>По умолчанию</span>
              <span className="dropdown-item" onClick={() => setColor("red")}>Красный</span>
              <span className="dropdown-item" onClick={() => setColor("yellow")}>Желтый</span>
              <span className="dropdown-item" onClick={() => setColor("pink")}>Розовый</span>
              <span className="dropdown-item" onClick={() => setColor("green")}>Зеленый</span>
            </div>
          </div>
          <div className="dropdown dark">
            <span className="mr-1" id="dropdownMenu1" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-ellipsis-h"/>
            </span>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <span className="dropdown-item" onClick={() => setIsOpen(true)}>Редактировать</span>
              <span className="dropdown-item" onClick={props.deleteBoard}>Удалить</span>
            </div>
          </div>
        </div>
      </div>
      {isOpen &&
        <Modal
          title="Редактировать доску"
          name={props.boardName}
          setName={props.setName}
          close={() => setIsOpen(false)}
          execute={props.updateBoard}/>
      }
    </div>
  );
}

export default BoardCard;
