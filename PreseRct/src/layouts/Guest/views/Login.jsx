import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useStateContext } from '../../../contexts/ContextProvider';
import { useState } from "react";
import axiosClient from "../../../api/axios";
import Swal from 'sweetalert2'

export default function Login() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ __html: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    clearURLParameters();
  }, []);

  const clearURLParameters = () => {
    const url = window.location.href.split('?')[0];
    window.history.replaceState({}, document.title, url);
  };


  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });
    setSubmitting(true);

    const request = {
      email,
      password,
    };

    axiosClient
      .post("/login", request)
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
        if (data.user.role === 'manager') {
          clearURLParameters();
          navigate('/management');
          Swal.fire(
            `Hello ${data.user.name}!`,
            `Welcome back ${data.user.role}.`,
            'info'
          )
        } else if (data.user.role === 'employee') {
          clearURLParameters();
          navigate('/workspace');
          Swal.fire(
            `Hello ${data.user.name}!`,
            `Welcome back ${data.user.role}.`,
            'info'
          )
        } else if (data.user.role === 'customer') {
          clearURLParameters();
          navigate('/app');
        } else if (data.user.role === 'driver') {
          clearURLParameters();
          navigate('/workdrive');
          Swal.fire(
            `Hello ${data.user.name}!`,
            `Welcome back ${data.user.role}.`,
            'info'
          )
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const errors = error.response.data.errors;
          setError({
            name: errors.name ? errors.name.join("<br>") : "",
            email: errors.email ? errors.email.join("<br>") : "",
            emailex: errors.email ? errors.email[0] : "",
            password: errors.password ? errors.password.join("<br>") : "",
            other: errors.error ? errors.error.join("<br>") : "",
          });
        } else if (error.response && error.response.data && error.response.data.error) {
          setError({
            email: "",
            password: "",
            other: error.response.data.error,
          });
        } else {
          setError({ other: "An error occurred. Please try again later." });
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };


  if (submitting) {
    return (
      <div className="bg-black backdrop-filter backdrop-blur-xl bg-opacity-50">
        <div className="flex items-center justify-center">
          <title>Prese | Login</title>

          <div className="bg-white backdrop-blur-sm bg-opacity-90 px-20 py-16 shadow-sm rounded-sm m-10">
            <h2 className="mb-3 text-center font-bold text-4xl">Login</h2>
            <form onSubmit={onSubmit} className='w-96'>
              <div className="form-group mt-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-white border-2 shadow-sm border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 opacity-50"
                  placeholder="Enter email"
                  value={email}
                  disabled
                />
              </div>
              <div className="form-group mt-2">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="bg-white border-2 shadow-sm border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 opacity-50"
                  placeholder="Enter password"
                  value={password}
                  disabled
                />
              </div>
              <button type="submit" className="w-full mt-4 p-2 rounded bg-red-500 hover:scale-105 transition active:scale-100 hover:bg-red-600 text-white font-bold cursor-wait opacity-50" disabled>
                Logging in
              </button>

              <p className="text-center mt-2 mb-3">
                Don't have an account yet?{" "}
                <Link to="/signup" className="text-red-500 hover:text-red-700 underline focus:cursor-wait" >Sign up</Link>
              </p>

              <Link type="button" to='../' className="btn text-center hover:border-gray-500 hover:shadow-sm border-transparent transition border-2 w-full mt-2 p-2 rounded cursor-wait" disabled>
                CONTINUE AS GUEST
              </Link>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black backdrop-filter backdrop-blur-xl bg-opacity-50">
      <div className="flex items-center justify-center">
        <title>Prese | Login</title>

        <div className="bg-white backdrop-blur-sm bg-opacity-90 px-20 py-16 shadow-sm rounded-sm m-10">
          <h2 className="mb-3 text-center font-bold text-4xl">Login</h2>
          <form onSubmit={onSubmit} className='w-96'>
            <div className="form-group mt-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="bg-white border-2 shadow-sm border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
            <div className="form-group mt-2">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="bg-white border-2 shadow-sm border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
            {error.password && (
              <div class="shadow-sm flex p-2 mt-4 text-sm text-red-600 rounded-md bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Danger</span>
                <div>
                  <ul class="mt-1.5 ml-4 list-disc list-inside">
                    <span class="font-medium">Ensure that these requirements are met:</span>
                    {error.email && <li dangerouslySetInnerHTML={{ __html: error.email }}></li>}
                    {error.password && <li dangerouslySetInnerHTML={{ __html: error.password }}></li>}
                  </ul>
                </div>
              </div>
            )}
            {error.other && (
              <div class="flex p-2 mt-4 text-sm text-red-600 rounded-md bg-red-50" role="alert">
                <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Danger</span>
                <div>
                  <ul class="mt-1.5 ml-4 list-disc list-inside">
                    <span class="font-medium">Ensure that these requirements are met:</span>
                    {error.other && <li dangerouslySetInnerHTML={{ __html: error.other }}></li>}
                  </ul>
                </div>
              </div>
            )}
            <button type="submit" className="w-full mt-4 p-2 rounded bg-red-500 hover:scale-105 transition active:scale-100 hover:bg-red-600 text-white font-bold active:cursor-wait">
              Login
            </button>

            <p className="text-center mt-2 mb-3">
              Don't have an account yet?{" "}
              <Link to="/signup" className="text-red-500 hover:text-red-700 underline focus:cursor-wait">Sign up</Link>
            </p>

            <Link type="button" to='../' className="text-center hover:border-gray-500 hover:shadow-sm border-transparent transition border-2 w-full mt-2 p-2 rounded active:cursor-wait hover:bg-gray-50">
              CONTINUE AS GUEST
            </Link>
          </form>
        </div>
      </div>
    </div>

  )
}
