import { Navigate, createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";

import GuestLayout from "../layouts/Guest/GuestLayout";
import EmployeeLayout from "../layouts/Employee/EmployeeLayout";
import CustomerLayout from "../layouts/Customer/CustomerLayout";
import ManagerLayout from "../layouts/Manager/ManagerLayout";
import DriverLayout from "../layouts/Driver/DriverLayout";

import { ManageOrder, EmployeeDashboard } from "./imports/employee/employee";
import { Login, Signup, GuestHome } from "./imports/guest/guest";
import {
  CustomerHome,
  OrderHistory,
  Checkout,
  Profile,
  Order,
} from "./imports/customer/customer";
import {
  Dashboard,
  CategoryList,
  CategoryRegister,
  CategoryEdit,
  ProductList,
  ProductRegister,
  ProductEdit,
  OrderList,
  OrderRegister,
  ManagerPage,
  UserList,
  UserEdit,
  UserCreate,
} from "./imports/manager/manager";
import {
  DriverDashboard,
  NotFound,
  AboutUs,
  LazyLoading,
} from "./imports/global/global";
import NdertesaList from "../layouts/Manager/views/NdertesaList";
import NdertesaRegister from "../layouts/Manager/components/NdertesaRegister";
import NdertesaEdit from "../layouts/Manager/components/NdertesaEdit";
import AshensoriList from "../layouts/Manager/views/AshensoriList";
import AshensoriRegister from "../layouts/Manager/components/AshensoriRegister";
import AshensorEdit from "../layouts/Manager/components/AshensoriEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="home" />,
      },
      {
        path: "home",
        element: <GuestHome />,
      },
      {
        path: "aboutus",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <Signup />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/app",
    element: <CustomerLayout />,
    children: [
      {
        path: "/app",
        element: <Navigate to="home" />,
      },
      {
        path: "home",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <CustomerHome />
          </Suspense>
        ),
      },
      {
        path: "aboutus",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "order",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <Order />
          </Suspense>
        ),
      },
      {
        path: "orderhistory/:page",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <OrderHistory />
          </Suspense>
        ),
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <Checkout />
          </Suspense>
        ),
      },
      {
        path: "checkout/editprofile",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/workspace",
    element: <EmployeeLayout />,
    children: [
      {
        path: "/workspace",
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <EmployeeDashboard />
          </Suspense>
        ),
      },
      {
        path: "aboutus",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "manageorders/:page",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <ManageOrder />
          </Suspense>
        ),
      },
      {
        path: "manageorders/orders/:id/items",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <ManageOrder />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/workdrive",
    element: <DriverLayout />,
    children: [
      {
        path: "/workdrive",
        element: <Navigate to="dashboard/orders" />,
      },
      {
        path: "dashboard/:page",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <DriverDashboard />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/management",
    element: <ManagerLayout />,
    children: [
      {
        path: "/management",
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "categorylist",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <CategoryList />
          </Suspense>
        ),
      },
      {
        path: "categoryregister",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <CategoryRegister />
          </Suspense>
        ),
      },
      {
        path: "categorylist/categoryedit/:id",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <CategoryEdit />
          </Suspense>
        ),
      },
      {
        path: "productlist",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <ProductList />
          </Suspense>
        ),
      },
      {
        path: "productregister",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <ProductRegister />
          </Suspense>
        ),
      },
      {
        path: "productlist/productedit/:id",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <ProductEdit />
          </Suspense>
        ),
      },
      {
        path: "orderlist",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <OrderList />
          </Suspense>
        ),
      },
      {
        path: "managerPage",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <ManagerPage />
          </Suspense>
        ),
      },
      {
        path: "orderregister",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <OrderRegister />
          </Suspense>
        ),
      },
      {
        path: "userlist",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <UserList />
          </Suspense>
        ),
      },
      {
        path: "userlist/useredit/:id",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <UserEdit />
          </Suspense>
        ),
      },
      {
        path: "userregister",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <UserCreate />
          </Suspense>
        ),
      },

      {
        path: "ndertesalist",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <NdertesaList />
          </Suspense>
        ),
      },
      {
        path: "ndertesaregister",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <NdertesaRegister />
          </Suspense>
        ),
      },
      {
        path: "ndertesalist/ndertesaedit/:id",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <NdertesaEdit />
          </Suspense>
        ),
      },
      {
        path: "ashensorilist",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <AshensoriList />
          </Suspense>
        ),
      },
      {
        path: "ashensoriregister",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <AshensoriRegister />
          </Suspense>
        ),
      },
      {
        path: "ashensorilist/ashensoriedit/:id",
        element: (
          <Suspense fallback={<LazyLoading />}>
            <AshensorEdit />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
