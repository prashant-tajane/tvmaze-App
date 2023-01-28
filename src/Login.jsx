import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./App";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    setIsSubmitting(true);
    setIsSubmitting(false);
    setSubmitting(false);
  };

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field name="email" type="email" placeholder="Email" />
              <ErrorMessage name="email" />
            </div>
            <div>
              <Field name="password" type="password" placeholder="Password" />
              <ErrorMessage name="password" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
