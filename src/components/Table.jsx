import React, { useState } from "react";

export const Table = ({ entryList, switchTask, handOnDelete }) => {
  // console.log(entryList);
  const entries = entryList?.filter((item) => item.type === "entry");
  const badList = entryList?.filter((item) => item.type === "bad");
  const [idsToDelete, setIdstoDelete] = useState([]);

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;
    // console.log(checked, value);
    checked === true
      ? setIdstoDelete([...idsToDelete, value])
      : setIdstoDelete(idsToDelete.filter((_id) => _id !== value));

  };

  const handleOnSelectAll = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);
    const ids =
      value === "entry" ? entries.map((item) => item._id) : badList.map((item) => item._id);

    checked === true
      ? setIdstoDelete([...idsToDelete, ...ids])
      : setIdstoDelete(idsToDelete.filter((id) => !ids.includes(id)));
  };

  const handleOnDeleteClick = () => {
    handOnDelete(idsToDelete);
    setIdstoDelete([]);
  };

  // if (checked) {
  //   setIdstoDelete([...idsToDelete, ...ids]);
  // } else {
  //   const tempArg = idsToDelete.filter((id) => !ids.includes(id));
  //   setIdstoDelete(tempArg);
  // }

  /*
    if (checked) {
      addAllOnArray(value);
    } else {
      // removeAllOnArray(type);
    }
    */

  // const addAllOnArray = (type) => {
  //   let tempArg = [];
  //   if (type === "entry") {
  //     entryList
  //       ?.filter((item) => item.type === type)
  //       .map((item) => {
  //         return item._id;
  //       })
  //       .map((item) => {
  //         if (!idsToDelete.includes(item._id)) {
  //           tempArg.push(item._id);
  //         }
  //       });
  //   } else {
  //     badList
  //       ?.filter((item) => item.type === type)
  //       .map((item) => {
  //         return item._id;
  //       })
  //       .map((item) => {
  //         if (!idsToDelete.includes(item._id)) {
  //           tempArg.push(item._id);
  //         }
  //       });
  //   }
  //   console.log(tempArg);
  //   setIdstoDelete([...idsToDelete, tempArg]);
  // };

  // const removeAllOnArray = (type) => {
  //   // setIdstoDelete(idsToDelete.filter((_id) => _id !== value));
  //   // setIdstoDelete(
  //   //   entryList
  //   //     ?.filter((item) => item.type === type)
  //   //     .map((item) => {
  //   //       return item._id;
  //   //     })
  //   // );
  // };

  return (
    <>
      <div className="row mt-5 pt-2">
        {/* <!-- 1. entry list --> */}
        <div className="col-md">
          <h3 className="text-center">Task Entry List</h3>
          <hr />
          <div>
            <input
              type="checkbox"
              className="form-check-input mr-5"
              id="selectEntryList"
              onChange={handleOnSelectAll}
              value={"entry"}
            />
            <label htmlFor="selectEntryList" className="ml-5">
              Select all Entry List
            </label>
          </div>
          <table className="table table-striped table-hover border opacity">
            <tbody id="entry">
              {entries.map((item, i) => (
                <tr key={i}>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={handleOnSelect}
                      value={item._id}
                      checked={idsToDelete.includes(item._id)}
                    />
                  </td>
                  <td>{i + 1}</td>
                  <td>{item.task}</td>
                  <td>{item.hr}hrs</td>
                  <td className="text-end">
                    {/* <button onClick={() => handOnDelete(item._id)} className="btn btn-danger btn-sm">
                    <i className="fa-solid fa-trash"></i>
                  </button> */}
                    <button
                      onClick={() => switchTask(item._id, "bad")}
                      className="btn btn-success btn-sm"
                    >
                      <i className="fa-sharp fa-solid fa-arrow-right-long"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md">
          <h3 className="text-center">Bad List</h3>
          <hr />
          <div>
            <input
              type="checkbox"
              className="form-check-input"
              id="selectBadList"
              onChange={handleOnSelectAll}
              value={"bad"}
            />
            <label htmlFor="selectBadList" className="ml-5">
              Select all Entry List
            </label>
          </div>
          <table className="table table-striped table-hover border opacity">
            <tbody id="bad">
              {badList.map((item, i) => (
                <tr key={i}>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={handleOnSelect}
                      value={item._id}
                      checked={idsToDelete.includes(item._id)}
                    />
                  </td>
                  <td>{i + 1}</td>
                  <td>{item.task}</td>
                  <td>{item.hr}hrs</td>
                  <td className="text-end">
                    <button
                      onClick={() => switchTask(item._id, "entry")}
                      className="btn btn-warning btn-sm"
                    >
                      <i className="fa-sharp fa-solid fa-arrow-left-long"></i>
                    </button>
                    {/* <button onClick={() => handOnDelete(item._id)} className="btn btn-danger btn-sm">
                    <i className="fa-solid fa-trash"></i>
                  </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="alert alert-info">
            You could have save ={" "}
            <span id="badHr">{badList.reduce((acc, item) => acc + item.hr, 0)}</span>hr
          </div>
        </div>
      </div>
      {idsToDelete.length > 0 && (
        <div className="d-grid mb-3">
          <button className="btn btn-danger btn-lg" onClick={handleOnDeleteClick}>
            {"   "}
            <i className="fa-solid fa-trash"></i>Delete {idsToDelete.length} tasks
          </button>
        </div>
      )}
    </>
  );
};
