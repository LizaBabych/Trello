import React from 'react';
import List from '../components/List';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users: [], lists: []};
  }

  async componentDidMount() {
    await this.getBoard();
    console.log(this.state.users);
    console.log(this.state.lists);
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
      const result = await response.json();
      this.setState({users: result.users, lists: result.lists});
    } catch (error) {
        alert("Error");
    }
  }

  render() {
    return (
      <div>
        <List lists={this.state.lists}></List>
      </div>
    );
  }
}

export default Board;
