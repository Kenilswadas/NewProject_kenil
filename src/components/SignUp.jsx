import React, { useState } from "react";
import "../components/SignUp.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import img_form from "../images/Checklist.jpg";
import { auth } from "../Firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [valid, setValid] = useState(true);
  const formik = useFormik({
    initialValues: {
      Name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      Name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(8, "enter minimum 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])[a-zA-Z\d!@#$%^&*()_+{}[\]:;<>,.?~\\/-]{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, and one digit and one Special character"
        )
        .required("required"),
    }),
    onSubmit: (values) => {
      console.log("hi");
      createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then((credentails) => {
          console.log(credentails);
          setValid(true);
        })
        .catch(() => {
          console.log(formik.errors);
        });
      formik.resetForm();
      alert("account creaated");
      alert(JSON.stringify(values, null, 2));
      navigate("/SignIn")
    },
  });

  return (
    <div className="SignUp_main">
      <img src={img_form} alt="" className="SignUp_background-image" />
      <div className="SignUp_container">
        <h1 className="SignUp_h1">SignUP page</h1>
        <form action="" onSubmit={formik.handleSubmit} className="SignUp_form">
          <label htmlFor="Name">Name</label>
          <input id="Name" type="text" {...formik.getFieldProps("Name")} />
          {formik.touched.Name && formik.errors.Name ? (
            <div className="SignUp_errordiv">{formik.errors.Name}</div>
          ) : null}
          <label htmlFor="email">Email Address</label>
          <input id="email" type="email" {...formik.getFieldProps("email")} />
          {formik.touched.email && formik.errors.email ? (
            <div className="SignUp_errordiv">{formik.errors.email}</div>
          ) : null}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="SignUp_errordiv">{formik.errors.password}</div>
          ) : null}
          <button type="submit">Submit</button>
          <p>
            {`Already have an account ? || `}
            {
              <Link to="/SignIn">
                <button>Sign In</button>
              </Link>
            }
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
