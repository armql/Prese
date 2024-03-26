import { useState } from "react";
import "../styles/signup-style.css";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../../api/axios";
import Signup_skeleton from "./core/Signup_skeleton";
import { usePopup } from "../../../contexts/PopupContext";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState({ __html: "" });
  const [submitting, setSubmitting] = useState(false);
  const { showAlert } = usePopup();

  const navigate = useNavigate();

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
        showAlert();
        navigate("/home");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
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
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
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
    return <Signup_skeleton />;
  }

  return (
    <div className="relative bg-black backdrop-filter backdrop-blur-xl bg-opacity-50">
      <div className="flex items-center justify-center">
        <title>Prese | Signup</title>

        <div className="bg-white backdrop-blur-sm bg-opacity-90 px-20 py-16 shadow-sm rounded-sm m-10">
          <h2 className="mb-3 text-center font-bold text-4xl">Sign up</h2>
          <form onSubmit={signupValidation}>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="form-group mb-2 w-82 md:w-80">
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  autoComplete="off"
                  className="bg-white border-2 shadow-sm border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter username"
                  value={username}
                  onChange={(ev) => setUsername(ev.target.value)}
                />
              </div>
              <div className="form-group mb-2 w-82 md:w-80">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  className="bg-white border-2 shadow-sm border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
              </div>
            </div>
            <div className="form-group mt-2 w-82">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                City
              </label>
              <select
                id="disabledSelect"
                className="bg-white border-2 shadow-sm border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
            <div className="form-group mt-2 w-82">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                className="bg-white border-2 shadow-sm border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Write your address here"
                value={address}
                autoComplete="off"
                onChange={(ev) => setAddress(ev.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="form-group mt-2 w-82 md:w-80">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="bg-white border-2 shadow-sm border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter password"
                  value={password}
                  autoComplete="off"
                  onChange={(ev) => setPassword(ev.target.value)}
                />
              </div>
              <div className="form-group mt-2 w-82 md:w-80">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  autoComplete="off"
                  className="bg-white border-2 shadow-sm border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-2"
                  placeholder="Confirm password"
                  value={passwordConfirmation}
                  onChange={(ev) => setPasswordConfirmation(ev.target.value)}
                />
              </div>
            </div>

            {error.password && (
              <div
                className="flex p-2 mt-4 text-sm text-red-600 rounded-lg bg-red-50"
                role="alert"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 inline w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Danger</span>
                <div className="w-full">
                  <span className="font-medium">
                    Ensure that these requirements are met:
                  </span>
                  <ul className="mt-1.5 ml-4 list-disc list-inside">
                    {error.name && (
                      <li dangerouslySetInnerHTML={{ __html: error.name }}></li>
                    )}
                    {error.email && (
                      <li
                        dangerouslySetInnerHTML={{ __html: error.email }}
                      ></li>
                    )}
                    {error.city && (
                      <li dangerouslySetInnerHTML={{ __html: error.city }}></li>
                    )}
                    {error.address && (
                      <li
                        dangerouslySetInnerHTML={{ __html: error.address }}
                      ></li>
                    )}
                    {error.password && (
                      <li
                        dangerouslySetInnerHTML={{ __html: error.password }}
                      ></li>
                    )}
                  </ul>
                </div>
              </div>
            )}
            {error.other && (
              <div
                className="flex p-2 mt-4 text-sm text-red-600 rounded-lg bg-red-50"
                role="alert"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 inline w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Danger</span>
                <div>
                  <span className="font-medium">
                    Ensure that these requirements are met:
                  </span>
                  <ul className="mt-1.5 ml-4 list-disc list-inside">
                    {error.other && (
                      <li
                        dangerouslySetInnerHTML={{ __html: error.other }}
                      ></li>
                    )}
                  </ul>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-4 py-2.5 px-2 rounded bg-red-500 hover:scale-105 transition active:scale-100 hover:bg-red-600 text-white font-bold active:cursor-wait"
            >
              Sign Up
            </button>

            <p className="text-center mt-2 mb-3">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-red-500 hover:text-red-700 underline focus:cursor-wait"
              >
                Login
              </Link>
            </p>
            <div className="w-full flex h-full">
              <Link
                type="button"
                to="../"
                className="text-center hover:border-gray-500 hover:shadow-sm border-gray-500 bg-white transition border-2 w-full mt-2 p-2 rounded active:cursor-wait hover:bg-gray-50"
              >
                CONTINUE AS GUEST
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
