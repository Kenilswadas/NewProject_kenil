import React from "react";
import "./Formpage.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import img_form from "./images/Checklist.jpg";

function Formpage() {
  //   const validate = (values) => {
  //     console.log(values);
  //     const errors = {};
  //     if (!values.firstName) {
  //       errors.firstName = "Required";
  //     } else if (values.firstName.length > 15) {
  //       errors.firstName = "Must be 15 characters or less";
  //     }

  //     if (!values.lastName) {
  //       errors.lastName = "Required";
  //     } else if (values.lastName.length > 20) {
  //       errors.lastName = "Must be 20 characters or less";
  //     }

  //     if (!values.email) {
  //       errors.email = "Required";
  //     } else if (
  //       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z0-9]{2,4}$/i.test(values.email)
  //     ) {
  //       errors.email = "Invalid email address";
  //     }

  //     return errors;
  //   };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    // validate,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("required"),
      password: Yup.string()
        .min(8, "enter minimum 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, and one digit and one Special character"
        )
        .required("required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      formik.resetForm();
    },
  });
  console.log(formik);
  return (
    <div>
      <img src={img_form} alt="" class="background-image" />
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          {...formik.getFieldProps("firstName")} //why this .........solved
          //this is because of we don't want to add below three line
          //   name="firstName"
          //   onChange={formik.handleChange}
          //   value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div>{formik.errors.firstName}</div>
        ) : null}
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          {...formik.getFieldProps("lastName")}
          // onBlur={formik.handleBlur}
          // onChange={formik.handleChange}
          // value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div>{formik.errors.lastName}</div>
        ) : null}
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          // name="email"
          // onChange={formik.handleChange}
          // value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="text"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Formpage;
