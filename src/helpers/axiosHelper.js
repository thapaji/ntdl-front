import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = const apiUrl = import.meta.env.API_URL + "/api/v1/tasks";

/***********     Read Data    ************/
export const fetchFromAPI = async (setEntryList, setTtlHr) => {
  const response = await axios.get(apiUrl);
  setEntryList(response.data.data);
  setTtlHr(response.data.data.reduce((acc, item) => {
    return acc + item.hr;
  }, 0));
};

/***********     Create Data    ************/
export const insertIntoAPI = async (taskObj, setEntryList, setTtlHr) => {
  try {
    const response = await axios.post(apiUrl, taskObj);
    console.log(response);

    fetchFromAPI(setEntryList, setTtlHr)
    toast.success("Task Added Successfully");
  } catch (error) {
    console.log(error);
  }
};

/***********     Update Data    ************/
export const updateIntoAPI = async (id, type, setEntryList, setTtlHr) => {
  const response = await axios.patch(apiUrl, { id, type });
  fetchFromAPI(setEntryList, setTtlHr);
  toast.warning("Task Switched Successfully");
};

/***********     Delete Data    ************/
export const deleteIntoAPI = async (id, setEntryList, setTtlHr) => {
  const response = await axios.delete(apiUrl, { data: { id } });
  fetchFromAPI(setEntryList, setTtlHr);
  toast.error("Task Deleted Successfully");
};

/***********     Delete Bulk Data    ************/
export const deleteBulkIntoAPI = async (ids, setEntryList, setTtlHr) => {
  const response = await axios.delete(apiUrl, { data: { ids } });
  fetchFromAPI(setEntryList, setTtlHr);
  toast.error("Task Deleted Successfully");
};