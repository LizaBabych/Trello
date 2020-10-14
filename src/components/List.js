import React from 'react';
import Cards from './Cards';
import Modal from './Modal';
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
            <Modal
              title="Редактировать список"
              name={this.props.listName}
              setName={this.props.setName}
              close={() => this.setState({isOpen: false})}
              execute={this.props.updateList}/>
          }
          </div>
        <Cards cards={this.props.cards} boardId={this.props.boardId} listId={this.props.listId} token={this.props.token} />
      </React.Fragment>
    );
  }
}

export default List;
