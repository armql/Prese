import React from 'react';
import Navbar from '../Universal/views/Navbar';
import { Navigate, Outlet } from 'react-router-dom';
// import { useStateContext } from '../../contexts/ContextProvider';

export default function ManagerLayout() {
  // const { currentUser, userToken } = useStateContext();

  // if (!currentUser || !userToken) {
  //   return <Navigate to="/login" />;
  // }

  // console.log(currentUser.user_role);

  // switch (currentUser?.user_role) {
  //   case 'customer':
  //     return <Navigate to="/app" />;
  //   case 'employee':
  //     return <Navigate to="/workspace" />;
  //   case 'driver':
  //     return <Navigate to="/workdrive" />;
  //   default:
      return (
        <div className="relative">
          <div
            className="absolute inset-0 z-0 overflow-hidden blur-10xl"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(to bottom right, #d66931, #dc3545)',
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
          <div className="relative z-10">
            <Navbar />
            <Outlet />
          </div>
        </div>
      );
  }
// }
