import React from "react";
import { Link } from 'react-router-dom';
import '../styles/boardCard.css';

class BoardCard extends React.Component {
  constructor(props) {
    super(props);
    this.deleteBoard = this.deleteBoard.bind(this);
  }

  deleteBoard() {
    console.log(`Удалили доску с id: ${this.props.id} и token: ${this.props.token}`);
    // try {
    //   let response = await fetch(`http://localhost:5000/v1/board/${this.props.id}`, {
    //     method: "DELETE",
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${this.props.token}`
    //     },
    //   });
    //   if (!response.ok) {
    //       console.log("Error: " + response.status);
    //   }
    //   let res = await response.json();
    //   console.log(res);
    // } catch (error) {
    //     alert("Error");
    // }
  }

  render() {
    return (
      <div className="board-card-list">
        <Link className="board-card-body-link" to={"/" + this.props.token + "/b/" + this.props.id}>
          <div className="board-card">
            <div className="board-card-name">
              {this.props.title}
              <i className="fas fa-times red" onClick={this.deleteBoard}></i>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default BoardCard;
