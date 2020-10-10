import React from 'react';
import List from './List';
import AddBoard from './AddBoard';
import '../styles/list.css';
import '../styles/createBoard.css';

class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state =
      {
        isOpenAdd: false,
        listName: '',
        lists: this.props.lists,
    };
    this.addList = this.addList.bind(this);
    this.closeModalAdd = this.closeModalAdd.bind(this);
    this.setName = this.setName.bind(this);
  }

  async addList(e) {
    this.setState({isOpenAdd: false, listName: e.target.value, position: this.state.position + 1})
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

  closeModalAdd() { this.setState({isOpenAdd: false}) }

  setName(e) { this.setState({listName: e.target.value}) }

  render() {
    return (
      <React.Fragment>
        <div className="list">
          {Object.keys(this.state.lists).map((list, index) => (
            <form key={index} className="form-list">
              <List
              boardId={this.props.id}
              token={this.props.token}
              title={this.state.lists[list].title}
              listId={this.state.lists[list].id}
              cards={this.state.lists[list].cards}/>
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

export default Lists;
