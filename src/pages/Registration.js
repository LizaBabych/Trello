import React from 'react';

export const Registration = () => {
  return (
    <div className="container">
      <div className="form">
        <p className="text-mut">Регистрация</p>
        <form>
          <div className="form-group">
            <input className="form-control"
            placeholder="Укажите адресс электронной почты"/>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Придумайте пароль"/>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Повторите пароль"/>
          </div>
          <div className="center">
            <button  type="submit" className="btn btn-success">Зарегистрироваться</button>
          </div>
        </form>
      </div>
    </div>
  );
}
