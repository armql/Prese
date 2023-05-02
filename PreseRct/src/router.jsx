import {Navigate, createBrowserRouter } from "react-router-dom";
import GuestLayout from "./layouts/Guest/GuestLayout"
import CustomerLayout from "./layouts/Customer/CustomerLayout"
import EmployeeLayout from "./layouts/Employee/EmployeeLayout"
import DriverLayout from "./layouts/Employee/DriverLayout.jsx"
import ManagerLayout from "./layouts/Manager/ManagerLayout"
import Home from "./layouts/Universal/views/Home";
import AboutUs from "./layouts/Universal/views/AboutUs";
import Login from "./layouts/Guest/views/Login";
import Signup from "./layouts/Guest/views/Signup";

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="home" />
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'aboutus',
                element: <AboutUs />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signup',
                element: <Signup />
            }
        ]
    },
    {
        path: '/c',
        element: <CustomerLayout />,
        children: [
            {
                path: '/c',
                element: <Navigate to="home" />
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'aboutus',
                element: <AboutUs />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signup',
                element: <Signup />
            }
        ]
    }, {
        path: '/e',
        element: <EmployeeLayout />,
        children: [
            {
                path: '/e',
                element: <Navigate to="home" />
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'aboutus',
                element: <AboutUs />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signup',
                element: <Signup />
            }
        ]
    },
    {
        path: '/d',
        element: <DriverLayout />,
        children: [
            {
                path: '/d',
                element: <Navigate to="home" />
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'aboutus',
                element: <AboutUs />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signup',
                element: <Signup />
            }
        ]
    },
    {
        path: '/m',
        element: <ManagerLayout />,
        children: [
            {
                path: '/m',
                element: <Navigate to="home" />
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'aboutus',
                element: <AboutUs />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signup',
                element: <Signup />
            }
        ]
    }
])

export default router