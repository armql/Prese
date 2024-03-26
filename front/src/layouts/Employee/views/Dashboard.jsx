import React from 'react';
import { useStateContext } from '../../../contexts/ContextProvider';
import { Chart } from 'chart.js';
import Charts from '../components/Charts';

export default function EmployeeDashboard() {
    const { currentUser } = useStateContext();

    return (
        <div className="bg-white backdrop-blur-lg bg-opacity-60">
            <title>Prese | Dashboard</title>
            <div className='bg-red-100 text-gray-900 font-semibold text-xl shadow-sm p-4'>
                Current Employee - <span className=''>{currentUser.name}</span>
            </div>
        </div>
    );
}

