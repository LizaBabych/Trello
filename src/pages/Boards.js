import React from 'react';
import Header from '../components/Header';
import BoardCards from '../components/BoardCards';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

export const Boards = (props) => {
  const token = "1600427382873";
  console.log(props.match.params.token);
  return (
    <div>
      <Header></Header>
      <div className="sidebar">
        <div className="sidenav">
          <Link className="active" to="/boards">Доски</Link>
          <Link to="/">Шаблоны</Link>
          <Link to="/">Домашняя страница</Link>
          <Link to="/">Команды</Link>
        </div>
        <div className="main">
          <BoardCards token={token}></BoardCards>
        </div>
      </div>
    </div>
  );
}
