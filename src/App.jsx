import { useEffect, useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { Table } from "./components/Table";
import { Title } from "./components/Title";
import { fetchFromAPI, insertIntoAPI, updateIntoAPI, deleteIntoAPI } from "./helpers/axiosHelper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ttHrPerWk = 24 * 7;
function App() {
  const [entryList, setEntryList] = useState([]);
  const [ttlHr, setTtlHr] = useState(0);

  useEffect(() => {
    fetchFromAPI(setEntryList, setTtlHr);
  }, []);

  const switchTask = (id, type) => {
    updateIntoAPI(id, type, setEntryList, setTtlHr);
  };

  const handOnDelete = (id) => {
    deleteIntoAPI(id, setEntryList, setTtlHr);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <Title />
        <Form setEntryList={setEntryList} setTtlHr={setTtlHr} />
        <Table entryList={entryList} switchTask={switchTask} handOnDelete={handOnDelete} />

        <div className="alert alert-info">
          Total hrs per week allocated = {ttlHr}
          <span id="totalHr"></span>hr
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
