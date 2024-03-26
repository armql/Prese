import React from "react";
import { Link } from "react-router-dom";
import ProductDisplaySkeleton from "../../components/core/ProductDisplayTab_skeleton";

export default function HomeValidation_skeleton() {
  return (
    <div className="bg-white backdrop-filter backdrop-blur-lg">
      <title>Prese | Authenticating</title>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex animate-pulse sm:justify-center">
          <div className="relative h-6 w-80 rounded-full bg-red-100 px-3 py-1 text-sm leading-6 text-gray-600 ring-2 ring-red-50">
            <div className="font-semibold">
              <span className="absolute inset-0" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl animate-pulse">
            <div className="h-3.5 bg-gray-500 rounded-full max-w-[640px] mb-3.5 mx-auto"></div>
            <div className="h-2.5 mx-auto bg-gray-300 rounded-full max-w-[540px]"></div>
          </h1>
          <div role="status" className="mt-3.5 space-y-2.5 animate-pulse">
            <div className="flex justify-center items-center w-full space-x-2">
              <div className="h-2.5 bg-gray-200 rounded-full w-32"></div>
              <div className="h-2.5 bg-gray-200 rounded-full w-32"></div>
              <div className="h-2.5 bg-gray-300 rounded-full w-24"></div>
              <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
            </div>
            <div className="flex justify-center items-center w-full space-x-2">
              <div className="h-2.5 bg-gray-200 rounded-full w-full"></div>
              <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
              <div className="h-2.5 bg-gray-300 rounded-full w-24"></div>
            </div>
            <div className="flex justify-center items-center w-full space-x-2 ">
              <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
              <div className="h-2.5 bg-gray-200 rounded-full w-80"></div>
              <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full space-x-2">
              <div className="h-2.5 bg-gray-200 rounded-full w-full"></div>
              <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
              <div className="h-2.5 bg-gray-300 rounded-full w-24"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <div className="rounded-md animate-pulse w-40 h-8 bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition:1s focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"></div>
            <div className="text-sm font-semibold leading-6 text-gray-900">
              <Link to="/aboutus">
                <div className="h-4 bg-gray-700 rounded-full w-40 animate-pulse"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ProductDisplaySkeleton />
      <section className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 animate-pulse md:text-5xl lg:text-6xl">
            <div className="h-5 bg-gray-500 rounded-full max-w-[640px] mb-3.5 mx-auto"></div>
          </h1>
          <div className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">
            <div role="status" className="mt-3.5 space-y-2.5 animate-pulse">
              <div className="flex justify-center items-center w-full space-x-2">
                <div className="h-2.5 bg-gray-200 rounded-full w-32"></div>
                <div className="h-2.5 bg-gray-200 rounded-full w-32"></div>
                <div className="h-2.5 bg-gray-300 rounded-full w-24"></div>
                <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
              </div>
              <div className="flex justify-center items-center w-full space-x-2">
                <div className="h-2.5 bg-gray-200 rounded-full w-full"></div>
                <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
                <div className="h-2.5 bg-gray-300 rounded-full w-24"></div>
              </div>
              <div className="flex justify-center items-center w-full space-x-2 ">
                <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
                <div className="h-2.5 bg-gray-200 rounded-full w-80"></div>
                <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
              </div>
              <div className="flex items-center w-full space-x-2">
                <div className="h-2.5 bg-gray-200 rounded-full w-full"></div>
                <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
                <div className="h-2.5 bg-gray-300 rounded-full w-24"></div>
              </div>
            </div>
          </div>
          <form className="w-full max-w-md mx-auto animate-pulse">
            <label
              htmlFor="default-email"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Email sign-up
            </label>
            <div className="relative hover:cursor-wait">
              <div className="absolute hover:cursor-wait inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <input
                type="email"
                id="default-email"
                disabled
                className="hover:cursor-wait block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-red-500 focus:border-red-500"
                placeholder="Enter your email here..."
                required
              />
              <button
                type="submit"
                disabled
                className="hover:cursor-wait text-white absolute right-2.5 bottom-2.5 bg-red-700 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
        <div className="bg-gradient-to-b from-red-50 to-transparent w-full h-full absolute top-0 left-0 z-0"></div>
      </section>
    </div>
  );
}
