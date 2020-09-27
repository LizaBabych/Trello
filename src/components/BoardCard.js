import React from "react";
import '../styles/boardCard.css';

function BoardCard(props) {
  return (
    <div className="board-card-list">
      <div className="board-card">
        <div className="board-card-name">
          {props.title}
        </div>
      </div>
    </div>
  );
}

export default BoardCard;
