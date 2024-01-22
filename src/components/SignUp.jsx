import React from "react";
import "../components/SignUp.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import img_form from "../images/Checklist.jpg";
import { auth } from "../Firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
function SignUp() {
  async function handleSubmit(event) {
    console.log("hi");
    event.preventDefault();
    await createUserWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then((credentails) => {
        console.log(credentails);
      })
      .catch(() => {
        console.log(formik.errors);
      });
    alert(JSON.stringify(formik.values, null, 2));
    formik.resetForm();
  }
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
      alert(JSON.stringify(values, null, 2));
      // formik.resetForm();
    },
  });
  return (
    <div className="main">
      <img src={img_form} alt="" className="background-image" />
      <div className="container">
        <h1>SignUP page</h1>
        <form action="" onSubmit={handleSubmit} className="form">
          <label htmlFor="Name">Name</label>
          <input id="Name" type="text" {...formik.getFieldProps("Name")} />
          {formik.touched.Name && formik.errors.Name ? (
            <div>{formik.errors.Name}</div>
          ) : null}
          <label htmlFor="email">Email Address</label>
          <input id="email" type="email" {...formik.getFieldProps("email")} />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
          <button type="submit">Submit</button>
        </form>
        <p>{`Already have an account ||`}{}</p>
      </div>
    </div>
  );
}

export default SignUp;
