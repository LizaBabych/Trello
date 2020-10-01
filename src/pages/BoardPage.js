import React from 'react';
import Board from '../components/Board';
import Header from '../components/Header';
import '../styles/sidebar.css';

function BoardPage(props) {
  return (
    <div>
      <Header></Header>
      <div className="sidebar">
        <Board token={props.match.params.token} id={props.match.params.id}></Board>
      </div>
    </div>
  );
}

export default BoardPage;
