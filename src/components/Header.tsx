import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import { setLogin } from "../store/actions/isLoginActions";
import { useDispatch } from "react-redux";

const Header = () => {

  const dispatch = useDispatch();
  const setIsLogin = (isLogin) => { dispatch(setLogin(isLogin)); };

  const clickHandler = () => {
    localStorage.removeItem('token');
    setIsLogin(0);
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top back-header">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <button className="nav-button"><Link className="link" to={"/"}><i className="fas fa-home"/></Link></button>
          </li>
          <li className="nav-item">
            <button className="nav-button"><Link className="link" to={"/boards"}>Доски</Link></button>
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
        <i className="fas fa-door-open" onClick={() => clickHandler()}/>
      </div>
    </nav>
  );
}

export default Header;
