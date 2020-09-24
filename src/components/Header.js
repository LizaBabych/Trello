import React from 'react';
import Modal from './Modal';
import '../styles/header.css';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top back-header">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <button className="nav-button"><i className="fas fa-home"></i></button>
          </li>
          <li className="nav-item">
            <button className="nav-button">Доски</button>
          </li>
          <li className="nav-item active">
            <button className="nav-button"><i className="fas fa-info-circle"></i></button>
          </li>
          <li className="nav-item">
            <button className="nav-button"><i className="fas fa-bell"></i></button>
          </li>
          <li className="nav-item">
            <button className="nav-button"><i className="fas fa-plus"></i></button>
          </li>
        </ul>
        <h3 className="head-name mr-auto">MyTrello</h3>
        <Modal></Modal>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"></input>
          <button className="btn btn-dark my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
}

export default Header;
