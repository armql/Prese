import React, { useState, useEffect } from 'react';
import StatisticsSummary from '../components/StatisticsSummary';
import StatisticsCharts from '../components/StatisticsCharts';
import QuickAdd from '../components/QuickAdd';
// import { Navigate } from 'react-router-dom';
// import { useStateContext } from '../../../contexts/ContextProvider';

function Dashboard() {

    return (
        <div className='bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 py-20 px-16'>
            <StatisticsSummary />
            <StatisticsCharts />
            <QuickAdd />
        </div>
    );

}
export default Dashboard;


// const { currentUser } = useStateContext();
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         // Check if the user's role has been loaded
//         if (currentUser.user_role === 'manager') {
//             setIsLoading(false);
//         }
//     }, [currentUser.role]);

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (currentUser.user_role === 'manager') {

//     } else {
//         return <Navigate to='../../home' />;
//     }
// }