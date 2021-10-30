import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import ErrorIndicator from './ErrorIndicator';
import LoadingIndicator from './LoadingIndicator';
import Pagination from './Pagination';
import './table.scss';
import TableHeader from './TableHeader';
import TableTopBar from './TableTopBar';

export const reactTableContext = React.createContext();

function Table({
    columns = [],
    url,
    rowsPerPageOptions = [5, 10, 20, 50],
    rowsPerPageDefaultValue = 10,
    pageString = 'page',
    limitString = 'limit',
    queryString = 'q',
    tableId = 'react_table',
    select,
    selectErrorMessage
}) {
    if (!url) throw new Error('url property is required to fetch the data');

    const setBlankInitialStates = () => {
        const defaultBlankStates = {
            initialHiddenColumns: [],
        };
        localStorage.setItem(tableId, JSON.stringify(defaultBlankStates));
        return localStorage.getItem(tableId);
    };

    const initialStatesInJSON = localStorage.getItem(tableId) || setBlankInitialStates();
    const { initialHiddenColumns } = JSON.parse(initialStatesInJSON);

    const rowsPerPageHandler = (e) => {
        const value = e.target.value;
        const checkPageLimit = Math.ceil(parseInt(totalDataCount) / parseInt(value));
        if (checkPageLimit < page) {
            onPageChangeHandler(checkPageLimit);
        }
        setRowsPerPage(value);
        setSearchParams((prevState) => {
            return { ...prevState, [limitString]: value };
        });
    };

    const onPageChangeHandler = (currentPage) => {
        if (currentPage === page) return;
        setPage(currentPage);
        setSearchParams((prevState) => {
            return { ...prevState, [pageString]: currentPage };
        });
    };

    // Rows per page default value
    const _rowsPerPageDefaultValue = useMemo(() => {
        return rowsPerPageOptions?.includes(rowsPerPageDefaultValue)
            ? rowsPerPageDefaultValue
            : rowsPerPageOptions[0];
    }, [rowsPerPageDefaultValue, rowsPerPageOptions]);

    const [loading, setLoading] = useState(url ? true : false); // Loading table data state
    const [errorLoadingData, setErrorLoadingData] = useState(false); // Error loading table data state
    const [rowsPerPage, setRowsPerPage] = useState(_rowsPerPageDefaultValue); // Rows per page state
    const [tableData, setTableData] = useState([]); // Table data state
    const [totalDataCount, setTotalDataCount] = useState(null); // Table data state
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useState({
        [limitString]: rowsPerPage,
        [pageString]: page,
    });

    const tableColumns = useMemo(() => columns, [columns]); // Table columns state

    // const tableData = useMemo(() => data, [data]);

    // Data Fetcher Function ----Start----
    const dataFetcher = () => {
        const finalUrl = new URL(url);

        // searchParams.forEach((searchParam, index) => {
        //     if (searchParam[1]) {
        //         finalUrl.searchParams.append(searchParam[0], searchParam[1]);
        //     }
        // });

        Object.keys(searchParams).forEach((key) => {
            if (searchParams[key]) {
                finalUrl.searchParams.append(key, searchParams[key]);
            }
        });

        setLoading(true);
        setErrorLoadingData(false);
        fetch(finalUrl, {
            method: 'get',
        })
            .then((res) => {
                if (!res.ok) {
                    return res.text().then(text => { throw new Error(text) })
                }
                else {
                    return res.json();
                }
            })
            .then((res) => {

                const { data, totalData } = select(res);
                setTotalDataCount(totalData);
                setTableData(data);

            })
            .catch((err) => {
                setTableData([])
                setErrorLoadingData(
                    (typeof selectErrorMessage === 'function' &&
                        selectErrorMessage(err.message).toString()) ||
                    'Something went wrong')
            })
            .finally(() => setLoading(false));
    };
    // Data Fetcher Function ----End----

    // Calling the fetcher function to load api data
    useEffect(() => {
        dataFetcher();
    }, [url, searchParams]);

    // useEffect(() => {
    //     const pageCount = Math.ceil(totalDataCount / rowsPerPage);
    //     if (page > pageCount) {
    //         setPage(pageCount);
    //     }
    // }, [totalDataCount, rowsPerPage, page]);

    const tableInstance = useTable({
        data: tableData,
        columns: tableColumns,
        initialState: {
            hiddenColumns: initialHiddenColumns,
        },
    }); // tableInstance from userTable hook

    // Distructuring table tableInstance Object
    const {
        getTableProps,
        getTableBodyProps,
        prepareRow,
        headerGroups,
        rows,
        allColumns,
        state,
        setHiddenColumns,
    } = tableInstance;

    const { hiddenColumns } = state;

    useEffect(() => {
        localStorage.setItem(
            tableId,
            JSON.stringify({
                initialHiddenColumns: hiddenColumns,
            })
        );
    }, [hiddenColumns, tableId]);
    return (
        <div className='_s_react_table_wrapper'>
            {/* Table Top Search Bar and Setting ----Start---- */}
            <reactTableContext.Provider
                value={{
                    searchParams,
                    queryString,
                    pageString,
                    allColumns,
                    setSearchParams,
                    setHiddenColumns,
                    setPage,
                }}
            >
                <TableTopBar />
            </reactTableContext.Provider>
            {/* Table Top Search Bar and Setting ----End---- */}

            {/* Table ----Start---- */}
            <table {...getTableProps()} className='_s_react_table'>
                {/* Table Header ----Start---- */}
                <TableHeader headerGroups={headerGroups} />
                {/* Table Header ----End---- */}

                {/* Table Body ----Start---- */}
                <tbody {...getTableBodyProps()}>
                    {/* {(errorLoadingData || loading) && ( */}
                    <tr className="_s_table_indicator_tr" >
                        <td colSpan="100%">
                            {loading && <LoadingIndicator data={tableData} />}
                            {errorLoadingData && <ErrorIndicator error={errorLoadingData} retryFunc={dataFetcher} />}

                        </td>
                    </tr>
                    {/* )} */}
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
                {/* Table Body ----End---- */}
            </table>
            {/* Table ----End---- */}

            {/* Table Pagination and rows per page section ----Start---- */}
            <div className='_s_pagination_and_rows_per_page_wrapper'>
                {/* Pagination ----Start---- */}
                {totalDataCount > 0 && (
                    <Pagination
                        count={Math.ceil(totalDataCount / rowsPerPage)}
                        // count={12}
                        page={page}
                        onChange={onPageChangeHandler}
                        boundaryCount={2}
                    />
                )}
                {/* Pagination ----End---- */}

                {/* Rows per page ----Start---- */}
                <label className="_s_rows_per_page_select_wrapper">
                    <select defaultValue={rowsPerPage} onChange={rowsPerPageHandler} className="_s_rows_per_page_select">
                        {rowsPerPageOptions.map((option, index) => (
                            <option value={option} key={index}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <div className="_s_select_arrow_wrapper">
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </label>
                {/* Rows per page ----End---- */}
            </div>
            {/* Table Pagination and rows per page section ----End---- */}
        </div>
    );
}

export default Table;