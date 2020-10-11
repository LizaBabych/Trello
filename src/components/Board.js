import React from 'react';
import List from './List';
import AddBoard from './AddBoard';
import '../styles/list.css';
import '../styles/createBoard.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      isOpen: false,
      users: [],
      lists: [],
      listName: '',
      position: 0,
    };
    this.getBoard = this.getBoard.bind(this);
    this.addList = this.addList.bind(this);
  }

  async componentDidMount() {
    await this.getBoard();
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
      this.setState({isLoad: true, users: result.users, lists: result.lists});
      this.setState({position: Object.keys(this.state.lists).length});
    } catch (error) {
        alert("Error");
    }
    console.log("Списки на доске:");
    console.log(this.state.lists);
  }

  async addList(e) {
    this.setState({isOpen: false, listName: e.target.value})
    console.log(`Create list with name: ${this.state.listName}`);
    try {
      let response = await fetch(`http://localhost:5000/v1/board/${this.props.id}/list`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`
        },
        body: JSON.stringify({
          "title": this.state.listName,
          "position": this.state.position + 1,
        }),
      });
      if (!response.ok) {
          console.log("Error: " + response.status);
      }
      let result = await response.json();
      this.setState({position: Object.keys(this.state.lists).length + 1});
      console.log(result);
    } catch (error) {
        alert("Error");
    }
    await this.getBoard();
  }

  async deleteList(id) {
    console.log(`Delete list with id: ${id}`);
    try {
      let response = await fetch(`http://localhost:5000/v1/board/${this.props.id}/list/${id}`, {
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
    await this.getBoard();
  }

  async updateList(id) {
    this.setState({isOpen: false});
    console.log(`Update list with id: ${id} and name: ${this.state.listName}`);
    try {
      let response = await fetch(`http://localhost:5000/v1/board/${this.props.id}/list/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`
        },
        body: JSON.stringify({
          "title": this.state.listName,
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
    await this.getBoard();
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isLoad &&
          <div className="list">
            {Object.keys(this.state.lists).map((list, index) => (
              <div key={index} className="form-list">
                <List
                  title={this.state.lists[list].title}
                  listName={this.state.listName}
                  setName={(e) => this.setState({listName: e.target.value})}
                  deleteList={() => this.deleteList(this.state.lists[list].id)}
                  updateList={() => this.updateList(this.state.lists[list].id)}
                  cards={this.state.lists[list].cards}/>
              </div>
            ))}
            {this.state.isOpen &&
              <React.Fragment>
                <AddBoard
                  title="Добавить список"
                  boardName={this.state.listName}
                  setName={(e) => this.setState({listName: e.target.value})}
                  close={() => this.setState({isOpen: false})}
                  createBoard={this.addList}/>
              </React.Fragment>
            }
          </div>
        }
        <button onClick={() => this.setState({isOpen: true})}className="btn mt-2 ml-1">Добавить список</button>
      </React.Fragment>
    );
  }
}

export default Board;
