import React from 'react';
import Card from './Card';
import AddBoard from './AddBoard';
import '../styles/list.css';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      isOpenUpdate: false,
      listName: '',
    };
    this.updateList = this.updateList.bind(this);
    this.closeModalUpdate = this.closeModalUpdate.bind(this);
    this.setName = this.setName.bind(this);
  }

  setName(e) { this.setState({listName: e.target.value}) }

  async deleteList() {
    console.log(`Delete list with id: ${this.props.listId}`);
    try {
      let response = await fetch(`http://localhost:5000/v1/board/${this.props.boardId}/list/${this.props.listId}`, {
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

  async updateList() {
    this.setState({isOpenUpdate: false});
    console.log(`Update list with id: ${this.props.listId} and name: ${this.state.listName}`);
    try {
      let response = await fetch(`http://localhost:5000/v1/board/${this.props.boardId}/list/${this.props.listId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`
        },
        body: JSON.stringify({
          "title": this.state.listName,
          "position": 2,
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

  closeModalUpdate() { this.setState({isOpenUpdate: false}) }

  render() {
    return (
      <React.Fragment>
        <div className="list-name">
          {this.props.title}
          <div className="dropdown">
            <span className="mr-1" id="dropdownMenu1" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-ellipsis-h"/>
            </span>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <span className="dropdown-item" onClick={() => this.setState({isOpenUpdate: true})}>Редактировать</span>
              <span className="dropdown-item" onClick={() => this.deleteList()}>Удалить</span>
            </div>
          </div>
          {this.state.isOpenUpdate &&
            <AddBoard
              title="Редактировать список"
              boardName={this.state.listName}
              setName={this.setName}
              close={this.closeModalUpdate}
              createBoard={this.updateList}/>
          }
          </div>
        <Card cards={this.props.cards}/>
      </React.Fragment>
    );
  }
}

export default List;
