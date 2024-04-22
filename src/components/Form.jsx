import React, { useState } from "react";
import { insertIntoAPI } from "../helpers/axiosHelper";

export const Form = ({ setEntryList, setTtlHr }) => {
  const initialState = { task: "", hr: "", type: "entry" };
  const [form, setForm] = useState(initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "hr" ? +value : value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      ...form,
    };
    const result = insertIntoAPI(obj, setEntryList, setTtlHr);

    if (result.status === "success") {
      setForm(initialState);
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="mt-5 border p-5 rounded shadow-lg bg-transparent">
      <div className="row g-2">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Coding.."
            aria-label="First name"
            name="task"
            required
            onChange={handleOnChange}
            value={form.task}
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
            value={form.hr}
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
