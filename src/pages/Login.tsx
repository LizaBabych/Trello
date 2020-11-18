import React from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { setLogin } from "../store/actions/isLoginActions";
import { useDispatch, useSelector } from "react-redux";
import '../styles/sidebar.css';

const Login = (props) => {

  const dispatch = useDispatch();
  const setIsLogin = (isLogin) => { dispatch(setLogin(isLogin)); };
  const isLogin = useSelector((state) => state.isLoginReducer.isLogin);

  const history = useHistory();
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
             if (isLogin === 1) {
               localStorage.setItem('token', JSON.stringify(res.token));
               history.push('/');
             }
           } catch (error) {
               alert("Error");
           }
         }}
         validationSchema={Yup.object({
           email: Yup.string().email("Поле должно быть email адрессом").required("Это поле обязательное!"),
           password: Yup.string().min(6, "Количество символов меньше 6").required("Это поле обязательное!"),
         })}
       >
         {props => (
           <form onSubmit={props.handleSubmit}>
           {props.touched.email && props.errors.email && <div className="text-danger">{props.errors.email}</div>}
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
             {props.touched.password && props.errors.password && <div className="text-danger">{props.errors.password}</div>}
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
             <div className="center">
               <button type="submit" className="btn btn-success" onClick={() => setIsLogin(1)}>
                 Войти
               </button>
             </div>
           </form>
         )}
     </Formik>
    </div>
  );
};

export default Login;
