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
import Dashboard from "./layouts/Manager/views/Dashboard";
import CategoryList from "./layouts/Manager/views/CategoryList";
import CategoryRegister from "./layouts/Manager/components/CategoryRegister";
import CategoryEdit from "./layouts/Manager/components/CategoryEdit";
import ProductList from "./layouts/Manager/views/ProductList";
import ProductRegister from "./layouts/Manager/components/ProductRegister";
import { useStateContext } from "./contexts/ContextProvider";

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
        path: '/app',
        element: <CustomerLayout />,
        children: [
            {
                path: '/app',
                element: <Navigate to="home" />
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'aboutus',
                element: <AboutUs />
            }
        ]
    }, {
        path: '/workspace',
        element: <EmployeeLayout />,
        children: [
            {
                path: '/workspace',
                element: <Navigate to="home" />
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'aboutus',
                element: <AboutUs />
            }
        ]
    },
    {
        path: '/workdrive',
        element: <DriverLayout />,
        children: [
            {
                path: '/workdrive',
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
        ]
    },
    {
        path: '/management',
        element: <ManagerLayout />,
        children: [
            {
                path: '/management',
                element: <Navigate to="dashboard" />
            },
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'categorylist',
                element: <CategoryList />
            },
            {
                path: 'categoryregister',
                element: <CategoryRegister />
            },
            {
                path: 'categorylist/categoryedit/:id/categoryedit',
                element: <CategoryEdit />
            },
            {
                path: 'productlist',
                element: <ProductList />
            },
            {
                path: 'productregister',
                element: <ProductRegister />
            }
            // {
            //     path: 'productlist/:id/productedit',
            //     element: <ProductEdit/>
            // },
        ]
    }
])

export default router