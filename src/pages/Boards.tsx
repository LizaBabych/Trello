import React from 'react';
import Header from '../components/Header';
import BoardCards from '../components/BoardCards';
import { useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import '../styles/sidebar.css';
import '../styles/modal.css';

function Boards(props): any {

  const isLogin = useSelector((state) => state.isLoginReducer.isLogin);

  const history = useHistory();

  if (!localStorage.getItem('token') && isLogin === 0) {
    history.push('/login');
  }

  return (
    <>
      <Header/>
      <div className="sidebar">
        <div className="sidenav">
          <a className="active">Доски</a>
          <Link to={"/"}>Шаблоны</Link>
          <Link to={"/"}>Домашняя страница</Link>
          <Link to={"/"}>Команды</Link>
        </div>
        <div className="main">
          <BoardCards />
        </div>
      </div>
    </>
  );
}

export default Boards;
