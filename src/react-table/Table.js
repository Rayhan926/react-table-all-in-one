import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import Pagination from "./Pagination";
import "./table.scss";
import TableHeader from "./TableHeader";
import TableTopBar from "./TableTopBar";

export const reactTableContext = React.createContext();

function Table({
  columns = [],
  url,
  asyncDataObject,
  asyncPageCountObject,
  rowsPerPageOptions = [5, 10, 20, 50],
  rowsPerPageDefaultValue = 10,
  pageString = "page",
  limitString = "limit",
  queryString = "q",
}) {
  if (!url) throw new Error("url property is required to fetch the data");

  const rowsPerPageHandler = (e) => {
    const value = e.target.value;
    setRowsPerPage(value);
    setSearchParams((prevState) => {
      return [
        ...prevState.filter((e) => e[0] !== limitString),
        [limitString, value],
      ];
    });
  };

  const onPageChangeHandler = (page) => {
    setPage(page);
    setSearchParams((prevState) => {
      return [
        ...prevState.filter((e) => e[0] !== pageString),
        [pageString, page],
      ];
    });
  };

  // Rows per page default value
  const _rowsPerPageDefaultValue = useMemo(() => {
    return rowsPerPageOptions.includes(rowsPerPageDefaultValue)
      ? rowsPerPageDefaultValue
      : rowsPerPageOptions[0];
  }, [rowsPerPageDefaultValue, rowsPerPageOptions]);

  const [loading, setLoading] = useState(url ? true : false); // Loading table data state
  const [rowsPerPage, setRowsPerPage] = useState(_rowsPerPageDefaultValue); // Rows per page state
  const [tableData, setTableData] = useState([]); // Table data state
  const [totalDataCount, setTotalDataCount] = useState(null); // Table data state
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState([
    [limitString, rowsPerPage],
    [pageString, page],
  ]);

  const tableColumns = useMemo(() => columns, [columns]); // Table columns state

  // const tableData = useMemo(() => data, [data]);

  // Data Fetcher Function ----Start----
  const dataFetcher = () => {
    const finalUrl = new URL(url);

    searchParams.forEach((searchParam, index) => {
      if (searchParam[1]) {
        finalUrl.searchParams.append(searchParam[0], searchParam[1]);
      }
    });

    setLoading(true);
    fetch(finalUrl, {
      method: "get",
    })
      .then((res) => res.json())
      .then((res) => {
        setTotalDataCount(
          asyncPageCountObject ? res.data[asyncPageCountObject] : 50
        );
        setTableData(asyncDataObject ? res.data[asyncDataObject] : res.data);
      })
      .catch((err) => {
        // setTableData([])
        console.log(err?.data);
      })
      .finally(() => setLoading(false));
  };
  // Data Fetcher Function ----End----

  // Calling the fetcher function to load api data
  useEffect(() => {
    dataFetcher();
  }, [url, searchParams]);

  const tableInstance = useTable({ data: tableData, columns: tableColumns }); // tableInstance from userTable hook

  // Distructuring table tableInstance Object
  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    tableInstance;

  return (
    <>
      {/* Table Top Search Bar and Setting ----Start---- */}
      <reactTableContext.Provider
        value={{
          setSearchParams,
          queryString,
        }}
      >
        <TableTopBar />
      </reactTableContext.Provider>
      {/* Table Top Search Bar and Setting ----End---- */}

      {/* Table ----Start---- */}
      <table {...getTableProps()} className="_s_react_table">
        {/* Table Header ----Start---- */}
        <TableHeader headerGroups={headerGroups} />
        {/* Table Header ----End---- */}

        {/* Table Body ----Start---- */}
        <tbody {...getTableBodyProps()}>
          {loading && (
            <tr>
              <td>
                <h1>Loading...</h1>
              </td>
            </tr>
          )}
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {/* Table Body ----End---- */}
      </table>
      {/* Table ----End---- */}

      {/* Table Pagination and rows per page section ----Start---- */}
      <div className="_s_pagination_and_rows_per_page_wrapper">
        {/* Pagination ----Start---- */}
        {tableData.length && (
          <Pagination
            count={Math.ceil(totalDataCount / rowsPerPage)}
            page={page}
            onChange={onPageChangeHandler}
            boundaryCount={5}
          />
        )}
        {/* Pagination ----End---- */}

        {/* Rows per page ----Start---- */}
        <div>
          <select defaultValue={rowsPerPage} onChange={rowsPerPageHandler}>
            {rowsPerPageOptions.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {/* Rows per page ----End---- */}
      </div>
      {/* Table Pagination and rows per page section ----End---- */}
    </>
  );
}

export default Table;
