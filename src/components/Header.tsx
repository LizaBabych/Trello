import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

function Header(props): any {
  return (
    <nav className="navbar navbar-expand-lg fixed-top back-header">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <button className="nav-button"><Link className="link" to={"/" + props.token}><i className="fas fa-home"/></Link></button>
          </li>
          <li className="nav-item">
            <button className="nav-button"><Link className="link" to={"/" + props.token + "/boards"}>Доски</Link></button>
          </li>
          <li className="nav-item">
            <button className="nav-button"><i className="fas fa-info-circle"/></button>
          </li>
          <li className="nav-item">
            <button className="nav-button"><i className="fas fa-bell"/></button>
          </li>
          <li className="nav-item">
            <button className="nav-button">
               <i className="fas fa-plus"/>
            </button>
          </li>
        </ul>
        <h3 className="head-name mr-auto">MyTrello</h3>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"></input>
          <button className="btn btn-dark my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
}

export default Header;
