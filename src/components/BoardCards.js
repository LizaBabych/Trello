import React, {useState, useEffect} from 'react';
import BoardCard from './BoardCard';
import Modal from './Modal';
import '../styles/modal.css';

function BoardCards(props) {

  const [isOpen, setIsOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [boards, setBoards] = useState([]);
  const [boardName, setBoardName] = useState('');

  useEffect(() => {
    getBoards();
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
      let res = await response.json();
      console.log(res);
      return res;
    } catch (error) {
        alert("Error: " + error);
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
        body: JSON.stringify({ "title": boardName }),
      });
      if (!response.ok) {
          console.log("Error: " + response.status);
      }
      let res = await response.json();
      console.log(res);
      return res;
    } catch (error) {
        alert("Error: " + error);
    }
  }

  async function getBoards() {
    const result = await sendRequest("GET", "http://localhost:5000/v1/board");
    setBoards(result.boards);
    setIsLoad(true);
    console.log("Получили доски: ");
    console.log(boards);
  }

  async function deleteBoard(id) {
    console.log(`Удалили доску с id: ${id} и token: ${props.token}`);
    const result = await sendRequest("DELETE", `http://localhost:5000/v1/board/${id}`);
    await getBoards();
  }

  async function createBoard(e) {
    setIsOpen(false);
    setBoardName(e.target.value);
    console.log(`Created with name: ${boardName}`);
    sendPostRequest("POST", "http://localhost:5000/v1/board");
    await getBoards();
  }

  async function updateBoard(id) {
    setIsOpen(false);
    console.log(`Редактировали доску с id: ${id} и token: ${props.token} имя: ${boardName}`);
    const result = sendPostRequest("PUT", `http://localhost:5000/v1/board/${id}`);
    await getBoards();
  }

  return (
    <React.Fragment>
      <div className="board-card-list">
        {isLoad &&
          <React.Fragment>
            {boards.map((board) =>
              <BoardCard key={board.id}
                token={props.token}
                id={board.id}
                title={board.title}
                setName={(e) => setBoardName(e.target.value)}
                deleteBoard={() => deleteBoard(board.id)}
                updateBoard={() => updateBoard(board.id)} />
            )}
          </React.Fragment>
        }
      </div>
      <button className="btn" onClick={() => setIsOpen(true)}>Добавить доску</button>
        {isOpen &&
          <Modal
            title="Создание доски"
            name={boardName}
            setName={(e) => setBoardName(e.target.value)}
            close={() => setIsOpen(false)}
            execute={createBoard}/>
        }
    </React.Fragment>
  );
}

export default BoardCards;
