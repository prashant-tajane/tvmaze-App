import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    setIsSubmitting(true);
    setIsSubmitting(false);
    setSubmitting(false);
  };

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .required("Required")
            .min(8, "Password must be at least 8 characters long"),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="name" type="text" placeholder="Name" />
            <ErrorMessage name="name" component="div" />
            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Signup
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
