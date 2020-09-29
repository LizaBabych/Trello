import React from 'react';
import Board from '../components/Board';
import Header from '../components/Header';
import '../styles/sidebar.css';

function BoardPage() {
  return (
    <div>
      <Header></Header>
      <div className="sidebar">
        <Board></Board>
      </div>
    </div>
  );
}

export default BoardPage;
