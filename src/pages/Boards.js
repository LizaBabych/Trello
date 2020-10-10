import React from 'react';
import Header from '../components/Header';
import BoardCards from '../components/BoardCards';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';
import '../styles/createBoard.css';

function Boards(props) {
  const token = props.match.params.token;

  return (
    <React.Fragment>
      <Header token={token}></Header>
      <div className="sidebar">
        <div className="sidenav">
          <a className="active">Доски</a>
          <Link to={"/" + token}>Шаблоны</Link>
          <Link to={"/" + token}>Домашняя страница</Link>
          <Link to={"/" + token}>Команды</Link>
        </div>
        <div className="main">
          <BoardCards token={token} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Boards;
