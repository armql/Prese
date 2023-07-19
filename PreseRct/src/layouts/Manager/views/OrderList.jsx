import React, { useEffect, useState } from 'react';
import OrderTable from '../components/OrderTable';
import axiosClient from '../../../api/axios';
import { useStateContext } from '../../../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import MOValidation_skeleton from '../../Employee/views/core/MOValidation_skeleton';

export default function OrderList() {
    const { setCurrentUser, userToken } = useStateContext();
    const [validatingUser, setValidatingUser] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userToken) {
            navigate('../../');
            return;
        }

        axiosClient
            .get('/me')
            .then(({ data }) => {
                setCurrentUser(data);
                if (data.role === 'employee') {
                    navigate('../../workspace')
                }else if (data.role === 'customer') {
                    navigate('../../app')
                }else if (data.role === 'driver') {
                    navigate('../../workdrive')
                }
                setValidatingUser(false);
            })
            .catch(() => {
                setValidatingUser(false);
            });
    }, [navigate, setCurrentUser]);

    if (validatingUser) {
        return <MOValidation_skeleton />;
    }

   
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <title>GFC | Manage Order</title>
            <OrderTable />
        </div>
    )
}
