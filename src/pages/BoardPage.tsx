import React from 'react';
import Board from '../components/Board';
import Header from '../components/Header';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import '../styles/sidebar.css';

function BoardPage(props) {

  const token = JSON.parse(localStorage.getItem('token') || '{}');
  console.log(`Страница с токеном: ${token} и id: ${props.match.params.id}`);
  const history = useHistory();

  const isLogin = useSelector((state) => state.isLoginReducer.isLogin);

  if (!localStorage.getItem('token') && isLogin === 0) {
    history.push('/login');
  }

  return (
    <>
      <Header/>
      <div className="sidebar">
        <Board id={props.match.params.id} />
      </div>
    </>
  );
}

export default BoardPage;
