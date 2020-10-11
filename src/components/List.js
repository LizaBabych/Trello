import React from 'react';
import Card from './Card';
import AddBoard from './AddBoard';
import '../styles/list.css';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      isOpen: false,
    };
  }

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
              <span className="dropdown-item" onClick={() => this.setState({isOpen: true})}>Редактировать</span>
              <span className="dropdown-item" onClick={this.props.deleteList}>Удалить</span>
            </div>
          </div>
          {this.state.isOpen &&
            <AddBoard
              title="Редактировать список"
              boardName={this.props.listName}
              setName={this.props.setName}
              close={() => this.setState({isOpen: false})}
              createBoard={this.props.updateList}/>
          }
          </div>
        <Card cards={this.props.cards}/>
      </React.Fragment>
    );
  }
}

export default List;
