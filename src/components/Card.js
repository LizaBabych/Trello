import React from 'react';
import Modal from './Modal';
import '../styles/card.css';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.getDate = this.getDate.bind(this);
  }

  getDate(date) {
    return(' ' + date.getDate() + '.' + +(date.getMonth() + 1) + '.' + date.getFullYear() + ' '
    + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
  }

  render() {
    return (
      <React.Fragment>
        <div className="name">
          {this.props.title}
          <div className="dropdown">
            <span className="mr-1" id="dropdownMenu1" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-ellipsis-h grey"/>
            </span>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <span className="dropdown-item" onClick={() => this.setState({isOpen: true})}>Редактировать</span>
              <span className="dropdown-item" onClick={this.props.deleteCard}>Удалить</span>
            </div>
          </div>
        </div>
        <div className="created mt-2">
          {this.getDate(new Date(this.props.created))}
        </div>
        {this.state.isOpen &&
          <React.Fragment>
            <Modal
              title="Редактировать карточку"
              name={this.props.cardName}
              setName={this.props.setName}
              close={() => this.setState({isOpen: false})}
              execute={this.props.updateCard}/>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

export default Card;
