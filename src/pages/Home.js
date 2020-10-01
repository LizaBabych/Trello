import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

function Home(props) {
  const token = props.match.params.token;
  return (
    <div>
      <Header></Header>
      <div className="sidebar">
        <div className="sidenav">
          <Link to={token + "/boards"}>Доски</Link>
          <Link to={"/" + token}>Шаблоны</Link>
          <Link className="active" to={"/" + token}>Домашняя страница</Link>
          <Link to={"/" + token}>Команды</Link>
        </div>
        <div className="main">
          <div className="mes">
            <img src="../assets/team.jpg" alt="Error"></img>
            <h5 className="head-par">Оставайтесь на правильном пути и в курсе событий</h5>
            <p className="par">Приглашайте людей к доскам и карточкам, оставляйте комментарии и
              добавляйте даты завершения. Здесь будет отображаться важная активность.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
// <SideBar token="1600427382873"></SideBar>
