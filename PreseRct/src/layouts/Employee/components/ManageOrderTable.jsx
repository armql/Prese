import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../../contexts/ContextProvider';
import axiosClient from '../../../api/axios';
import Swal from 'sweetalert2';
import MOTableSkeleton from './core/MOTable_skeleton';
import MOLoadingModal from './core/MOLoadingModal_skeleton';
import Pagination from './core/MOTable_pagination';
import MOTableFilter from './core/MOTable_filters_search';
import MOTLoadingModal_skeleton from './core/MOTLoadingModal_skeleton';

export default function ManageOrderTable() {
    const { currentUser } = useStateContext();

    const [modalVisible, setModalVisible] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [reloadTable, setReloadTable] = useState(false);
    const [error, setError] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedOrderItems, setSelectedOrderItems] = useState([]);

    const [timeFilter, setTimeFilter] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedDriverId, setSelectedDriverId] = useState('');
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = urlParams.get('page');
        const page = parseInt(pageParam) || 1;

        setCurrentPage(page);

        const fetchOrders = () => {
            let url = `/orders?page=${page}&perPage=10`;

            if (timeFilter === 'latest') {
                url += '&orderBy=created_at:desc';
            } else if (timeFilter === 'oldest') {
                url += '&orderBy=created_at:asc';
            }

            return axiosClient
                .get(url)
                .then((response) => {
                    setOrders(response.data.orders);
                    setLoading(false);

                    const totalOrders = response.data.total;
                    const totalPages = Math.ceil(totalOrders / ordersPerPage);
                    setTotalPages(totalPages);
                })
                .catch((error) => {
                    console.error('Failed to fetch orders', error);
                });
        };

        const fetchDrivers = () => {
            return axiosClient.get('driverls').then((res) => {
                if (Array.isArray(res.data.drivers)) {
                    setDrivers(res.data.drivers);
                } else {
                    console.error('Invalid response format');
                }
            }).catch((error) => {
                console.error('Failed to fetch drivers', error);
            });
        };

        Promise.all([fetchOrders(), fetchDrivers()]).then(() => {
            setReloadTable(false);
        });
    }, [reloadTable]);

    // ^ FUNCTIONS

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        axiosClient.get(`/orders?page=${pageNumber}&perPage=${ordersPerPage}`)
            .then(response => {
                setOrders(response.data.current_page);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch orders', error);
            });
    };

    const filter = (timeFilter) => {
        setTimeFilter(timeFilter)
        axiosClient.get(`/orders?page=${currentPage}&perPage=${ordersPerPage}&orderBy=${timeFilter}`)
            .then(response => {
                setOrders(response.data.orders);
                console.log(orders)
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

    const closeModal = () => {
        setLoadingModal(false);
        setModalVisible(false);
    };

    const calculateTotal = (items) => {
        let total = 0;

        for (const item of items.order_items) {
            const { quantity, product } = item;
            total += quantity * product.retail_price;
        }

        total = total.toFixed(2);

        return total;
    };

    let convertImageURL = (items) => {
        const imageURL = items.replace('../GfcRct', '');
        return imageURL;
    };

    const handleChanges = (orderId) => {
        const employeeId = currentUser.id;

        if (selectedStatus === 'cancelled') {
            Swal.fire({
                title: 'You are cancelling an order',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, cancel it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    proceedWithChanges(orderId, employeeId);
                }
            });
        } else {
            proceedWithChanges(orderId, employeeId);
        }
    };

    const proceedWithChanges = (orderId, employeeId) => {
        axiosClient
            .put(`/orders/${orderId}`, {
                status: selectedStatus,
                driver_id: selectedDriverId,
                employee_id: employeeId
            })
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    text: res.data.message
                });
                setReloadTable(true);
            })
            .catch((error) => {
                setShowAlert(true);
                setError(error.response.data);
            });
    };

    const getDriverOptions = (driverId) => {
        const allDrivers = drivers;
        const assignedDriver = allDrivers.find(driver => driver.id === driverId);
        if (assignedDriver) {
            return (
                <option key={assignedDriver.id} value={assignedDriver.id} selected>
                    {assignedDriver.name}
                </option>
            );
        } else {
            return (
                <option key="assign" value="">Assign to a driver</option>
            );
        }
    };

    const getStatusOptions = (status) => {
        const allStatuses = ["pending", "delivering", "cancelled"];
        const filteredStatuses = allStatuses.filter((s) => s !== status);
        return filteredStatuses.map((s) => (
            <option key={s} value={s} defaultValue={s === status} disabled={s === status}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
        ));
    };

    const getStatusTableColor = (status) => {
        switch (status) {
            case 'cancelled':
                return (
                    <div className='bg-red-400 h-20 text-end p-1 font-bold text-red-900' >
                        Cancelled
                    </div>
                );
            case 'delivering':
                return (
                    <div className='bg-lime-200 h-20 p-1 text-end font-bold text-lime-900' >
                        Delivering
                    </div>
                );
            case 'delivered':
                return (
                    <div className='bg-green-200 h-20 p-1 text-end font-bold text-green-900' >
                        Delivered
                    </div>
                );
            case 'pending':
                return (
                    <div className='bg-yellow-200 h-20 p-1 text-end font-bold text-yellow-700' >
                        Pending
                    </div>
                );
            default:
                return null;
        }
    };

    // * LOADERS

    if (loadingModal) {
        return (
            <div>
                <MOTableFilter
                />
                <MOTLoadingModal_skeleton
                    orders={orders}
                    getStatusTableColor={getStatusTableColor}
                    openModal={openModal}
                    getStatusOptions={getStatusOptions}
                    getDriverOptions={getDriverOptions}
                    drivers={drivers}
                    selectedDriverId={selectedDriverId}
                    setSelectedDriverId={setSelectedDriverId}
                />
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
        <div className='parent'>
            {showAlert && (
                <div id="alert-border-2" className="flex fixed z-40 justify-top transition-transform bottom-100 top-1 left-100 right-1 shadow-md w-max p-4 mb-4 text-red-800 border-b-4 border-red-400 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
                    <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                    </svg>
                    <div className="ml-3 text-sm font-medium">
                        {error.error}
                    </div>
                    <button
                        type="button"
                        className="ml-1 -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                        data-dismiss-target="#alert-border-2"
                        aria-label="Close"
                        onClick={() => setShowAlert(false)}
                    >
                        <span className="sr-only">Dismiss</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            )}
            <MOTableFilter
                filter={filter}
            />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <div
                    className="bg-white rounded-md shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-95"
                >
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs border-gray-150 uppercase bg-white">
                            <tr className='bg-white'>
                                <th scope="col" className="p-4">

                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Order
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ordered by
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Assign to
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    City & Address
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Modify Order
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order.id} className='bg-white'>
                                        <input type="hidden" name="employee_id" value={currentUser.id} />
                                        <td>
                                            {getStatusTableColor(order.status)}
                                        </td>
                                        <td scope="row" className="flex items-center justify-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div class="text-center">
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
                                        <td className="px-6 py-4">
                                            <div className='flex justify-center'>
                                                <select
                                                    name="status"
                                                    className="rounded-xl h-8 text-xs text-gray-700 border-none bg-gray-100 focus:outline-none"
                                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                                >
                                                    <option value={order.status} disabled selected>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</option>
                                                    {getStatusOptions(order.status)}
                                                </select>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className='flex justify-center'>
                                                <select
                                                    name='driver'
                                                    className='rounded-xl h-8 text-xs text-gray-700 outline-none border-none bg-blue-100'
                                                    onChange={(e) => setSelectedDriverId(e.target.value)}
                                                >
                                                    {getDriverOptions(selectedDriverId)}
                                                    {drivers.map((driver) => (
                                                        <option key={driver.id} value={driver.id}>
                                                            {driver.name}
                                                        </option>
                                                    ))}
                                                </select>
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
                                                type='submit'
                                                className="font-medium bg-gray-50 p-3 rounded-md hover:bg-gray-200 text-gray-500 dark:text-red-500">Modify</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className='text-center p-4'><svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>No orders were found.</td>
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

            </div >
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
            />
        </div >
    );
}
