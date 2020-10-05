import React from 'react';
import List from '../components/List';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      users: [],
      lists: []
    };
  }

  async componentDidMount() {
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
      this.setState({isLoad: true, users: result.users, lists: result.lists});
    } catch (error) {
        alert("Error");
    }
    console.log("Списки на доске:");
    console.log(this.state.lists);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isLoad &&
          <div>
            <List id={this.props.id} token={this.props.token} lists={this.state.lists} />
          </div>
        }
      </React.Fragment>
    );
  }
}
export default Board;
