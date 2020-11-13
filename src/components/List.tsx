import React, {useState} from 'react';
import Cards from './Cards';
import Modal from './Modal';
import '../styles/list.css';

interface IPropsList {
  boardId: number,
  listId: number,
  title: string,
  listName: string,
  setName(e: React.ChangeEvent<HTMLInputElement>): void,
  deleteList(): void,
  updateList(id: number): void,
  cards: object,
}

const List: React.FC<IPropsList> = (props) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <React.Fragment>
      <div className="list-name">
        {props.title}
        <div className="dropdown">
          <span className="mr-1" id="dropdownMenu1" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-ellipsis-h"/>
          </span>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <span className="dropdown-item" onClick={() => setIsOpen(true)}>Редактировать</span>
            <span className="dropdown-item" onClick={props.deleteList}>Удалить</span>
          </div>
        </div>
        {isOpen &&
          <Modal
            title="Редактировать список"
            name={props.listName}
            setName={props.setName}
            close={() => setIsOpen(false)}
            execute={props.updateList}/>
        }
        </div>
      <Cards cards={props.cards} boardId={props.boardId} listId={props.listId}/>
    </React.Fragment>
  );
}

export default List;
