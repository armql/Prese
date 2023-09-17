import React, { useEffect, useState } from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import axiosClient from '../../../api/axios';
import { useStateContext } from '../../../contexts/ContextProvider';
import navLinksData from '../data/NavLinksData';
import img from '../images/WEBDEV.svg';
import NavbarSkeleton from './core/Navbar_skeleton';

export default function Navbar() {
  const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [activeLink, setActiveLink] = useState('');
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
    <nav className="z-40 fixed top-0 right-0 left-0 bg-white border-b-2 backdrop-filter backdrop-blur-lg bg-opacity-80">
      <div className="flex flex-wrap items-center justify-around">
        <div className="flex items-center">
          <img src={img} alt="" className='w-24 sm:w-40 h-24 object-cover' />
        </div>
        <div className='flex items-center focus:ring focus:ring-red-100 justify-center bg-zinc-100 rounded-md py-1.5 px-2'>
        <input type="search" name="" id="search" style={{ outline: 'none' }} className='bg-transparent border-none placeholder:text-red-950 ' placeholder='Search anything'/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <div className="flex md:order-2">
          <lottie-player
            src="https://lottie.host/3ebdac1f-cd98-41ba-9f33-d113fe8abd42/Xuz4DhYm6l.json"
            background="transparent"
            speed="1"
            style={{ width: "50px", height: "50px" }}
            loop={false}  // Set loop to false to prevent continuous animation
            autoplay={false} // Set autoplay to false initially
            paused={!isMenuOpen} // Pause the animation when isMenuOpen is false
            onClick={handleMenuToggle} // Toggle isMenuOpen when the animation is clicked
          />
        </div>
        <div className={`items-center justify-center text-center bg-transparent ${isMenuOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-2`} id="navbar-cta">
          <ul className="self-center flex flex-col font-medium md:p-0 mt-4 border-4 border-red-500 border-none rounded-lg bg-transparent md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            {filteredLinks.map((link) => (
              <NavLink
                key={link.text}
                exact
                to={link.to}
                className={`nav-link hover:text-red-600 py-2 px-4 rounded-md ${activeLink === link.text ? 'text-red-500' : 'text-black'}`}
                activeClassName="active"
                onClick={(ev) => {
                  if (link.text === 'Log out') {
                    logout(ev);
                  } else {
                    setActiveLink(link.text);
                  }
                }}
                isActive={(match) => {
                  if (match && link.text === activeLink) {
                    return true;
                  } else {
                    return false;
                  }
                }}
              >
                {link.text}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

