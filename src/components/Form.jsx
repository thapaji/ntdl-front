/* eslint-disable react/prop-types */
import React, { useState } from "react";

export const Form = ({ addNewTask }) => {
  //local state
  const [form, setForm] = useState({
    type: "entry",
  });

  // create a function that receives the form data and updates to the local state
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name ==='hr'?+value:value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const obj = {
      ...form,
      id: randomIdGenerator(),
    };

    addNewTask(obj);
  };

  const randomIdGenerator = () => {
    const idLength = 6;
    const str =
      "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890";

    let id = "";
    for (let i = 0; i < idLength; i++) {
      const randomPosition = Math.floor(Math.random() * str.length);
      id += str[randomPosition];
    }
    return id;
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-5 border p-5 rounded shadow-lg bg-transparent"
    >
      <div className="row g-2">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Coding.."
            aria-label="First name"
            name="task"
            required
            // call the fuction on onchange event of the inputfield
            onChange={handleOnChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            min="1"
            className="form-control"
            placeholder="23"
            aria-label="Last name"
            name="hr"
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="col-md-3">
          <div className="d-grid">
            <button className="btn btn-primary">Add Task</button>
          </div>
        </div>
      </div>
    </form>
  );
};
