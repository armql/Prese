import React from 'react';
import { useStateContext } from '../../../contexts/ContextProvider';
import { Chart } from 'chart.js';
import Charts from '../components/Charts';

export default function EmployeeDashboard() {
    const { currentUser } = useStateContext();

    return (
        <div className="bg-white backdrop-blur-lg bg-opacity-60 h-screen">
            <title>Prese | Dashboard</title>
            <div className='bg-white shadow-sm p-4 text-2xl'>
                CE - {currentUser.name}
            </div>
            <Charts />
        </div>
    );
}

