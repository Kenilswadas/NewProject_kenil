import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import img_form from "../images/Checklist.jpg";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import "../components/SignIn.css";
import {useNavigate} from 'react-router-dom'
function SignIn() {
  const navigate = useNavigate();
  const [error, seterror] = useState()
  async function handleSubmit(event) {
    console.log("hi");
    event.preventDefault();
    await signInWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then((data) => {
        console.log(data.user);
        alert("Successfully Logged In");
        alert(formik.values.email,formik.values.password);
        navigate("/Home");
      })
      .catch((error) => {
        seterror(error);
      });
      
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
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
      alert(JSON.stringify(values, null, 2));
      // formik.resetForm();
    },
  });
 
  return (
    <div className="SignIn_main">
      <img src={img_form} alt="" className="SignIn_background-image" />
      <div className="SignIn_container">
        <form action="" className="SignIn_form"  noValidate>
          <h1 className="SignIn_h1">SignIn page</h1>
          <label htmlFor="Email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email ...."
            {...formik.getFieldProps("email")}
          />
          <label htmlFor="Email">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password...."
            // onChange={(e)=>console.log(e.target.value)}
            {...formik.getFieldProps("password")}
          />
          {error? <div className="SignIn_errordiv">{error.message}</div> :null}
          <button type="submit" onClick={handleSubmit}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
