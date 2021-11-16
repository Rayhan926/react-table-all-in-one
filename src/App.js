import axios from 'axios';
import { useCallback } from 'react';
import Table from './react-table/Table';

// const columns = [
//     {
//         Header: 'Order id',
//         accessor: 'id',
//     },
//     {
//         Header: 'User id',
//         accessor: 'user_id',
//     },
//     // {
//     //     Header: 'Ingame id',
//     //     accessor: 'ingameid',
//     // },
//     {
//         Header: 'Player id',
//         accessor: 'playerid',
//     },
//     {
//         Header: 'Password',
//         accessor: 'ingamepassword',
//     },
//     {
//         Header: 'Package name',
//         accessor: 'name',
//     },
//     {
//         Header: 'Price',
//         accessor: 'amount',
//     },
//     {
//         Header: 'Account type',
//         accessor: 'accounttype',
//     },
//     {
//         Header: 'Security code',
//         accessor: 'securitycode',
//     },
//     // {
//     //     Header: 'product_id',
//     //     accessor: 'product_id',
//     // },
//     {
//         Header: 'Phone',
//         accessor: 'phone',
//     },
//     {
//         Header: 'Status',
//         accessor: 'status',
//     },
//     {
//         Header: 'Completed by',
//         accessor: 'completed_by',
//     },
//     {
//         Header: 'Created at',
//         accessor: 'created_at',
//     },

//     // {
//     //     Header: 'payment_mathod',
//     //     accessor: 'payment_mathod',
//     // },
//     // {
//     //     Header: 'payment_status',
//     //     accessor: 'payment_status',
//     // },
//     // {
//     //     Header: 'payment_data',
//     //     accessor: 'payment_data',
//     // },
//     // {
//     //     Header: 'brief_note',
//     //     accessor: 'brief_note',
//     // },
//     // {
//     //     Header: 'topuppackage_id',
//     //     accessor: 'topuppackage_id',
//     // },
//     // {
//     //     Header: 'bprice',
//     //     accessor: 'bprice',
//     // },
// ];

const todosColumns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'User id',
        accessor: 'userId',
    },
    {
        Header: 'Title',
        accessor: 'title',
    },
    {
        Header: 'Completed',
        accessor: 'completed',
        Cell: (e) => (e ? 'Yes' : 'No'),
    },
];

// const dataFetcher = async (q) => {
//     try {
//         const res = await axios.get(`http://localhost:3005/api/admin/orders?${q}`);
//         return {
//             data: res.data.data.orders,
//             total: res.data.data.order_count,
//         };
//     } catch (err) {
//         return err?.response?.data?.message;
//     }
// };

function App() {
    const fetchTodos = useCallback(async (q, d) => {
        try {
            console.log(d);
            const res = await axios.get(
                `https://jsonplaceholder.typicode.com/todos?_start=${
                    (d.page - 1) * d.limit
                }&_limit=${d.limit}`
            );
            const result = res.data;

            return {
                data: result,
                // total: 200,
            };
        } catch (error) {
            return error?.response?.data?.message;
        }
    }, []);

    return (
        <>
            {/* <Table
                tableId='users_table'
                tableTitle='Users'
                columns={columns}
                fetch={dataFetcher}
                // url='http://localhost:3005/api/admin/orders'
                // selectData={(res) => {
                //     return {
                //         data: res.data.data.orders,
                //         total: res.data.data.order_count,
                //     };
                // }}
                // selectError={() => 'Saymon'}
            /> */}
            <div
                style={{
                    width: '90%',
                    margin: '50px auto',
                }}
            >
                <Table
                    tableId='todos_table'
                    tableTitle='Todos Table'
                    columns={todosColumns}
                    fetch={fetchTodos}
                    globalSearchPlaceholder='Search todos'
                />
            </div>
        </>
    );
}

export default App;
