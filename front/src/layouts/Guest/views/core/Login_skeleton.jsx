import React from "react";
import { Link } from "react-router-dom";

export default function Login_skeleton() {
  return (
    <div className="bg-black backdrop-filter backdrop-blur-xl bg-opacity-50">
      <div className="flex items-center justify-center">
        <title>Prese | Logging in</title>

        <div className="bg-white backdrop-blur-sm bg-opacity-90 px-20 py-16 shadow-sm rounded-sm m-10">
          <h2 className="mb-3 text-center font-bold text-4xl">Login</h2>
          <form className="w-96">
            <div className="form-group mt-2">
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
            <div className="form-group mt-2">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="bg-white border-2 shadow-sm border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 opacity-50"
                placeholder="Enter password"
                disabled
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 p-2 rounded bg-red-500 hover:scale-105 transition active:scale-100 hover:bg-red-600 text-white font-bold cursor-wait opacity-50"
              disabled
            >
              Logging in
            </button>

            <p className="text-center mt-2 mb-3">
              Don't have an account yet?{" "}
              <Link
                to="/signup"
                className="text-red-500 hover:text-red-700 underline focus:cursor-wait"
              >
                Sign up
              </Link>
            </p>

            <Link
              type="button"
              to="../"
              className="btn text-center hover:border-gray-500 hover:shadow-sm border-transparent transition border-2 w-full mt-2 p-2 rounded cursor-wait"
              disabled
            >
              CONTINUE AS GUEST
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
