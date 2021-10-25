import Table from './react-table/Table';

const columns = [
    {
        Header: 'Order id',
        accessor: 'id',
    },
    {
        Header: 'User id',
        accessor: 'user_id',
    },
    // {
    //     Header: 'Ingame id',
    //     accessor: 'ingameid',
    // },
    {
        Header: 'Player id',
        accessor: 'playerid',
    },
    {
        Header: 'Password',
        accessor: 'ingamepassword',
    },
    {
        Header: 'Package name',
        accessor: 'name',
    },
    {
        Header: 'Price',
        accessor: 'amount',
    },
    {
        Header: 'Account type',
        accessor: 'accounttype',
    },
    {
        Header: 'Security code',
        accessor: 'securitycode',
    },
    // {
    //     Header: 'product_id',
    //     accessor: 'product_id',
    // },
    {
        Header: 'phone',
        accessor: 'phone',
    },
    {
        Header: 'status',
        accessor: 'status',
    },
    {
        Header: 'Completed by',
        accessor: 'completed_by',
    },
    {
        Header: 'Created at',
        accessor: 'created_at',
    },

    // {
    //     Header: 'payment_mathod',
    //     accessor: 'payment_mathod',
    // },
    // {
    //     Header: 'payment_status',
    //     accessor: 'payment_status',
    // },
    // {
    //     Header: 'payment_data',
    //     accessor: 'payment_data',
    // },
    // {
    //     Header: 'brief_note',
    //     accessor: 'brief_note',
    // },
    // {
    //     Header: 'topuppackage_id',
    //     accessor: 'topuppackage_id',
    // },
    // {
    //     Header: 'bprice',
    //     accessor: 'bprice',
    // },
];

function App() {
    return (
        <Table
            url='http://localhost:3005/api/admin/orders'
            columns={columns}
            select={(res) => {
                return {
                    data: res.data.orders,
                    totalData: res.data.order_count,
                };
            }}
            selectErrorMessage={(err) => JSON.parse(err).message}
        />
    );
}

export default App;
