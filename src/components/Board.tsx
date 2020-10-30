import React, {useState, useEffect} from 'react';
import List from './List';
import Modal from './Modal';
import '../styles/list.css';
import '../styles/modal.css';

function Board(props) {

  const [isOpen, setIsOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [users, setUsers] = useState([]);
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState('');
  const [position, setPosition] = useState(0);

  useEffect(() => {
    getBoard();
  }, []);

  async function sendRequest(method, url) {
    try {
      let response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.token}`
        },
      });
      if (!response.ok) {
          console.log("Error: " + response.status);
      }
      return await response.json();
    } catch (error) {
        alert("Error");
    }
  }

  async function sendPostRequest(method, url) {
    try {
      let response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.token}`
        },
        body: JSON.stringify({
          "title": listName,
          "position": position + 1,
        }),
      });
      if (!response.ok) {
          console.log("Error: " + response.status);
      }
      let res = await response.json();
      console.log(res);
      return res;
    } catch (error) {
        alert("Error");
    }
  }

  async function getBoard() {
    const result = await sendRequest("GET", `http://localhost:5000/v1/board/${props.id}`);
    setIsLoad(true);
    setUsers(result.users);
    setLists(result.lists);
    setPosition(Object.keys(lists).length);
    console.log("Списки на доске: ");
    console.log(lists);
  }

  async function deleteList(id) {
    console.log(`Delete list with id: ${id}`);
    const result = await sendRequest("DELETE", `http://localhost:5000/v1/board/${props.id}/list/${id}`);
    await getBoard();
  }

  async function addList(e) {
    setIsOpen(false);
    setListName(e.target.value);
    console.log(`Create list with name: ${listName}`);
    const result = await sendPostRequest("POST", `http://localhost:5000/v1/board/${props.id}/list`);
    setPosition(Object.keys(lists).length + 1);
    await getBoard();
  }

  async function updateList(id) {
    setIsOpen(false);
    console.log(`Update list with id: ${id} and name: ${listName}`);
    const result = await sendPostRequest("PUT", `http://localhost:5000/v1/board/${props.id}/list/${id}`);
    await getBoard();
  }

  return (
    <React.Fragment>
      {isLoad &&
        <div className="list">
          {Object.keys(lists).map((list, index) => (
            <div key={index} className="form-list">
              <List
                boardId={props.id}
                listId={lists[list].id}
                token={props.token}
                title={lists[list].title}
                listName={listName}
                setName={(e) => setListName(e.target.value)}
                deleteList={() => deleteList(lists[list].id)}
                updateList={() => updateList(lists[list].id)}
                cards={lists[list].cards}/>
            </div>
          ))}
          {isOpen &&
            <React.Fragment>
              <Modal
                title="Добавить список"
                name={listName}
                setName={(e) => setListName(e.target.value)}
                close={() => setIsOpen(false)}
                execute={addList}/>
            </React.Fragment>
          }
        </div>
      }
      <button onClick={() => setIsOpen(true)}className="btn mt-2 ml-1">Добавить список</button>
    </React.Fragment>
  );
}

export default Board;
