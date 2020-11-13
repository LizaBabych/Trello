import React from 'react';
import Header from '../components/Header';
import { useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import logo from '../assets/team.jpg';
import '../styles/sidebar.css';

function Home() {
  
  const token = useSelector((state) => state.tokenReducer.token);
  const history = useHistory();

  if (token === 0) {
    history.push('/login');
  }

  return (
    <React.Fragment>
      <Header/>
      <div className="sidebar">
        <div className="sidenav">
          <Link to={"/boards"}>Доски</Link>
          <Link to={"/"}>Шаблоны</Link>
          <a className="active">Домашняя страница</a>
          <Link to={"/"}>Команды</Link>
        </div>
        <div className="main">
          <div className="mes">
            <img src={logo} alt="Error"></img>
            <h5 className="head-par">Оставайтесь на правильном пути и в курсе событий</h5>
            <p className="par">Приглашайте людей к доскам и карточкам, оставляйте комментарии и
              добавляйте даты завершения. Здесь будет отображаться важная активность.</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
