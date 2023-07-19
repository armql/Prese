import React, { useEffect, useState } from 'react'
import Navbar from '../Universal/views/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Universal/views/Footer'

export default function EmployeeLayout() {
  // ? More protected routes if needed
  //   const { setCurrentUser } = useStateContext();
  // const [validatingUser, setValidatingUser] = useState(true);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setValidatingUser(false);
  //   }, 5000);

  //   axiosClient
  //     .get('/me')
  //     .then(({ data }) => {
  //       clearTimeout(timer);
  //       setValidatingUser(false);
  //       setCurrentUser(data);
  //       if (data.role !== 'employee') {
  //         navigate('../');
  //       }
  //     })
  //     .catch(() => {
  //       clearTimeout(timer);
  //       setValidatingUser(false);
  //     });

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [navigate, setCurrentUser]);

  // if (validatingUser) {
  //   return <MOValidationSkeleton />;
  // }
    return (
        <div className="relative">
            <div
                className="absolute inset-0 z-0 overflow-hidden blur-10xl"
                aria-hidden="true"
                style={{
                    background: 'linear-gradient(to bottom right, #d66931, #dc3545)',
                    clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
            />
            <div className="relative z-10">
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </div>
    )
}
