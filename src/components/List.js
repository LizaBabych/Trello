import React from 'react';
import '../styles/list.css';
import '../styles/createBoard.css';
import Card from './Card';
import AddBoard from '../components/AddBoard';

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      boardName: '',
      lists: {
        1591534954824:
        {id: 1591534954824, cards: {
          created_at: 1591534966296,
          description: "s",
          id: 1591534954824,
          position: 1,
          title: "test",
        }, title: "test", position: 1
        },
        1591534954817:
        {id: 1591534954817, cards: {
          created_at: 1591534966296,
          description: "s",
          id: 1591534954824,
          position: 1,
          title: "test",
        }, title: "test", position: 1
        },
      }
    };
    this.updateBoard = this.updateBoard.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setName = this.setName.bind(this);
  }

  async updateBoard(e) {
    this.setState({isOpen: false, boardName: e.target.value})
    console.log(`Updated with name: ${this.state.boardName}`);
  }

  closeModal() { this.setState({isOpen: false}) }

  setName(e) { this.setState({boardName: e.target.value}) }

  render() {
    return (
      <div className="list">
        {Object.keys(this.state.lists).map((list, index) => (
          <form key={index} className="form-list">
            <div className="list-name">
              {list}
              <i onClick={() => this.setState({isOpen: true})} className="fas fa-edit" />
            </div>
          </form>
        ))}
        {this.state.isOpen &&
          <React.Fragment>
            <AddBoard
              title="Редактировать"
              boardName={this.state.boardName}
              setName={this.setName}
              close={this.closeModal}
              createBoard={this.updateBoard}/>
          </React.Fragment>
        }
      </div>
    );
  }
}

export default List;

// {this.state.lists.map((list) =>
//   <form key={list.position} className="form-list">
//     <div className="list-name">
//       {list.title}
//       <i onClick={() => this.setState({isOpen: true})} className="fas fa-edit" />
//     </div>
//     <Card cards={list.cards}/>
//   </form>
// )}
