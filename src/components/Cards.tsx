import React, {useState} from 'react';
import Modal from './Modal';
import Card from './Card';
import '../styles/card.css';
import { useSelector } from "react-redux";

interface ICard {
  id: number,
  created_at: number,
  description: string,
  position: number,
  title: string,
  users: Array<string>
}

function Cards(props): any {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cardName, setCardName] = useState<string>('');
  const [description, setCardDescription] = useState<string>('');
  const [userName, setUserName] = useState<boolean>(false);
  const [cards, setCards] = useState<object>(props.cards);
  const [currentCard, setCurrentCard] = useState<any>({});

  const token = useSelector((state) => state.tokenReducer.token);

  async function sendRequest(method: string, url: string) {
    try {
      let response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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

  async function getCard() {
    const result = await sendRequest("GET", `http://localhost:5000/v1/board/${props.boardId}`);
    setCards(result.lists[props.listId].cards);
    console.log("Списки на доске:");
    console.log(result.lists[props.listId].cards);
  }

  async function deleteCard(id: number) {
    console.log(`Delete card with id: ${id}`);
    await sendRequest("DELETE", `http://localhost:5000/v1/board/${props.boardId}/card/${id}`);
    await getCard();
  }

  async function addCard(e: React.ChangeEvent<HTMLInputElement>) {
    setIsOpen(false);
    setCardName(e.target.value);
    console.log(`Create card with name: ${cardName}`);
    try {
      let response = await fetch(`http://localhost:5000/v1/board/${props.boardId}/card`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          "title": cardName,
          "list_id": props.listId,
          "position": Object.keys(cards).length + 1,
        }),
      });
      if (!response.ok) {
          console.log("Error: " + response.status);
      }
      let result = await response.json();
      console.log(result);
    } catch (error) {
        alert("Error");
    }
    await getCard();
  }

  async function updateCard(id: number, body) {
    console.log(`Update card with id: ${id} and name: ${cardName}`);
    try {
      let response = await fetch(`http://localhost:5000/v1/board/${props.boardId}/card/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: body,
      });
      if (!response.ok) {
          console.log("Error: " + response.status);
      }
      let result = await response.json();
      console.log(result);
    } catch (error) {
        alert("Error");
    }
  }

  async function updateUsers(id: number) {
    setIsOpen(false);
    try {
      let response = await fetch(`http://localhost:5000/v1/board/${props.boardId}/card/${id}/users`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify ({
          "add": [userName],
        }),
      });
      if (!response.ok) {
          console.log("Error: " + response.status);
      }
      let result = await response.json();
      console.log(result);
    } catch (error) {
       alert("Error");
    }
    await getCard();
  }

  return (
    <React.Fragment>
      {Object.keys(cards).map((card, index) => (
        <div
          key={index}
          className="card">
          <Card
            cardName={cardName}
            setName={(e: React.ChangeEvent<HTMLInputElement>) => setCardName(e.target.value)}
            description={description}
            setDescription={(e) => setCardDescription(e.target.value)}
            card={cards[card]}
            userName={userName}
            setUserName={(e) => setUserName(e.target.value)}
            deleteCard={() => deleteCard(cards[card].id)}
            updateCard={() => updateCard(cards[card].id, JSON.stringify ({                        // TODO: JSON переделать
              "title": cardName,
              "list_id": props.listId,
            }))}
            updateDescriptionCard={() => updateCard(cards[card].id, JSON.stringify ({
              "description": description,
              "list_id": props.listId,
            }))}
            getCard={async () => await getCard()}
            updateUsers={() => updateUsers(cards[card].id)}/>
        </div>
      ))}
      <button onClick={() => setIsOpen(true)} className="btn mt-2 ml-1">
        <i className="fas fa-plus mr-2" />Добавить карточку
      </button>
      {isOpen &&
        <React.Fragment>
          <Modal
            title="Добавить карточку"
            name={cardName}
            setName={(e: React.ChangeEvent<HTMLInputElement>) => setCardName(e.target.value)}
            close={() => setIsOpen(false)}
            execute={(e: React.ChangeEvent<HTMLInputElement>) => addCard(e)}/>
        </React.Fragment>
      }
    </React.Fragment>
  );
}

export default Cards;
