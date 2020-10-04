import React from 'react';
import Card from '../components/Card';
import '../styles/list.css';

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
      ]};
  }

  componentDidMount() {
    if (this.props.lists.length!== 0){
      this.setState({lists: this.props.lists});
      console.log(this.state.lists);
    }
  }

  render() {
    return (
      <div className="list">
        {this.state.lists.map((list) =>
          <form key={list.position} className="form-list">
            <div className="list-name">
              {list.title}
            </div>
            <Card cards={list.cards}></Card>
          </form>
        )}
      </div>
    );
  }
}

export default List;
