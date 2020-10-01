import React from "react";
import { Link } from 'react-router-dom';
import '../styles/boardCard.css';

function BoardCard(props) {
  return (
    <div className="board-card-list">
      <div className="board-card">
        <div className="board-card-name">
          {props.title}
        </div>
        <div className="board-card-body">
          <Link className="board-card-body-link" to={"/" + props.token + "/b/" + props.id}> >>> </Link>
        </div>
      </div>
    </div>
  );
}

export default BoardCard;
