import React from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../../../contexts/ContextProvider'

export default function OrderBar_loading(toggleDropdown, handlelowhi, lowhiFilter, isActive, isDropdownOpen) {
    const {currentUser} = useStateContext();
    return (
        <div className="bg-white">
            <div className="bg-white px-2.5 pb-2.5">
                <div className='flex items-center justify-between'>
                    <div className='grid grid-cols-1 items-center gap-4 sm:grid-cols-2'>
                        <form>
                            <label
                                htmlFor="default-search"
                                className="text-sm font-medium text-gray-900 sr-only"
                            >
                                Search
                            </label>
                            <div className="flex items-center bg-white p-0.5 hover:cursor-pointer border border-gray-300 rounded-lg px-2">
                                <button onClick={() => ({})} disabled type="submit" className="flex items-center active:scale-105">
                                    <svg
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </button>
                                <input
                                    type="search"
                                    id="default-search"
                                    className="block w-full text-sm bg-white text-gray-900 border-none bg-transparent focus:outline-none focus:ring-0"
                                    placeholder="Search Products"
                                    required
                                />
                            </div>
                        </form>
                        <div className='flex gap-2'>
                            <button
                                className={`bg-gray-100 active:scale-105 transition text-gray-700 p-1 rounded-lg ${isActive ? '' : ''}`}
                                type='button'
                                onClick={() => ({})}
                                disabled
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className={`w-6 h-6 transform transition-transform ${isActive ? 'rotate-180' : ''}`}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                </svg>
                            </button>
                            <div className='grid grid-cols-1 bg-gray-100 active:scale-105 transition p-1 rounded-lg'>
                                <button
                                    disabled
                                    className='font-semibold text-xs focus:outline-none'
                                    onClick={handlelowhi}
                                    type='button'
                                >
                                    {lowhiFilter ? 'HIGH' : 'LOW'}
                                </button>

                                <div className='border border-gray-900'></div>
                                <button
                                    className={`font-semibold text-xs focus:outline-none ${handlelowhi ? 'text-gray-600' : ''}`}
                                    type='button'
                                >
                                    {lowhiFilter ? 'LOW' : 'HIGH'}
                                </button>
                            </div>
                            <button disabled className='bg-red-100 text-red-900 hover:bg-red-200 transition active:scale-105 text-xs font-semibold uppercase p-1 rounded-lg' type='submit'>
                                Clear
                            </button>
                        </div>
                    </div>
                    <div className=' '>

                        <button
                            id="dropdownInformationButton"
                            disabled
                            onClick={toggleDropdown}
                            data-dropdown-toggle="dropdownInformation"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-lg text-sm px-4 py-2 text-center font-medium inline-flex items-center"
                            type="button"
                        >
                            Options
                            <svg
                                className={`w-2.5 h-2.5 ml-2.5 transform transition-transform ${isDropdownOpen ? "rotate-180" : ""
                                    }`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>
                        <div
                            id="dropdownInformation"
                            className={`${isDropdownOpen ? "block" : "hidden"} z-20 absolute top-17 right-2 sm:top-10 sm:right-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 mt-1`}
                        >
                            <div className="px-4 py-3 text-sm text-gray-900">
                                <div>Prese products by</div>
                                <div className="font-medium truncate">Bob's Favorites</div>
                            </div>
                            <ul className="grid grid-cols-1 items-center justify-center text-center py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">

                            </ul>
                            <div className="py-2">
                                <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Bob's Food Emporium: Crazy deals, happy wallets! In a sonic, we've opened our hearts to serve you. What are you waiting for, {currentUser.name}? <Link to="#" className="underline hover:text-orange-900 text-gray-700 ">Check our deals here!</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
