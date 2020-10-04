import React from 'react';
import Header from '../components/Header';
import BoardCards from '../components/BoardCards';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

function Boards(props) {
  const token = props.match.params.token;
  return (
    <div>
      <Header></Header>
      <div className="sidebar">
        <div className="sidenav">
          <a className="active">Доски</a>
          <Link to={"/" + token}>Шаблоны</Link>
          <Link to={"/" + token}>Домашняя страница</Link>
          <Link to={"/" + token}>Команды</Link>
        </div>
        <div className="main">
          <BoardCards token={token}></BoardCards>
        </div>
      </div>
    </div>
  );
}

export default Boards;
