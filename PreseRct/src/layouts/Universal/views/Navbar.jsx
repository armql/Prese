import React from 'react'
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import axiosClient from '../../../axios';
import { useStateContext } from '../../../contexts/ContextProvider';

export default function Navbar() {
    // ^ stored data collection & makes logout functional
    const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();

    const navigate = useNavigate();

    const logout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then((res) => {
            setCurrentUser({});
            setUserToken(null);
            navigate('/');
        })
    };


    const guestLinks = [
        { to: '/home', text: 'Home' },
        { to: '/aboutus', text: 'About' },
        { to: '/ourlocations', text: 'Our Locations' },
        { to: '/login', text: 'Login' },
        { to: '/signup', text: 'Signup' },
        { to: '/guest', text: 'Guest' },
    ]
    const customerLinks = [
        { to: '/home', text: 'Home' },
        { to: '/aboutus', text: 'About' },
        { to: '/ourlocations', text: 'Our Locations' },
        { to: `/user`, text: `user` },
        { to: '/logout', text: 'Log out' },
    ]
    const employeeLinks = [
        { to: '/home', text: 'Home' },
        { to: '/aboutus', text: 'About' },
        { to: '/ourlocations', text: 'Our Locations' },
        { to: `/user`, text: `employee` },
        { to: '/logout', text: 'Log out' },
    ]
    const driverLinks = [
        { to: '/home', text: 'Home' },
        { to: '/aboutus', text: 'About' },
        { to: '/ourlocations', text: 'Our Locations' },
        { to: `/user`, text: `driver` },
        { to: '/logout', text: 'Log out' },
    ]
    const managerLinks = [
        { to: 'dashboard', text: 'Dashboard' },
        { to: 'aboutus', text: 'About' },
        { to: 'ourlocations', text: 'Our Locations' },
        { to: 'userlist', text: 'User List' },
        { to: 'productlist', text: 'Product List' },
        { to: 'm/categorylist', text: 'Category List' },
        { to: 'm/categoryregister', text: 'Register List' },
        { to: '/admin', text: `manager` },
        { to: '/logout', text: 'Log out' },
    ]


    let filteredLinks;
    if (userToken) {
        if (currentUser.user_role === 'customer') {
            filteredLinks = customerLinks;
        } else if (currentUser.user_role === 'employee') {
            filteredLinks = employeeLinks;
        } else if (currentUser.user_role === 'driver') {
            filteredLinks = driverLinks;
        } else if (currentUser.user_role === 'manager') {
            filteredLinks = managerLinks;
        }
    } else {
        filteredLinks = guestLinks;
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
