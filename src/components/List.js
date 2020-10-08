import React from 'react';
import '../styles/list.css';
import '../styles/createBoard.css';
import Card from './Card';
import AddBoard from '../components/AddBoard';

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state =
      {
        isOpenEdit: false,
        isOpenAdd: false,
        isOpenDelete: false,
        listName: '',
        position: 2,
        lists: this.props.lists,
    };
    this.addList = this.addList.bind(this);
    this.closeModalAdd = this.closeModalAdd.bind(this);
    this.setName = this.setName.bind(this);
  }

  async updateList(e) {
    this.setState({isOpen: false, listName: e.target.value, position: this.state.position + 1})
    console.log(`Updated with name: ${this.state.boardName}`);
  }

  async addList(e) {
    this.setState({isOpenAdd: false, listName: e.target.value})
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
          "position": this.state.position,
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
  }

  async deleteList(id) {
    this.setState({isOpenDelete: true});
    console.log(`Delete list list with id: ${id}`);
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
  }

  closeModal() { this.setState({isOpenEdit: false}) }

  closeModalAdd() { this.setState({isOpenAdd: false}) }

  setName(e) { this.setState({listName: e.target.value}) }

  render() {
    return (
      <React.Fragment>
        <div className="list">
          {Object.keys(this.state.lists).map((list, index) => (
            <form key={index} className="form-list">
              <div className="list-name">
                {this.state.lists[list].title}
                <span onClick={() => this.deleteList(this.state.lists[list].id)}>Удалить</span>
              </div>
              <Card cards={this.state.lists[list].cards}/>
            </form>
          ))}
          {this.state.isOpenAdd &&
            <React.Fragment>
              <AddBoard
                title="Добавить список"
                boardName={this.state.listName}
                setName={this.setName}
                close={this.closeModalAdd}
                createBoard={this.addList}/>
            </React.Fragment>
          }
        </div>
        <button onClick={() => this.setState({isOpenAdd: true})}className="btn mt-2 ml-1">Добавить список</button>
      </React.Fragment>
    );
  }
}

export default List;
