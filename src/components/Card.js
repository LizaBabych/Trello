import React from 'react';
import '../styles/card.css';

function Card(props){

  //Пока выводит одну карточку, должен быть массив
  return (
    <div>
      <div className="card">
        <div className="name">
          {props.cards.title}
        </div>
        <div className="created">
          Created: {props.cards.created_at}
        </div>
        {props.cards.description}
      </div>
    </div>
  );
}

export default Card;
