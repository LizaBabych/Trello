import React from "react";
import { Link } from 'react-router-dom';
import '../styles/boardCard.css';

class BoardCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {render: 0};
    this.deleteBoard = this.deleteBoard.bind(this);
  }

  async deleteBoard() {
    console.log(`Удалили доску с id: ${this.props.id} и token: ${this.props.token}`);
    this.setState({render: this.state.render+=1});
    console.log(this.state.render);
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
      <React.Fragment>
        <div className="board-card-list">
            <div className="board-card">
            <Link className="board-card-body-link" to={"/" + this.props.token + "/b/" + this.props.id}>

              <div className="board-card-name">
                {this.props.title}
              </div>
              </Link>
              <div className="board-card-body">
                <button onClick={this.deleteBoard} className="btn btn-outline-danger">Удалить</button>
              </div>
            </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BoardCard;
