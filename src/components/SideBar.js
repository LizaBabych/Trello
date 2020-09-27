import React from 'react';
import BoardCards from '../components/BoardCards';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

function SideBar(props) {
  return (
    <div className="sidebar">
      <div className="sidenav">
        <Link className="active" to="/boards">Доски</Link>
        <Link to="/">Шаблоны</Link>
        <Link to="/">Домашняя страница</Link>
        <Link to="/">Команды</Link>
      </div>
      <div className="main">
        <BoardCards token={props.token}></BoardCards>
      </div>
    </div>
  );
}

export default SideBar;
