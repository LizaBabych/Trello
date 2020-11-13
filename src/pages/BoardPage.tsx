import React from 'react';
import Board from '../components/Board';
import Header from '../components/Header';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import '../styles/sidebar.css';

function BoardPage(props) {

  const token = useSelector((state) => state.tokenReducer.token);
  console.log(`Страница с токеном: ${token} и id: ${props.match.params.id}`);
  const history = useHistory();

  if (token === 0) {
    history.push('/login');
  }
  return (
    <React.Fragment>
      <Header/>
      <div className="sidebar">
        <Board id={props.match.params.id} />
      </div>
    </React.Fragment>
  );
}

export default BoardPage;
