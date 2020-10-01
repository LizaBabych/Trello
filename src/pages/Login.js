import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {token: ''};
  }

  render() {
    return (
      <div className="form">
        <p className="text-mut">Вход в MyTrello</p>
        <Formik
           initialValues={{ email: '', password: '' }}
           onSubmit={ async (values) => {
             try {
               let response = await fetch("http://localhost:5000/v1/login", {
                 method: "POST",
                 headers: {
                   'Content-Type': 'application/json',
                   'charset': 'utf-8',
                 },
                 body: JSON.stringify({
                   "email": values.email,
                   "password": values.password,
                 }),
               });
               if (!response.ok) {
                   console.log("Error: " + response.status);
               }
               let res = await response.json();
               this.setState({ token: res.token });
               console.log(res);
             } catch (error) {
                 alert("Error");
             }
           }}
           validationSchema={Yup.object({
             email: Yup.string().email("Поле должно быть email адрессом").required("Это поле обязательное"),
             password: Yup.string().min(6, "Количество символов меньше 6").required("Это поле обязательное!"),
           })}
         >
           {props => (
             <form onSubmit={props.handleSubmit}>
               <div className="form-group">
                 <input
                   type="email"
                   className="form-control"
                   placeholder="Укажите email"
                   onChange={props.handleChange}
                   onBlur={props.handleBlur}
                   value={props.values.email}
                   name="email"
                 />
               </div>
               {props.touched.email && props.errors.email && <div className="text-danger">{props.errors.email}</div>}
               <div className="form-group">
                 <input
                   type="password"
                   className="form-control"
                   placeholder="Укажите пароль"
                   onChange={props.handleChange}
                   onBlur={props.handleBlur}
                   value={props.values.password}
                   name="password"
                 />
               </div>
               {props.touched.password && props.errors.password && <div className="text-danger">{props.errors.password}</div>}
               <div className="center">
                 <button type="submit" className="btn btn-success">
                   Войти
                 </button>
                 <Link to={"/" + this.state.token}>Войти</Link>
               </div>
             </form>
           )}
       </Formik>
      </div>
    );
  }
};

export default Login;
