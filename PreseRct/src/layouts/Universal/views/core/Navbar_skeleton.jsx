import React from 'react';
import Logo from '../../images/WEBDEV.svg';

export default function Navbar_skeleton() {
    return (
        <nav className="z-40 fixed top-0 right-0 left-0 bg-white border-b-2 backdrop-filter backdrop-blur-lg bg-opacity-80">
            <div className="max-w-screen-l flex flex-wrap items-center justify-between mx-auto p-3">
                <a href="#" className="flex items-center">
                        <img src={Logo} alt="" className='w-24 sm:w-40 h-24 object-cover' />
                </a>
                <div className='flex items-center focus:ring focus:ring-red-100 justify-center bg-gray-100 rounded-md py-1.5 px-2'>
                    <input type="search" name="" id="search" className='bg-transparent border-none placeholder:text-red-950 outline-none' placeholder='Search anything' />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                <div className="flex md:order-2">
                    <button
                        data-collapse-toggle="navbar-cta"
                        type="button"
                        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-cta"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <span className="skeleton-icon"></span>
                    </button>
                </div>
                <div className="hidden md:flex md:w-auto md:order-2" id="navbar-cta">
                    <ul className="flex flex-col items-center animate-pulse gap-4 font-medium md:p-0 border border-none rounded-lg bg-transparent md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li className="skeleton-link rounded-lg bg-gray-200 w-36 h-5"></li>
                        <li className="skeleton-link rounded-lg bg-gray-200 w-48 h-5"></li>
                        <li className="skeleton-link rounded-lg bg-gray-300 w-42 h-5"></li>
                        <li className="skeleton-link rounded-lg bg-gray-300 w-52 h-5"></li>
                        <li className="skeleton-link rounded-lg bg-gray-300 w-22 h-5"></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}