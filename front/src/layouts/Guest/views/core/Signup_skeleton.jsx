import React from "react";
import { Link } from "react-router-dom";

export default function Signup_skeleton() {
  return (
    <div className="bg-black backdrop-filter backdrop-blur-xl bg-opacity-50">
      <div className="flex items-center justify-center">
        <title>Prese | Signing up</title>

        <div className="bg-white backdrop-blur-sm bg-opacity-90 px-20 py-16 shadow-sm rounded-sm m-10">
          <h2 className="mb-3 text-center font-bold text-4xl">Sign up</h2>
          <form>
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
                  className="bg-white border-2 shadow-sm border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 opacity-50"
                  placeholder="Enter username"
                  disabled
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
                  className="bg-white border-2 shadow-sm border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 opacity-50"
                  placeholder="Enter email"
                  disabled
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
                className="bg-white border-2 shadow-sm border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 opacity-50"
                name="city"
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
                className="bg-white border-2 shadow-sm border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 opacity-50"
                placeholder="Write your address here"
                disabled
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
                  className="bg-white border-2 shadow-sm border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 opacity-50"
                  placeholder="Enter password"
                  disabled
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
                  className="bg-white border-2 shadow-sm border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 opacity-50"
                  placeholder="Confirm password"
                  disabled
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-4 p-2 rounded bg-red-500 hover:scale-105 transition active:scale-100 hover:bg-red-600 text-white font-bold active:cursor-wait"
            >
              Signing up
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
            <Link
              type="button"
              to="../"
              className="text-center hover:border-gray-500 hover:shadow-sm border-transparent transition border-2 w-full mt-2 p-2 rounded active:cursor-wait hover:bg-gray-50"
            >
              CONTINUE AS GUEST
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
