import React from 'react';
import User from './User';
import '../styles/users.css';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false};
  }

  // async updateUsers() {
  //   try {
  //     let response = await fetch(`http://localhost:5000/v1/board/${this.props.boardId}/card/${this.props.cardId}/users`, {
  //       method: "PUT",
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${this.props.token}`
  //       },
  //       body: JSON.stringify({
  //          add: [1, 2],
  //          remove: [1],
  //       }),
  //     });
  //     if (!response.ok) {
  //         console.log("Error: " + response.status);
  //     }
  //     let result = await response.json();
  //     console.log(result);
  //   } catch (error) {
  //       alert("Error");
  //   }
  // }

  render() {
    return (
        <div className="createBoard">
          <div className='modal'/>
          <div className="modal-container">
            <div className='modal-content'>
              <div className='modal-head'>
                <h5>{this.props.title}</h5>
                <button><i className="fas fa-times" onClick={this.props.close} /></button>
              </div>
              <div className='user-body'>
                {this.props.users.map((user) =>
                  <User title={user} />
                )}
                <i className="user-head mt-1 fas fa-plus mr-2" />
              </div>
              <div className="center mb-2">
                <button className="btn btn-success btn-sm mt-2">
                  Применить
                </button>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Users;
