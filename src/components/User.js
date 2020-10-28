import React from 'react';
import '../styles/users.css';

function User(props) {
  return (
    <span className="user-head">
      <h5 className="badge badge-pill badge-light mr-2">
        <span className="mr-1">{props.title}</span>
        <span className="badge badge-pill badge-secondary"><i className="fas fa-times" /></span>
      </h5>
    </span>
  );
}

export default User;
