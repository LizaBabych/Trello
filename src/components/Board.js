import React from 'react';
import List from '../components/List';

function Board(props) {

  const board = getBoard();
  console.log(`Bearer ${board}`); // Promise

  async function getBoard() {
    try {
      let response = await fetch("http://localhost:5000/v1/board/1591534948835", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 1600427382873'
        },
      });
      if (!response.ok) {
          console.log("Error: " + response.status);
      }
      let result = await response.json();
      return result;
    } catch (error) {
        alert("Error");
    }
  }

  return (
    <div>
      <List lists={board.lists}></List>
    </div>
  );
}

export default Board;
