import React from 'react';
import '../styles/list.css';

function List(props) {
  console.log(props.lists);
  return (
    <div className="list">
      <form className="form-list">
        <div className="form-group">

        </div>
      </form>
    </div>
  );
}

export default List;

// Передаем список листов. Через map отрисовываем


// {props.lists.map((list) =>
//   <div key={list.id} token={list.token} id={list.id} title={list.title}></div>
// )}

// <input v-model="listName" className="form-control" placeholder="Укажите название списка"/>
// <button type="submit" className="btn btn-success mt-1 mb-1">Добавить</button>
// <button className="btn"><i className="fa fa-close"></i></button>
