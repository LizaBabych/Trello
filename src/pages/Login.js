import React from 'react';

export const Login = () => {
  return (
    <div className="container">
      <div className="form">
        <p className="text-mut">Вход в MyTrello</p>
        <form>
          <div className="form-group">
            <input className="form-control" placeholder="Укажите адресс электронной почты"/>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Укажите пароль"/>
          </div>
          <div className="center">
            <button type="submit" className="btn btn-success">Войти</button>
          </div>
        </form>
      </div>
    </div>
  );
}
