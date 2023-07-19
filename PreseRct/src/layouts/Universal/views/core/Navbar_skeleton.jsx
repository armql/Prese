import React from 'react';
import Logo from '../../images/logo.png';

export default function Navbar_skeleton() {
    return (
        <nav className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-60">
            <div className="max-w-screen-l flex flex-wrap items-center justify-between mx-auto p-3">
                <a href="#" className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        <img src={Logo} alt="" style={{ width: "60px", height: "60px" }} />
                    </span>
                </a>
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
                    <ul className="flex flex-col items-center animate-pulse gap-4 font-medium md:p-0 mt-4 border border-none rounded-lg bg-transparent md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li className="skeleton-link rounded-lg bg-gray-200 w-36 h-5"></li>
                        <li className="skeleton-link rounded-lg bg-gray-200 w-48 h-5"></li>
                        <li className="skeleton-link rounded-lg bg-gray-200 w-36 h-5"></li>
                        <li className="skeleton-link rounded-lg bg-gray-200 w-36 h-5"></li>
                        <li className="skeleton-link rounded-lg bg-gray-300 w-42 h-5"></li>
                        <li className="skeleton-link rounded-lg bg-gray-300 w-52 h-5"></li>
                        <li className="skeleton-link rounded-lg bg-gray-300 w-22 h-5"></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}