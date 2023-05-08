import React from 'react';
import StatisticsSummary from '../components/StatisticsSummary';
import StatisticsCharts from '../components/StatisticsCharts';
import QuickAdd from '../components/QuickAdd';
function Dashboard() {
    return (
        <div className='bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 py-4 px-6'>
            <StatisticsSummary />
            <StatisticsCharts />
            <QuickAdd />
        </div>
    );
}

export default Dashboard;
