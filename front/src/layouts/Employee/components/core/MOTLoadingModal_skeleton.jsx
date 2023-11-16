import React from 'react'
import { useStateContext } from '../../../../contexts/ContextProvider'

export default function MOTLoadingModal_skeleton({orders, getStatusTableColor, openModal, getStatusOptions, selectedDriverId, setSelectedDriverId, getDriverOptions, drivers}) {
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
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Assign to
                            </th>
                            <th scope="col" className="px-6 py-3">
                                City & Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Modify Order
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order) => (
                                <tr key={order.id} className="bg-white">
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
                                                value={selectedDriverId}
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
                                    <td className="px-6 py-4">
                                        <button
                                            type='submit'
                                            className="font-medium bg-gray-50 p-3 rounded-md hover:bg-gray-200 text-gray-500 dark:text-red-500"
                                        >Modify</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
