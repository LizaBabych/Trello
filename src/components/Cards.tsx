import React, {useState} from 'react';
import Modal from './Modal';
import Card from './Card';
import '../styles/card.css';

function Cards(props) {

  const [isOpen, setIsOpen] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cards, setCards] = useState(props.cards);

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

  async function getCard() {
    const result = await sendRequest("GET", `http://localhost:5000/v1/board/${props.boardId}`);
    setCards(result.lists[props.listId].cards);
    console.log("Списки на доске:");
    console.log(cards);
  }

  async function deleteCard(id) {
    console.log(`Delete card with id: ${id}`);
    const result = await sendRequest("DELETE", `http://localhost:5000/v1/board/${props.boardId}/card/${id}`);
    await getCard();
  }

  async function addCard(e) {
    setIsOpen(false);
    setCardName(e.target.value);
    console.log(`Create card with name: ${cardName}`);
    try {
      let response = await fetch(`http://localhost:5000/v1/board/${props.boardId}/card`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.token}`
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

  async function updateCard(id) {
    setIsOpen(false);
    console.log(`Update card with id: ${id} and name: ${cardName}`);
    try {
      let response = await fetch(`http://localhost:5000/v1/board/${props.boardId}/card/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.token}`
        },
        body: JSON.stringify({
          "title": cardName,
          "list_id": props.listId,
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
        <div key={index} className="card">
          <Card
            title={cards[card].title}
            created={cards[card].created_at}
            cardName={cardName}
            setName={(e) => setCardName(e.target.value)}
            deleteCard={() => deleteCard(cards[card].id)}
            updateCard={() => updateCard(cards[card].id)}/>
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
            setName={(e) => setCardName(e.target.value)}
            close={() => setIsOpen(false)}
            execute={(e) => addCard(e)}/>
        </React.Fragment>
      }
    </React.Fragment>
  );
}

export default Cards;
