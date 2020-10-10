import React from 'react';
import BoardCard from './BoardCard';
import AddBoard from './AddBoard';

class BoardCards extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      isOpen: false,
      boards: [],
      boardName: '',
    };
    this.getBoards = this.getBoards.bind(this);
    this.createBoard = this.createBoard.bind(this);
  }

  async componentDidMount() {
    await this.getBoards();
  }

  async getBoards() {
    try {
      let response = await fetch("http://localhost:5000/v1/board", {
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
      this.setState({boards: result.boards, isLoad: true});
    } catch (error) {
        alert("Error");
    }
    console.log("Получили доски: ");
    console.log(this.state.boards);
  }


  async createBoard(e) {
    this.setState({isOpen: false, boardName: e.target.value})
    console.log(`Created with name: ${this.state.boardName}`);
    try {
      let response = await fetch("http://localhost:5000/v1/board", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`,
        },
        body: JSON.stringify({
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
    await this.getBoards();
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isLoad &&
          <div>
            {this.state.boards.map((board) =>
              <BoardCard key={board.id}
              token={this.props.token}
              id={board.id}
              title={board.title}
              getBoards={this.getBoards} />
            )}
            <button className="btn" onClick={() => this.setState({isOpen: true})}>Добавить доску</button>
              {this.state.isOpen &&
                <AddBoard
                  title="Создание доски"
                  boardName={this.state.boardName}
                  setName={(e) => this.setState({boardName: e.target.value})}
                  close={() => this.setState({isOpen: false})}
                  createBoard={this.createBoard}/>
              }
          </div>
        }
      </React.Fragment>
    );
  }
}

export default BoardCards;
