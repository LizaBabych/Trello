import React from 'react';
import BoardCard from '../components/BoardCard';

function BoardCards(props) {

  const boards = //getBoards();
  [
    {id: 1591534943599, title: "test"},
    {id: 1591534948835, title: "test2"},
  ]

  async function getBoards() {
    try {
      let response = await fetch("http://localhost:5000/v1/board", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.token}`
        },
      });
      if (!response.ok) {
          console.log("Error: " + response.status);
      }
      let result = await response.json();
      console.log(result.boards);
      return result.boards;
    } catch (error) {
        alert("Error");
    }
  }

  return (
    <div>
      {boards.map((board) =>
        <BoardCard key={board.id} token={props.token} id={board.id} title={board.title}></BoardCard>
      )}
    </div>
  );
}

export default BoardCards;
