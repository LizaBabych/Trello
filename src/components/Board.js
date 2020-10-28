import React from 'react';
import List from './List';
import Modal from './Modal';
import '../styles/list.css';
import '../styles/modal.css';

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

  async sendRequest(method, url) {
    try {
      let response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`
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

  async sendPostRequest(method, url) {
    try {
      let response = await fetch(url, {
        method: method,
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
      let res = await response.json();
      console.log(res);
      return res;
    } catch (error) {
        alert("Error");
    }
  }

  async getBoard() {
    const result = await this.sendRequest("GET", `http://localhost:5000/v1/board/${this.props.id}`);
    this.setState({isLoad: true, users: result.users, lists: result.lists});
    this.setState({position: Object.keys(this.state.lists).length});
    console.log("Списки на доске:");
    console.log(this.state.lists);
  }

  async deleteList(id) {
    console.log(`Delete list with id: ${id}`);
    const result = await this.sendRequest("DELETE", `http://localhost:5000/v1/board/${this.props.id}/list/${id}`);
    await this.getBoard();
  }

  async addList(e) {
    this.setState({isOpen: false, listName: e.target.value})
    console.log(`Create list with name: ${this.state.listName}`);
    const result = await this.sendPostRequest("POST", `http://localhost:5000/v1/board/${this.props.id}/list`);
    this.setState({position: Object.keys(this.state.lists).length + 1});
    await this.getBoard();
  }

  async updateList(id) {
    this.setState({isOpen: false});
    console.log(`Update list with id: ${id} and name: ${this.state.listName}`);
    const result = await this.sendPostRequest("PUT", `http://localhost:5000/v1/board/${this.props.id}/list/${id}`);
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
                  boardId={this.props.id}
                  listId={this.state.lists[list].id}
                  token={this.props.token}
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
                <Modal
                  title="Добавить список"
                  name={this.state.listName}
                  setName={(e) => this.setState({listName: e.target.value})}
                  close={() => this.setState({isOpen: false})}
                  execute={this.addList}/>
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
