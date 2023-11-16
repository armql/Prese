import React from 'react'
import { useStateContext } from '../../../../contexts/ContextProvider'

export default function MOTLoadingModal_skeleton({orders, getStatusTableColor, openModal, calculateTotal, modalVisible, closeModal, selectedOrderItems, convertImageURL, selectedOrderId}) {
    const { currentUser } = useStateContext();
    return (
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
                            Managed by
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Assigned Driver
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
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-base text-center bg-red-100 rounded-md border-2 border-red-200 shadow-sm text-red-400 font-semibold">
                                        {order.employee_name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-base text-center bg-blue-100 rounded-md border-2 border-blue-200 shadow-sm text-blue-400 font-semibold">{order.driver_name}</div>
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
    )
}
