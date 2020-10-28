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
      currentList: {},
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
      this.setState({position: Object.keys(this.state.lists).length - 1});
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

  dragStartHandler(e, list) { this.setState({currentList: list}) }

  dragEndHandler(e) { e.target.style.background='white' }

  dragOverHandler(e) {
    e.preventDefault();
    e.target.style.background='lightgray'
  }

  async dropHandler(e, list) {
    e.preventDefault();
    e.target.style.background='white';
    let a = { id: 0, position: 0 };
    let b = { id: 0, position: 0 };
    Object.keys(this.state.lists).map(i => {
      if (this.state.lists[i].id === this.state.currentList.id) {
        a.position = list.position;
        a.id = this.state.currentList.id;
      }
      if (this.state.lists[i].id === list.id) {
        b.position = this.state.currentList.position;
        b.id = list.id;
      }
    })
    let body = [a, b];
    console.log(body);
    //await this.changeLists(body);
  }

  async changeLists(body) {
    try {
      let response = await fetch(`http://localhost:5000/v1/board/${this.props.id}/list`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`
        },
        body: JSON.stringify(body),
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
              <div className="form-list"
                key={index}
                draggable={true}
                onDragStart={(e) => this.dragStartHandler(e, this.state.lists[list])}
                onDragLeave={(e) => this.dragEndHandler(e)}
                onDragEnd={(e) => this.dragEndHandler(e)}
                onDragOver={(e) => this.dragOverHandler(e)}
                onDrop={(e) => this.dropHandler(e, this.state.lists[list])}
                >
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
