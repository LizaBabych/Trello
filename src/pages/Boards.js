import React from 'react';
import Header from '../components/Header';
import BoardCards from '../components/BoardCards';
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
    const token = this.props.match.params.token;
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
          "title": this.state.boardName, // ошибка чето
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

  render() {
    return (
      <div>
        <Header token={this.props.match.params.token}></Header>
        <div className="sidebar">
          <div className="sidenav">
            <a className="active">Доски</a>
            <Link to={"/" + this.props.match.params.token}>Шаблоны</Link>
            <Link to={"/" + this.props.match.params.token}>Домашняя страница</Link>
            <Link to={"/" + this.props.match.params.token}>Команды</Link>
          </div>
          <div className="main">
            <BoardCards token={this.props.match.params.token}></BoardCards>
            <button className="btn" onClick={() => this.setState({isOpen: true})}>Добавить доску</button>
            {this.state.isOpen ? <div className="createBoard">
              <div className='modal'></div>
              <div className="modal-container">
                <div className='modal-content'>
                  <div className='modal-head'>
                    <h5>Создание доски</h5>
                    <button><i className="fas fa-times" onClick={() => this.setState({isOpen: false})}></i></button>
                  </div>
                  <div className='modal-body'>
                    <input
                      type="text"
                      value={this.state.boardName}
                      onChange={this.updateInputValue}
                      className="form-control mb-2"
                      placeholder="Введите название доски" />
                    <div className="center">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={(e) => this.setState({boardName: e.target.value})}>
                        Создать
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>: <div />
          }
          </div>
        </div>
      </div>
    );
  }
}

export default Boards;
