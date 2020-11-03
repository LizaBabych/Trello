import React, {useState, useEffect} from 'react';
import List from './List';
import Modal from './Modal';
import '../styles/list.css';
import '../styles/modal.css';

interface IPropsBoard {
  token: number,
  id: number,
}

interface IBody {
  id: number,
  position: number,
}

interface IList {
  id: number,
  title: string,
  cards: {
    id: number,
    created_at: number,
    description: string,
    position: number,
    title: string,
    users: Array<string>
  },
  position: number,
}
const Board: React.FC<IPropsBoard> = (props) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [users, setUsers] = useState<object>({});
  const [lists, setLists] = useState<object>({});
  const [listName, setListName] = useState<string>('');
  const [position, setPosition] = useState<number>(0);
  const [currentList, setCurrentList] = useState<any>({});

  useEffect(() => {
    getBoard();
  }, []);

  async function sendRequest(method: string, url: string) {
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

  async function sendPostRequest(method: string, url: string) {
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
    } catch (error) {
        alert("Error");
    }
  }

  async function getBoard() {
    const result = await sendRequest("GET", `http://localhost:5000/v1/board/${props.id}`);
    let listsAray: Array<IList> = [];
    Object.keys(result.lists).map(list => {
      listsAray.push(result.lists[list]);
    })
    listsAray.sort((a, b) => {
      return a.position - b.position;
    });
    setIsLoad(true);
    setUsers(result.users);
    setPosition(listsAray[listsAray.length-1].position);
    setLists(listsAray);
    console.log("Списки на доске: ");
    console.log(listsAray);
  }

  async function deleteList(id: number) {
    console.log(`Delete list with id: ${id}`);
    await sendRequest("DELETE", `http://localhost:5000/v1/board/${props.id}/list/${id}`);
    await getBoard();
  }

  async function addList(e: React.ChangeEvent<HTMLInputElement>) {
    setIsOpen(false);
    setListName(e.target.value);
    console.log(`Create list with name: ${listName}`);
    await sendPostRequest("POST", `http://localhost:5000/v1/board/${props.id}/list`);
    setPosition(position + 1);
    await getBoard();
  }

  async function updateList(id: number) {
    setIsOpen(false);
    console.log(`Update list with id: ${id} and name: ${listName}`);
    await sendPostRequest("PUT", `http://localhost:5000/v1/board/${props.id}/list/${id}`);
    await getBoard();
  }

function dragStartHandler(e, list: IList) {
  setCurrentList(list);
  e.persist();
  setTimeout(() => {
    e.target.style.visibility='hidden';
  }, 0);
}

function dragEndHandler(e) {
  e.target.style.visibility='visible';
  e.target.style.background='white'
}

function dragOverHandler(e) {
  e.preventDefault();
  e.target.style.background='lightgray'
}

async function dropHandler(e, list: IList) {
  e.preventDefault();
  e.target.style.background='white';
  let a: IBody = { id: 0, position: 0 };
  let b: IBody = { id: 0, position: 0 };
  Object.keys(lists).map(i => {
    if (lists[i].id === currentList.id) {
      a.position = list.position;
      a.id = currentList.id;
    }
    if (lists[i].id === list.id) {
      b.position = currentList.position;
      b.id = list.id;
    }
  })
  let body = [a, b];
  await changeLists(body);
}

async function changeLists(body: Array<IBody>) {
  try {
    let response = await fetch(`http://localhost:5000/v1/board/${props.id}/list`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
        console.log("Error: " + response.status);
    }
    let res = await response.json();
    console.log(res);
  } catch (error) {
      alert("Error");
  }
  await getBoard();
}

  return (
    <React.Fragment>
      {isLoad &&
        <div className="list">
          {Object.keys(lists).map((list, index) => (
            <div
              key={index}
              draggable={true}
              onDragStart={(e) => dragStartHandler(e, lists[list])}
              onDragLeave={(e) => dragEndHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e, lists[list])}
              className="form-list">
              <List
                boardId={props.id}
                listId={lists[list].id}
                token={props.token}
                title={lists[list].title}
                listName={listName}
                setName={(e: React.ChangeEvent<HTMLInputElement>) => setListName(e.target.value)}
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
                setName={(e: React.ChangeEvent<HTMLInputElement>) => setListName(e.target.value)}
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
