import React from 'react';
import Card from '../components/Card';
import '../styles/list.css';
import '../styles/createBoard.css';

class List extends React.Component {

//Рендерит пустой масив чето
  constructor(props) {
    super(props);
    this.state = {lists:   [
        {id: 1591534954824, cards: {
          created_at: 1591534966296,
          description: "s",
          id: 1591534954824,
          position: 1,
          title: "test",
        }, title: "test", position: 1},
        {id: 1591534959397, cards: {
          created_at: 1591534966296,
          description: "s",
          id: 1591534954824,
          position: 1,
          title: "test",
        }, title: "test2", position: 2},
        {id: 1591534982687, cards: {
          created_at: 1591534966296,
          description: "s",
          id: 1591534954824,
          position: 1,
          title: "test",
        }, title: "test", position: 3}
      ],
      isOpen: false,
      boardName: '',
    };
  }

  // componentDidMount() {
  //   if (this.props.lists.length!== 0){
  //     this.setState({lists: this.props.lists});
  //     console.log(this.state.lists);
  //   }
  // }

  async updateBoard() {
    try {
      let response = await fetch(`http://localhost:5000/v1/board/${this.props.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'charset': 'utf-8',
        },
        body: JSON.stringify({
          'Authorization': `Bearer ${this.props.token}`,
          "title": this.state.boardName, // ошибка
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
      <div className="list">
        {this.state.lists.map((list) =>
          <form key={list.position} className="form-list">
            <div className="list-name">
              {list.title}
              <i onClick={() => this.setState({isOpen: true})} className="fas fa-edit" />
            </div>
            <Card cards={list.cards}></Card>
            {this.state.isOpen ?
              <div>
                <div className='modal'></div>
                <div className="modal-container">
                  <div className='modal-content'>
                    <div className='modal-head'>
                      <h5>Редактировать</h5>
                      <i className="fas fa-times" onClick={() => this.setState({isOpen: false})}></i>
                    </div>
                    <div className='modal-body'>
                      <input
                        type="text"
                        value={this.state.boardName}
                        onChange={(e) => this.setState({boardName: e.target.value})}
                        className="form-control mb-2"
                        placeholder="Имя доски" />
                    </div>
                    <div className="center">
                      <button className="btn btn-sm btn-success mb-2" onClick={this.updateBoard}>Сохранить</button>
                    </div>
                  </div>
                </div>
              </div> : <div />
            }
          </form>
        )}
      </div>
    );
  }
}

export default List;
