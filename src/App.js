import React from 'react';
import './App.css';
import { Formik, Field, FieldArray, Form, ErrorMessage } from "formik";
import * as yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = yup.object().shape({
  friends: yup.array().of(
    yup.object().shape({
      name: yup.string()
        .required("Name is required"),
      email: yup.string()
        .email("Email is invalid")
        .required("Email is required"),
      phoneNumber: yup.string()
        .matches(phoneRegExp, 'Phone number is invalid')
        .min(10, "Phone number must be at least 10 characters")
        .max(11, "Phone number must be less than 11 characters")
        .required("Phone number is required"),
      age: yup.number()
    })
  )
});

function App() {
  return (
    <div className="App">
      <Formik
        initialValues = {{
          friends: []
        }}
        validationSchema = {validationSchema}
        onSubmit = {(values) => { 
          if (values.friends.length === 0) {
            alert("Friends list must be at least 1 friend -_-");
          } else {
            alert("OK :))");
          }
        }}
      >
        {({ errors, touched, values, handleChange }) => (
          <Form>
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <FieldArray name="friends">
                    {({ push, remove }) => (
                      <div>
                        {values.friends.map((friend, index) => {
                          return (
                            <div key={index}>
                              <div className="row">
                                <div className="col-10">
                                  <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <Field
                                      name={`friends[${index}].name`}
                                      type="name"
                                      value={friend.name}
                                      onChange={handleChange}
                                      className={
                                        "form-control" +
                                        (errors.name && touched.name ? " is-invalid" : "")
                                      }
                                    />
                                    <ErrorMessage
                                      name={`friends[${index}].name`}
                                      component="div"
                                      className="invalid-feedback"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="name">Email</label>
                                    <Field
                                      name={`friends[${index}].email`}
                                      type="email"
                                      value={friend.email}
                                      onChange={handleChange}
                                      className={
                                        "form-control" +
                                        (errors.email && touched.email ? " is-invalid" : "")
                                      }
                                    />
                                    <ErrorMessage
                                      name={`friends[${index}].email`}
                                      component="div"
                                      className="invalid-feedback"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="name">Phone Number</label>
                                    <Field
                                      name={`friends[${index}].phoneNumber`}
                                      type="tel"
                                      value={friend.phoneNumber}
                                      onChange={handleChange}
                                      className={
                                        "form-control" +
                                        (errors.phoneNumber && touched.phoneNumber ? " is-invalid" : "")
                                      }
                                    />
                                    <ErrorMessage
                                      name={`friends[${index}].phoneNumber`}
                                      component="div"
                                      className="invalid-feedback"
                                    />
                                  </div>
                                </div>
                                <div className="col-2">
                                  <div className="form-group">
                                    <button
                                      className="btn btn-danger mr-2"
                                      type="button"
                                      onClick={() => remove(index)}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                        <button
                          className="btn btn-primary mr-2"
                          type="button"
                          onClick={() => push({
                            name: "",
                            email: "",
                            phoneNumber: "",
                            age: "",
                          })}
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>
                <div className="col-6">
                  <div>
                    <button type="submit" className="btn btn-warning mr-2">Submit</button>
                  </div>
                  <br/>
                  <pre>{"Errors: " + JSON.stringify(errors, null, 2)}</pre>
                  <pre>{"List: " + JSON.stringify(values, null, 2)}</pre>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
