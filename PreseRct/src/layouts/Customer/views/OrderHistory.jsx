import React from 'react';
import OrderHistoryTable from '../components/OrderHistoryTable';

export default function OrderHistory() {


    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <title>GFC | Order History</title>
            <OrderHistoryTable />
        </div>
    );
}
