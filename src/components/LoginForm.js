import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Поле должно быть email адрессом").required("Это поле обязательное"),
      password: Yup.string().min(6, "Количество символов меньше 6").required("Это поле обязательное!"),
    }),
    onSubmit: async (values) => {
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
        console.log(res);
      } catch (error) {
          alert("Error");
      }
   },
  });

  return (
    <div className="form">
      <p className="text-mut">Вход в MyTrello</p>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Укажите email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
           <div className="text-danger">{formik.errors.email}</div>
         )}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Укажите пароль"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
           <div className="text-danger">{formik.errors.password}</div>
         )}
        </div>
        <div className="center">
          <button type="submit" className="btn btn-success">
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
