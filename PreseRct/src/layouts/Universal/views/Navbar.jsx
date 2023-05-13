import React, { useEffect } from 'react'
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import axiosClient from '../../../axios';
import { useStateContext } from '../../../contexts/ContextProvider';
import navLinksData from '../data/NavLinksData'

export default function Navbar() {
    // ^ stored data collection & makes logout functional
    const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();

    const navigate = useNavigate();

    const logout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setCurrentUser({});
            setUserToken(null);
            navigate('/home');
        })
    };



    let filteredLinks;
    if (userToken) {
        if (currentUser.user_role === 'customer') {
            filteredLinks = navLinksData.customerLinks;
        } else if (currentUser.user_role === 'employee') {
            filteredLinks = navLinksData.employeeLinks;
        } else if (currentUser.user_role === 'driver') {
            filteredLinks = navLinksData.driverLinks;
        } else if (currentUser.user_role === 'manager') {
            filteredLinks = navLinksData.managerLinks;     
        }
    } else {
        filteredLinks = navLinksData.guestLinks;
    }

    return (
        <nav className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-60">
            <div className="max-w-screen-l flex flex-wrap items-center justify-between mx-auto p-3 ">
                <a href="#" className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Prese</span>
                </a>
                <div className="flex md:order-2">
                    <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" ></path></svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-2" id="navbar-cta">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {filteredLinks.map((link) => (
                            <NavLink key={link.text} exact to={link.to} className="nav-link hover:text-red-600" activeClassName="active" onClick={(ev) => link.text === 'Log out' ? logout(ev) : null} isactive={true}>
                                {link.text}
                            </NavLink>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
