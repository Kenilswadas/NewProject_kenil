import React from "react";
import "../../src/components/SignUp.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../Firebase";
import img_form from "../images/Checklist.jpg";
function SignUp() {
  function handleSubmit(event) {
    console.log("hi");
    event.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      formik.values.name,
      formik.values.email,
      formik.values.passowrd
    ).then((credentails) => {
      console.log(credentails);
    });
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
        email: Yup.string().email("Invalid email address").required("required"),
      password: Yup.string()
        .min(8, "enter minimum 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])[a-zA-Z\d!@#$%^&*()_+{}[\]:;<>,.?~\\/-]{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, and one digit and one Special character"
        )
        .required("required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="main">
      <img src={img_form} alt="" class="background-image" />
      <div className="container">
        <h1>SignUP page</h1>
        <form action="" className="form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name </label>
          <input type="text" id="name" {...formik.getFieldProps("name")} />
          {formik.touched.name && formik.errors.name ? (
            <div className="errordiv">{formik.errors.name}</div>
          ) : null}
          <label htmlFor="email">Email </label>
          <input type="email" id="email" {...formik.getFieldProps("email")} />
          {formik.touched.email && formik.errors.email ? (
            <div className="errordiv">{formik.errors.email}</div>
          ) : null}
          <label htmlFor="password">Password </label>
          <input
            type="text"
            id="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="errordiv">{formik.errors.password}</div>
          ) : null}
          <button type="submit">Submit me</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
