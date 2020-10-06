import React from 'react';
import Header from '../components/Header';
import BoardCards from '../components/BoardCards';
import AddBoard from '../components/AddBoard';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';
import '../styles/createBoard.css';

class Boards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      boardName: ''
    };
    this.createBoard = this.createBoard.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setName = this.setName.bind(this);
  }

  async createBoard() {
    try {
      let response = await fetch("http://localhost:5000/v1/board", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'charset': 'utf-8',
        },
        body: JSON.stringify({
          'Authorization': `Bearer ${this.props.match.params.token}`,
          "title": this.state.boardName,
        }),
      });
      if (!response.ok) {
          console.log("Error: " + response.status);
      }
      let result = await response.json();
      console.log(result);
    } catch (error) {
        alert("Error");
    }
    this.setState({isOpen: false});
    console.log(`Created with name: ${this.state.boardName}`);
  }

  closeModal() {
    this.setState({isOpen: false})
  }

  createBoard(e) {
    this.setState({isOpen: false, boardName: e.target.value})
    console.log(this.state.boardName);
  }

  setName(e) {
    this.setState({boardName: e.target.value})
  }

  render() {
    const token = this.props.match.params.token;
    return (
      <div>
        <Header token={token}></Header>
        <div className="sidebar">
          <div className="sidenav">
            <Link className="active" to={token + "/boards"}>Доски</Link>
            <Link to={"/" + token}>Шаблоны</Link>
            <Link to={"/" + token}>Домашняя страница</Link>
            <Link to={"/" + token}>Команды</Link>
          </div>
          <div className="main">
            <BoardCards token={token}></BoardCards>
            <button className="btn" onClick={() => this.setState({isOpen: true})}>Добавить доску</button>
              {this.state.isOpen &&
                <div>
                  <AddBoard boardName={this.state.boardName} setName={this.setName} close={this.closeModal} createBoard={this.createBoard}/>
                </div>
              }
          </div>
        </div>
      </div>
    );
  }
}

export default Boards;
