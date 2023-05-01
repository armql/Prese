import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { useStateContext } from "../../../contexts/ContextProvider";


export default function Navbar() {
    const { currentUser, userToken } = useStateContext();

    const guestLinks = [
        { to: '/home', text: 'Home' },
        { to: '/aboutus', text: 'About' },
        { to: '/contactus', text: 'Contact' },
        { to: '/login', text: 'Login' },
        { to: '/signup', text: 'Signup' },
        { to: '/guest', text: 'Guest' },
    ];

    const customerLinks = [
        { to: '/c', text: 'Home' },
        { to: '/aboutus', text: 'About' },
        { to: '/contactus', text: 'Contact' },
        { to: `/user`, text: `customer_${currentUser.role}` },
        { to: '/logout', text: 'Logout' },
    ];

    const employeeLinks = [
        { to: '/e', text: 'Home' },
        { to: '/aboutus', text: 'About' },
        { to: '/contactus', text: 'Contact' },
        { to: `/user`, text: `employee_${currentUser.name}` },
        { to: '/logout', text: 'Logout' },
    ];

    const driverLinks = [
        { to: '/d', text: 'Home' },
        { to: '/aboutus', text: 'About' },
        { to: '/contactus', text: 'Contact' },
        { to: `/user`, text: `driver_${currentUser.name}` },
        { to: '/logout', text: 'Logout' },
    ];

    const managerLinks = [
        { to: '/m', text: 'Home' },
        { to: 'aboutus', text: 'About' },
        { to: 'contactus', text: 'Contact' },
        { to: 'userlist', text: 'User List' },
        { to: 'productlist', text: 'Product List' },
        { to: '/admin', text: `_${currentUser.name}` },
        { to: '/logout', text: 'Logout' },
    ];


    let filteredLinks;
    if (userToken) {
        if (currentUser.role === 'customer') {
            filteredLinks = customerLinks;
        } else if (currentUser.role === 'employee') {
            filteredLinks = employeeLinks;
        } else if (currentUser.role === 'driver') {
            filteredLinks = driverLinks;
        } else if (currentUser.role === 'manager') {
            filteredLinks = managerLinks;
        }
        filteredLinks = customerLinks;
    } else filteredLinks = guestLinks;;



    return (
        <nav className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-60">
            <div className="max-w-screen-l flex flex-wrap items-center justify-between mx-auto p-3 ">
                <a href="https://flowbite.com/" className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Prese</span>
                </a>
                <div className="flex md:order-2">
                    <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-2" id="navbar-cta">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {filteredLinks.map((link) => (
                            <NavLink key={link.text} exact to={link.to} className="nav-link hover:text-red-600" activeClassName="active" isactive={true}>
                                {link.text}
                            </NavLink>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
