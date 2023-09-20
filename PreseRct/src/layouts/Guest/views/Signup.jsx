import React, { useEffect, useState } from "react";
import "../styles/signup-style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../../../api/axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState({ __html: "" });
  const [submitting, setSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/home") {
      showNotificationWithMessage("You registered successfully. You can now login.", "success");
    }
  }, [location]);

  const showNotificationWithMessage = (message, type) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  const signupValidation = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });
    setSubmitting(true);

    axiosClient
      .post("/signup", {
        name: username,
        email,
        password,
        password_confirmation: passwordConfirmation,
        city,
        address,
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const errors = error.response.data.errors;
          setError({
            name: errors.name ? errors.name.join("<br>") : "",
            email: errors.email ? errors.email.join("<br>") : "",
            emailex: errors.email ? errors.email[0] : "",
            password: errors.password ? errors.password.join("<br>") : "",
            password_confirmation: errors.password_confirmation
              ? errors.password_confirmation.join("<br>")
              : "",
            city: errors.city ? errors.city.join("<br>") : "",
            address: errors.address ? errors.address.join("<br>") : "",
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
      <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20">
        <div className="flex items-center justify-center p-4 opacity-60 ">
          <title>Prese | Signup</title>
          <div className="signup m-10 hover:cursor-wait">
            <h2 className="mb-3 text-center font-bold text-xl">Sign up</h2>
            <form>
              <div className="form-group mb-2">
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white hover:cursor-wait">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 hover:cursor-wait"
                  placeholder="Enter username"
                  value={username}
                  disabled
                />
              </div>
              <div className="form-group mb-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white hover:cursor-wait">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 hover:cursor-wait"
                  placeholder="Enter email"
                  value={email}
                  disabled
                />
              </div>
              <div className="form-group mt-2">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white hover:cursor-wait">
                  City
                </label>
                <select
                  id="disabledSelect"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 hover:cursor-wait"
                  name="city"
                  value={city}
                  disabled
                >
                  <option disabled value="">
                    Select your city
                  </option>
                  <option value="Gjilan">Gjilan</option>
                  <option value="Prishtina">Prishtina</option>
                  <option value="Mitrovica">Mitrovica</option>
                  <option value="Peja">Peja</option>
                  <option value="Ferizaj">Ferizaj</option>
                </select>
              </div>
              <div className="form-group mt-2">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white hover:cursor-wait">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 hover:cursor-wait"
                  placeholder="Write your address here"
                  value={address}
                  disabled
                />
              </div>
              <div className="form-group mt-2">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium dark:text-white hover:cursor-wait">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 hover:cursor-wait"
                  placeholder="Enter password"
                  value={password}
                  disabled
                />
              </div>
              <div className="form-group mt-2">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium dark:text-white hover:cursor-wait">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 hover:cursor-wait"
                  placeholder="Confirm password"
                  value={passwordConfirmation}
                  disabled
                />
              </div>

              <button type="submit" className="btn btn-danger w-full mt-4 p-2 btn-signup rounded bg-red-500 text-white font-bold focus:ring-white hover:cursor-wait" disabled>
                Signing up
                <div role="status" class="opacity-100 absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                  <svg aria-hidden="true" class="opacity-100 w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </button>

              <p className="text-center mt-2 mb-3">
                Already have an account?{" "}
                <Link to="/login" className="text-red-500 hover:cursor-wait" >Login</Link>
              </p>
              <button type="button" className="btn btnGuest w-full mt-2 p-2 rounded hover:cursor-wait" disabled>
                CONTINUE AS GUEST
              </button>
            </form>
          </div>
        </div>

      </div>
    )
  }

  return (
    <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20">
      {showNotification && (
        <div id="alert-border-1" className="flex p-4 mb-4 text-blue-800 border-t-4 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800" role="alert">
          <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
          </svg>
          <div className="ml-3 text-sm font-medium">
          {notificationMessage} <Link to="/login" className="font-semibold underline hover:no-underline">Login</Link>. Join if you want.
          </div>
          <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-1" aria-label="Close">
            <span className="sr-only">Dismiss</span>
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
      )}
      <div className="flex items-center justify-center p-4">
        <title>GFC | Signup</title>

        <div className="signup m-10">
          <h2 className="mb-3 text-center font-bold text-xl">Sign up</h2>
          <form onSubmit={signupValidation}>
            <div className="form-group mb-2">
              <label
                htmlFor="text"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
                type="text"
                name="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                placeholder="Enter username"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                placeholder="Enter email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
            <div className="form-group mt-2">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                City
              </label>
              <select
                id="disabledSelect"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                name="city"
                value={city}
                onChange={(ev) => setCity(ev.target.value)}
              >
                <option disabled value="">
                  Select your city
                </option>
                <option value="Gjilan">Gjilan</option>
                <option value="Prishtina">Prishtina</option>
                <option value="Mitrovica">Mitrovica</option>
                <option value="Peja">Peja</option>
                <option value="Ferizaj">Ferizaj</option>
              </select>

            </div>
            <div className="form-group mt-2">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                placeholder="Write your address here"
                value={address}
                onChange={(ev) => setAddress(ev.target.value)}
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
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                placeholder="Enter password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
            <div className="form-group mt-2">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium dark:text-white">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm-password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                placeholder="Confirm password"
                value={passwordConfirmation}
                onChange={(ev) => setPasswordConfirmation(ev.target.value)}
              />
            </div>

            {error.password && (
              <div class="flex p-2 mt-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Danger</span>
                <div>
                  <span class="font-medium">Ensure that these requirements are met:</span>
                  <ul class="mt-1.5 ml-4 list-disc list-inside">
                    {error.name && <li dangerouslySetInnerHTML={{ __html: error.name }}></li>}
                    {error.email && <li dangerouslySetInnerHTML={{ __html: error.email }}></li>}
                    {error.city && <li dangerouslySetInnerHTML={{ __html: error.city }}></li>}
                    {error.address && <li dangerouslySetInnerHTML={{ __html: error.address }}></li>}
                    {error.password && <li dangerouslySetInnerHTML={{ __html: error.password }}></li>}
                  </ul>
                </div>
              </div>
            )}
            {error.other && (
              <div class="flex p-2 mt-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Danger</span>
                <div>
                  <span class="font-medium">Ensure that these requirements are met:</span>
                  <ul class="mt-1.5 ml-4 list-disc list-inside">
                    {error.other && <li dangerouslySetInnerHTML={{ __html: error.other }}></li>}
                  </ul>
                </div>
              </div>
            )}


            <button type="submit" className="btn btn-danger w-full mt-4 p-2 btn-signup rounded bg-red-500 focus:cursor-wait text-white font-bold focus:ring-white">
              Sign Up
            </button>

            <p className="text-center mt-2 mb-3">
              Already have an account?{" "}
              <Link to="/login" className="text-red-500 hover:text-red-700 underline focus:cursor-wait" >Login</Link>
            </p>
            <p className="text-gray-500 text-center">
              -- -- -- -- -- -- -- or -- -- -- -- -- -- --
            </p>
            <Link type="button" to='../' className="btn text-center btnGuest w-full mt-2 p-2 rounded focus:cursor-wait">
              CONTINUE AS GUEST
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};