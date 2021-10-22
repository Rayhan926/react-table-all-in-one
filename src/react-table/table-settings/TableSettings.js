import { useContext, useEffect, useState } from "react";
import { reactTableContext } from "../Table";
import Collapsible from "./Collapsible";

function TableSettings() {
  const { allColumns, setHiddenColumns } = useContext(reactTableContext);
  const [open, setOpen] = useState(true);
  /**
   *
   */
  const openOverlyHandler = () => {
    setOpen(true);
  };
  const closeOverlyHandler = () => {
    setOpen(false);
  };
  const closeOnOutsideClick = (e) => {
    if (e.target.id === "_s_overly_wrapper") closeOverlyHandler();
  };
  const checkBoxOnChangeHandler = (e) => {
    e.target.checked && setHiddenColumns(e.target.value);
  };

  useEffect(() => {
    document.addEventListener("click", closeOnOutsideClick);
    return () => {
      document.removeEventListener("click", closeOnOutsideClick);
    };
  }, []);
  return (
    <>
      <button type="button" onClick={openOverlyHandler}>
        ☀
      </button>
      <div
        className={`_s_overly_wrapper ${open ? "_s_open_overly" : ""}`}
        id="_s_overly_wrapper"
      >
        <div className="_s_overly_content_wrapper">
          {/* Overly Header ----Start---- */}
          <div className="_s_overly_header">
            <h3>React Table</h3>
            <button type="button" onClick={closeOverlyHandler}>
              X
            </button>
          </div>
          {/* Overly Header ----End---- */}

          {/* Overly Body ----End---- */}
          <div className="_s_overly_body">
            <Collapsible header="Hide column">
              {allColumns?.map((column, i) => (
                <div key={i}>
                  <label>
                    <input {...column.getToggleHiddenProps()} type="checkbox" />
                    {column.Header}
                  </label>
                </div>
              ))}
            </Collapsible>
          </div>
          {/* Overly Body ----End---- */}
        </div>
      </div>
    </>
  );
}

export default TableSettings;
