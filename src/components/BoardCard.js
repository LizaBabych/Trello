import React from "react";
import { Link } from 'react-router-dom';
import AddBoard from '../components/AddBoard';
import '../styles/boardCard.css';

class BoardCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      boardName: '',
    };
    this.closeModal = this.closeModal.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.setName = this.setName.bind(this);
  }

  async deleteBoard() {
    console.log(`Удалили доску с id: ${this.props.id} и token: ${this.props.token}`);
    try {
      let response = await fetch(`http://localhost:5000/v1/board/${this.props.id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`
        },
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

  closeModal() { this.setState({isOpen: false}) }

  setName(e) { this.setState({boardName: e.target.value}) }

  async updateBoard() {
    console.log(`Редактировали доску с id: ${this.props.id} и token: ${this.props.token} имя: ${this.state.boardName}`);
    try {
      let response = await fetch(`http://localhost:5000/v1/board/${this.props.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`,
        },
        body: JSON.stringify({
          "title": this.state.boardName,
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
  }

  render() {
    return (
      <React.Fragment>
        <div className="board-card-list">
            <div className="board-card">
              <div className="board-card-name">
                {this.props.title}
                <div>
                  <i onClick={() => this.setState({isOpen: true})} className="fas fa-edit mr-1" />
                  <i onClick={this.deleteBoard} className="fas fa-times"/>
                </div>
              </div>
              <Link className="board-card-body-link" to={"/" + this.props.token + "/b/" + this.props.id}>
                >>>>>>>>
              </Link>
              {this.state.isOpen &&
                <div>
                  <AddBoard
                    title={this.props.id}
                    boardName={this.state.boardName}
                    setName={this.setName}
                    close={this.closeModal}
                    createBoard={this.updateBoard}/>
                </div>
              }
            </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BoardCard;
