import React from 'react';
import List from '../components/List';

class Board extends React.Component {
  constructor(props) {
    super(props);
    let lists = '';
    let users = '';
  }

  async componentDidMount() {
    const boardData = await this.getBoard();
    this.lists = boardData.lists;
    this.users = boardData.users;
    console.log(this.users);
    console.log(this.lists);
  }

  async getBoard() {
    try {
      let response = await fetch(`http://localhost:5000/v1/board/${this.props.id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`
        },
      });
      if (!response.ok) {
          console.log("Error: " + response.status);
      }
      let result = await response.json();
      return result;
    } catch (error) {
        alert("Error");
    }
  }

  render() {
    if(this.lists == ''){
      return false
    }
    return (
      <div>
        <List lists={this.lists}></List>
      </div>
    );
  }
}

export default Board;
// {this.state.lists}
// {this.state.users}
// <List lists={board.lists}></List>
