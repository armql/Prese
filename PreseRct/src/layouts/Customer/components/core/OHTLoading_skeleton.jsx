import React from 'react'

export default function OHTLoading_skeleton() {
    const getStatusText = (status) => {
        switch (status) {
            case 'cancelled':
                return (
                    <div className="flex items-center justify-center bg-red-200 rounded-full px-2 text-red-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-6 mr-1"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Cancelled
                    </div>
                );
            case 'delivering':
                return (
                    <div className="flex items-center justify-center gap-1 bg-lime-200 rounded-full px-2 text-lime-700">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-6">
                            <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                            <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                            <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                        </svg>
                        Delivering
                    </div>
                );
            case 'delivered':
                return (
                    <div className="flex items-center justify-center bg-green-200 rounded-full px-2 text-green-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-6 mr-1"
                        >
                            <path
                                fillRule="evenodd"
                                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Delivered
                    </div>
                );
            case 'pending':
                return (
                    <div className="flex items-center justify-center bg-yellow-200 rounded-full p-1 px-5 mr-2 mb-2 text-yellow-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-6 mr-1"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Pending
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="relative overflow-x-auto sm:rounded-lg">
            <div className='grid gap-2 bg-white rounded-md shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-40'>
                <div className='m-10 grid sm:grid-cols-1 md-grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
                    <div className="bg-white rounded-md shadow-xl backdrop-filter p-5 backdrop-blur-lg bg-opacity-95">

                        <div className="orders-detail animate-pulse">
                            <div className="grid gap-5 grid-cols-1">
                                <div className="grid grid-cols-2 justify-between">
                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-1">
                                        <p className="text-l font-bold text-gray-700"><div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-20"></div></p>
                                        <p className="text-l font-bold text-gray-700"><div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-40"></div></p>
                                        <p className="text-l font-bold text-gray-700"><div class="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-20"></div></p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-2">
                                        <p className="text-xs font-bold text-gray-500"><div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div></p>
                                        <p className="text-xs font-bold text-gray-500"><div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-40"></div></p>
                                        <p className="text-xs font-bold text-gray-500"><div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div></p>
                                    </div>
                                </div>
                                <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 items-center justify-center">
                                    <div>{getStatusText(`pending`)}</div>

                                    <div className='flex items-center justify-center'>
                                        <button
                                            onClick={() => openModal(order.id)}
                                            type="button"
                                            className=" focus:outline-none h-10 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm p-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                        >
                                            View Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        </div>
    )
}
