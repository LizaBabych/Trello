import React from "react";
import { Link } from 'react-router-dom';
import Modal from './Modal';
import '../styles/boardCard.css';

class BoardCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    return (
      <div className="board-card">
        <div className="board-card-name">
          <Link className="board-card-body-link" to={"/" + this.props.token + "/b/" + this.props.id}>{this.props.title}</Link>
          <div className="dropdown">
            <span className="mr-1" id="dropdownMenu1" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-ellipsis-h"/>
            </span>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <span className="dropdown-item" onClick={() => this.setState({isOpen: true})}>Редактировать</span>
              <span className="dropdown-item" onClick={this.props.deleteBoard}>Удалить</span>
            </div>
          </div>
        </div>
        {this.state.isOpen &&
          <Modal
            title="Редактировать доску"
            name={this.props.boardName}
            setName={this.props.setName}
            close={() => this.setState({isOpen: false})}
            execute={this.props.updateBoard}/>
        }
      </div>
    );
  }
}

export default BoardCard;
