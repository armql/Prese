import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Remove NavLink import from 'react-router-dom';
import axiosClient from '../../../api/axios';
import { useStateContext } from '../../../contexts/ContextProvider';
import navLinksData from '../data/NavLinksData';
import img from '../images/WEBDEV.svg';
import NavbarSkeleton from './core/Navbar_skeleton';
import { usePopup } from '../../../contexts/PopupContext';

export default function Navbar() {
  const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [activeLink, setActiveLink] = useState('Home');

  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get('/me')
      .then(({ data }) => {
        setCurrentUser(data);
        setLoadingUser(false);
      })
      .catch(() => {
        setLoadingUser(false);
      });
  }, []);

  if (loadingUser) {
    return (
      <NavbarSkeleton />
    )
  }

  const logout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setCurrentUser({});
      setUserToken(null);
      navigate('/home');
    });
  };

  let filteredLinks;
  if (userToken) {
    if (currentUser.role === 'customer') {
      filteredLinks = navLinksData.customerLinks;
    } else if (currentUser.role === 'employee') {
      filteredLinks = navLinksData.employeeLinks;
    } else if (currentUser.role === 'driver') {
      filteredLinks = navLinksData.driverLinks;
    } else if (currentUser.role === 'manager') {
      filteredLinks = navLinksData.managerLinks;
    }
  } else {
    filteredLinks = navLinksData.guestLinks;
  }

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-60`}>
      <div className="max-w-screen-l flex flex-wrap items-center justify-between mx-auto p-3">
        <div className="flex items-center">
          <span className="self-center text-2xl font-bold whitespace-nowrap text-red-500">
            <img src={img} alt="" className='w-24 h-24' />
          </span>
        </div>
        <div className="flex md:order-2">
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-cta"
            aria-expanded={isMenuOpen ? "true" : "false"}
            onClick={handleMenuToggle}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12 a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              ></path>
            </svg>
          </button>
        </div>
        <div className={`items-center justify-between bg-transparent ${isMenuOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-2`} id="navbar-cta">
          <ul className="flex flex-col font-medium md:p-0 mt-4 border border-none rounded-lg bg-transparent md:flex-row md:mt-0 md:border-0 md:bg-transparent gap-0 sm:gap-2">
            {filteredLinks.map((link) => (
              <li key={link.text}>
                <NavLink
                  exact={true} // Use exact as a string
                  to={link.to}
                  className={`nav-link hover:text-red-600 py-2 px-4 rounded-md ${activeLink === link.text ? 'text-red-500' : 'text-black'}`}
                  onClick={(ev) => {
                    if (link.text === 'Log out') {
                      logout(ev);
                    } else {
                      setActiveLink(link.text);
                    }
                  }}
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}