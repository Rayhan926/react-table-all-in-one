import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import Pagination from "./Pagination";
import "./table.scss";
import TableHeader from "./TableHeader";

function Table({
  columns = [],
  url,
  asyncDataObject,
  asyncPageCountObject,
  rowsPerPageOptions = [5, 10, 20, 50],
  rowsPerPageDefaultValue = 10,
  pageString = "page",
  limitString = "limit",
}) {
  if (!url) throw new Error("url property is required to fetch the data");

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
  const tableColumns = useMemo(() => columns, [columns]); // Table columns state

  // const tableData = useMemo(() => data, [data]);

  // Data Fetcher Function ----Start----
  const dataFetcher = () => {
    const finalUrl = new URL(url);
    finalUrl.searchParams.append(pageString, page);
    finalUrl.searchParams.append(limitString, rowsPerPage);
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
  }, [url, rowsPerPage, page]);

  const tableInstance = useTable({ data: tableData, columns: tableColumns }); // tableInstance from userTable hook

  // Distructuring table tableInstance Object
  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    tableInstance;

  return (
    <>
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
            onChange={setPage}
            boundaryCount={5}
          />
        )}
        {/* Pagination ----End---- */}

        {/* Rows per page ----Start---- */}
        <div>
          <select
            defaultValue={rowsPerPage}
            onChange={(e) => setRowsPerPage(e.target.value)}
          >
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
