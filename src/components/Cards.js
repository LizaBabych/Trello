import React from 'react';
import Modal from './Modal';
import Card from './Card';
import '../styles/card.css';

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      isOpen: false,
      cardName: '',
      cards: this.props.cards,
    };
    this.addCard = this.addCard.bind(this);
  }

  async getCard() {
    try {
      let response = await fetch(`http://localhost:5000/v1/board/${this.props.boardId}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`
        },
      });
      if (!response.ok) {
          console.log("Error: " + response.status);
      }
      const result = await response.json();
      this.setState({cards: result.lists[this.props.listId].cards});
    } catch (error) {
        alert("Error");
    }
    console.log("Списки на доске:");
    console.log(this.state.cards);
  }

  async addCard(e) {
    this.setState({isOpen: false, cardName: e.target.value})
    console.log(`Create card with name: ${this.state.cardName}`);
    try {
      let response = await fetch(`http://localhost:5000/v1/board/${this.props.boardId}/card`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`
        },
        body: JSON.stringify({
          "title": this.state.cardName,
          "list_id": this.props.listId,
          "position": Object.keys(this.state.cards).length + 1,
        }),
      });
      this.setState({position: Object.keys(this.state.cards).length});
      if (!response.ok) {
          console.log("Error: " + response.status);
      }
      let result = await response.json();
      console.log(result);
    } catch (error) {
        alert("Error");
    }
    await this.getCard();
  }

  async deleteCard(id) {
    console.log(`Delete card with id: ${id}`);
    try {
      let response = await fetch(`http://localhost:5000/v1/board/${this.props.boardId}/card/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`
        },
      });
      if (!response.ok) {
          console.log("Error: " + response.status);
      }
      let result = await response.json();
      console.log(result);
    } catch (error) {
        alert("Error");
    }
    await this.getCard();
  }

  async updateCard(id) {
    this.setState({isOpen: false});
    console.log(`Update card with id: ${id} and name: ${this.state.cardName}`);
    try {
      let response = await fetch(`http://localhost:5000/v1/board/${this.props.boardId}/card/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`
        },
        body: JSON.stringify({
          "title": this.state.cardName,
          "list_id": this.props.listId,
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
    await this.getCard();
  }

  render() {
    return (
      <React.Fragment>
        {Object.keys(this.state.cards).map((card, index) => (
          <div key={index} className="card">
            <Card
              users={this.state.cards[card].users}
              title={this.state.cards[card].title}
              created={this.state.cards[card].created_at}
              cardName={this.state.cardName}
              setName={(e) => this.setState({cardName: e.target.value})}
              deleteCard={() => this.deleteCard(this.state.cards[card].id)}
              updateCard={() => this.updateCard(this.state.cards[card].id)}/>
          </div>
        ))}
        <button onClick={() => this.setState({isOpen: true})} className="btn mt-2 ml-1">
          <i className="fas fa-plus mr-2" />Добавить карточку
        </button>
        {this.state.isOpen &&
          <React.Fragment>
            <Modal
              title="Добавить карточку"
              name={this.state.cardName}
              setName={(e) => this.setState({cardName: e.target.value})}
              close={() => this.setState({isOpen: false})}
              execute={this.addCard}/>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

export default Cards;
