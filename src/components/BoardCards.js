import React from 'react';
import BoardCard from '../components/BoardCard';

class BoardCards extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      boards: []
    };
  }

  async componentDidMount() {
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

  render() {
    return (
      <React.Fragment>
        {this.state.isLoad &&
          <div>
            {this.state.boards.map((board) =>
              <BoardCard key={board.id} token={this.props.token} id={board.id} title={board.title} />
            )}
          </div>
        }
      </React.Fragment>
    );
  }
}

export default BoardCards;
