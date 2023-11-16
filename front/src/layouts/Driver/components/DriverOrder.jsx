import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../../contexts/ContextProvider';
import axiosClient from '../../../api/axios';
import Swal from 'sweetalert2';
import MOTableSkeleton from './core/MOTable_skeleton';
import MOLoadingModal from './core/MOLoadingModal_skeleton';
import Pagination from './core/MOTable_pagination';

export default function DriverOrder() {
    const { currentUser } = useStateContext();

    const [modalVisible, setModalVisible] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [reloadTable, setReloadTable] = useState(false);

    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedOrderItems, setSelectedOrderItems] = useState([]);

    const [selectedStatus, setSelectedStatus] = useState('delivered');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = urlParams.get('page');
        const page = parseInt(pageParam) || 1;
        setCurrentPage(page);

        axiosClient.get(`/driverorders?page=${page}&perPage=10&driver_id=${currentUser.id}`)
            .then(response => {
                setOrders(response.data.orders);
                setLoading(false);

                const totalOrders = response.data.total;
                const totalPages = Math.ceil(totalOrders / ordersPerPage);
                setTotalPages(totalPages);
            })
            .catch(error => {
                console.error('Failed to fetch orders', error);
            });
        setReloadTable(false);
    }, [currentUser.id, reloadTable]);


    // ^ FUNCTIONS

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        axiosClient.get(`/driverorders?page=${pageNumber}&perPage=${ordersPerPage}`)
            .then(response => {
                setOrders(response.data.current_page);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch orders', error);
            });
    };

    const openModal = (orderId) => {
        setLoadingModal(true);
        axiosClient.get(`/orders/${orderId}/items`)
            .then(response => {
                setSelectedOrderItems(response.data.order);
                setSelectedOrderId(orderId);
                setLoadingModal(false);
                setModalVisible(true);
            })
            .catch(error => {
                console.error('Failed to fetch order items', error);
            });
    };

    const handleChanges = (orderId) => {
        axiosClient
            .put(`/driverorders/${orderId}`, { status: selectedStatus })
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    text: res.data.message,
                });
                setReloadTable(true);
            })
            .catch((error) => {
                console.error("Failed to update order status", error);
            });
    };


    const closeModal = () => {
        setLoadingModal(false);
        setModalVisible(false);
    };

    const calculateTotal = (items) => {
        let total = 0;
        const productQuantities = {};

        for (let i = 0; i < items.order_items.length; i++) {
            const item = items.order_items[i];
            const productId = item.product_id;
            const quantity = item.quantity;
            if (productQuantities.hasOwnProperty(productId)) {
                productQuantities[productId] += quantity;
            } else {
                productQuantities[productId] = quantity;
            }
            console.log(quantity)

            total += quantity * item.product.retail_price;
        }
        total = total.toFixed(2);

        return total;
    };

    let convertImageURL = (items) => {
        const imageURL = items.replace('../GfcRct', '');
        return imageURL;
    };

    const getStatusTableColor = (status) => {
        switch (status) {
            case 'cancelled':
                return (
                    <div className='flex bg-red-400 h-20' >
                    </div>
                );
            case 'delivering':
                return (
                    <div className='flex bg-green-200 h-20' >
                    </div>
                );
            case 'delivered':
                return (
                    <div className='flex bg-green-500 h-20' >
                    </div>
                );

            default:
                return null;
        }
    };

    // * LOADERS

    if (loadingModal) {
        return (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="grid items-start justify-start">
                    <table className="grid grid-cols-2 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="border-r-2 text-xs border-gray-100 uppercase bg-white">
                            <tr className="grid grid-cols-1 justify-start bg-white">
                                <th scope="col" className="p-4">Driver: {currentUser.name}</th>
                                <th scope="col" className="px-6 py-10">
                                    Order
                                </th>
                                <th scope="col" className="px-6 py-12">
                                    Ordered by
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Contact Number
                                </th>
                                <th scope="col" className="px-6 py-10">
                                    City & Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order.id} className="grid grid-cols-1 bg-white">
                                        <input type="hidden" name="employee_id" value={currentUser.id} />
                                        <td>{getStatusTableColor(order.status)}</td>
                                        <td
                                            scope="row"
                                            className="flex items-center justify-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            <div className="text-center">
                                                <button
                                                    onClick={() => openModal(order.id)}
                                                    className="text-red-500 hover:underline px-5 py-2.5 mr-2 mb-2 focus:outline-none"
                                                    type="button"
                                                    data-drawer-target="drawer-swipe"
                                                    data-drawer-show="drawer-swipe"
                                                    data-drawer-placement="bottom"
                                                    data-drawer-edge="true"
                                                    data-drawer-edge-offset="bottom-[60px]"
                                                    aria-controls="drawer-swipe"
                                                >
                                                    View Order
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-start">
                                            <div className="pl-3">
                                                <div className="text-base text-gray-800 font-semibold">{order.user.name}</div>
                                                <div className="font-normal text-gray-500">{order.user.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-start">
                                            <div className="pl-3">
                                                <div className="text-base text-gray-800 font-semibold">044138813</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="pl-3">
                                                <div className="text-base text-gray-800 font-semibold">{order.user.city}</div>
                                                <div className="font-normal text-gray-500">{order.user.address}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                value={'delivered'}
                                                onClick={() => handleStatusChange(order.id)}
                                                type="submit"
                                                className="font-medium bg-green-100 p-3 rounded-md hover:bg-green-300 text-green-700"
                                            >
                                                Delivered
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-4">
                                        <svg
                                            aria-hidden="true"
                                            className="flex-shrink-0 inline w-5 h-5 mr-3"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        Loading Orders.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <MOLoadingModal />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={paginate}
                />
            </div>
        )
    }

    if (loading) {
        return (
            <MOTableSkeleton />
        )
    }

    // & MAIN
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="grid items-start justify-start">
                <table className="grid grid-cols-2 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="border-r-2 text-xs border-gray-100 uppercase bg-white">
                        <tr className="grid grid-cols-1 justify-start bg-white">
                            <th scope="col" className="ml-2 text-black">Driver: <span className='text-gray-500'>{currentUser.name}</span></th>
                            <th scope="col" className="px-6 py-10">
                                Order
                            </th>
                            <th scope="col" className="px-6 py-12">
                                Ordered by
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Contact Number
                            </th>
                            <th scope="col" className="px-6 py-10">
                                City & Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order.id} className="grid grid-cols-1 bg-white">
                                    <input type="hidden" name="employee_id" value={currentUser.id} />
                                    <td>{getStatusTableColor(order.status)}</td>
                                    <td
                                        scope="row"
                                        className="flex items-center justify-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <div className="text-center">
                                            <button
                                                onClick={() => openModal(order.id)}
                                                className="text-red-500 hover:underline px-5 py-2.5 mr-2 mb-2 focus:outline-none"
                                                type="button"
                                                data-drawer-target="drawer-swipe"
                                                data-drawer-show="drawer-swipe"
                                                data-drawer-placement="bottom"
                                                data-drawer-edge="true"
                                                data-drawer-edge-offset="bottom-[60px]"
                                                aria-controls="drawer-swipe"
                                            >
                                                View Order
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-start">
                                        <div className="pl-3">
                                            <div className="text-base text-gray-800 font-semibold">{order.user.name}</div>
                                            <div className="font-normal text-gray-500">{order.user.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-start">
                                        <div className="pl-3">
                                            <div className="text-base text-gray-800 font-semibold">044138813</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="pl-3">
                                            <div className="text-base text-gray-800 font-semibold">{order.user.city}</div>
                                            <div className="font-normal text-gray-500">{order.user.address}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleChanges(order.id)}
                                            type="submit"
                                            className="font-medium bg-green-100 p-3 rounded-md hover:bg-green-300 text-green-700"
                                        >
                                            Delivered
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center p-4">
                                    <svg
                                        aria-hidden="true"
                                        className="flex-shrink-0 inline w-5 h-5 mr-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    No orders were found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {modalVisible && (
                <div
                    id="drawer-swipe"
                    className="fixed z-40 w-full overflow-y-auto max-h-screen bg-white border-t-2 border-gray-300 dark:border-gray-700 transition-transform bottom-0 top-90 left-0 right-0"
                    tabIndex="-1"
                    aria-labelledby="drawer-swipe-label"
                >
                    <div className="flex justify-between px-4 py-3">
                        <h5
                            onClick={closeModal}
                            className="text-sm font-semibold text-gray-600 cursor-pointer dark:text-gray-400"
                        >
                            Close
                        </h5>
                        <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                            Order Details
                        </h5>
                        <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                            &nbsp;
                        </h5>
                    </div>
                    <div
                        className="px-4 py-6 grid gap-2 sm:grid-cols-1 md-grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    >
                        {
                            selectedOrderItems.order_items.map((item) => (
                                <div key={item.id} className="grid grid-cols-2">
                                    <div className="grid grid-cols-1 p-4 border-y-2 border-l-2 ">
                                        <img
                                            src={convertImageURL(item.product.preview)}
                                            alt="food icon"
                                            className="w-24 h-24 mx-auto rounded-md"
                                        />
                                        <h5 className="text-xl font-bold text-gray-800 dark:text-white text-center">
                                            {item.product.name}
                                        </h5>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                                            {item.product.description}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 border-y-2 border-r-2 p-4">
                                        <div className="grid grid-cols-2 items-center">
                                            <h5 className="text-sm font-bold text-gray-800 dark:text-white">
                                                Quantity
                                            </h5>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                {item.quantity}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 items-center">
                                            <h5 className="text-sm font-bold text-gray-800 dark:text-white">
                                                Price
                                            </h5>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                {item.product.retail_price}EUR
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        {
                            orders
                                .filter((item) => item.id === selectedOrderId)
                                .map((item) => (
                                    <div key={item.id} className="grid grid-cols-2">
                                        <div className="grid grid-cols-1 border-y-2 gap-2 p-4 border-l-2 items-center">
                                            <h5 className="text-xl font-bold text-gray-800 dark:text-white text-center">
                                                Total of order
                                            </h5>
                                            <h3 className="font-bold text-gray-700">Comment / Request</h3>
                                            <h5 className="text-gray-500 bg-gray-100 border-gray-200 p-1 border-2">
                                                {selectedOrderItems.comment}
                                            </h5>
                                        </div>
                                        <div className="grid grid-cols-1 gap-6 border-y-2 border-r-2 p-4">
                                            <div className="grid grid-cols-2 items-center">
                                                <h5 className="text-sm font-bold text-gray-800 dark:text-white">
                                                    Order ID
                                                </h5>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    #{item.id}
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-2 items-center">
                                                <h5 className="text-sm font-bold text-gray-800 dark:text-white">
                                                    City
                                                </h5>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                    {item.user.city}
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-2 items-center">
                                                <h5 className="text-sm font-bold text-gray-800 dark:text-white">
                                                    Address
                                                </h5>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    {item.user.address}
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-2 items-center">
                                                <h5 className="text-sm font-bold text-gray-800 dark:text-white">
                                                    Total
                                                </h5>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    {calculateTotal(selectedOrderItems)}EUR
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </div>
            )}
            <div className='f'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={paginate}
                />
            </div>
        </div >
    );
}
