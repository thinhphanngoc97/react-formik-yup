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
        .positive("Age must be greater than 0")
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
        {({ errors, values, handleChange }) => (
          <Form>
            <div className="container">
              <div className="row">
                <div className="col-5">
                  <FieldArray name="friends">
                    {({ push, remove }) => (
                      <div>
                        {values.friends.map((friend, index) => {
                          return (
                            <div key={index}>
                              <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Field
                                  name={`friends[${index}].name`}
                                  type="text"
                                  value={friend.name || ""}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name={`friends[${index}].name`}
                                  component="div"
                                  className="invalid-feedback d-block"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="name">Email</label>
                                <Field
                                  name={`friends[${index}].email`}
                                  type="text"
                                  value={friend.email || ""}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name={`friends[${index}].email`}
                                  component="div"
                                  className="invalid-feedback d-block"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="name">Phone Number</label>
                                <Field
                                  name={`friends[${index}].phoneNumber`}
                                  type="text"
                                  value={friend.phoneNumber || ""}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name={`friends[${index}].phoneNumber`}
                                  component="div"
                                  className="invalid-feedback d-block"
                                />
                              </div>
                              <div className="form-group">
                                <input 
                                  type="checkbox"
                                  onClick={() => {
                                    const ageCheckbox = document.querySelector(`#age-checkbox-${index}`);
                                    const ageInput = document.querySelector(`#age-input-${index}`);
                                    if (ageCheckbox.checked) {
                                      ageInput.className = "form-control d-block";
                                    } else {
                                      ageInput.className = "form-control d-none";
                                      ageInput.value = "";
                                      values.friends[index].age = "";
                                    }
                                  }}
                                  id={`age-checkbox-${index}`}
                                />
                                <label style={{marginLeft: '5px'}}>Age</label>
                                <Field
                                  name={`friends[${index}].age`}
                                  type="text"
                                  value={friend.age || ""}
                                  onChange={handleChange}
                                  className="form-control d-none"
                                  id={`age-input-${index}`}
                                />
                                <ErrorMessage
                                  name={`friends[${index}].age`}
                                  component="div"
                                  className="invalid-feedback d-block"
                                />
                              </div>
                              <div className="form-group clearfix">
                                <button
                                  className="btn btn-danger mr-2 float-right"
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  Remove
                                </button>
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
                            age: ""
                          })}
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>
                <div className="col-7">
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
