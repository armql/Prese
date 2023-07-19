import React from 'react'
import { Link } from 'react-router-dom'
import ProductDisplaySkeleton from '../../components/core/ProductDisplayTab_skeleton'

export default function HomeValidation_skeleton() {
    return (
        <div className='bg-white backdrop-filter backdrop-blur-lg bg-opacity-20'>
            <title>GFC | Authenticating</title>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="hidden sm:mb-8 sm:flex animate-pulse sm:justify-center">
                    <div className="relative h-6 w-80 rounded-full bg-red-100 px-3 py-1 text-sm leading-6 text-gray-600 ring-2 ring-red-50 hover:ring-red-400 ">
                        <a href="#" className="font-semibold">
                            <span className="absolute inset-0" aria-hidden="true" />
                        </a>
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl animate-pulse">
                        <div class="h-3.5 bg-gray-500 rounded-full dark:bg-gray-700 max-w-[640px] mb-3.5 mx-auto"></div>
                        <div class="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
                    </h1>
                    <div role="status" class="mt-3.5 space-y-2.5 animate-pulse">
                        <div class="flex justify-center items-center w-full space-x-2">
                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <div class="flex justify-center items-center w-full space-x-2">
                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                        </div>
                        <div class="flex justify-center items-center w-full space-x-2 ">
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2">
                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                        </div>
                        <span class="sr-only">Loading...</span>
                    </div>

                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="#"
                            className="rounded-md animate-pulse w-40 h-8 bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-800 transition:1s focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        </a>
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                            <Link to='/aboutus' ><div class="h-4 bg-gray-700 rounded-full dark:bg-gray-600 w-40 animate-pulse"></div></Link>
                        </a>
                    </div>
                </div>
            </div>
            <ProductDisplaySkeleton />
            <section className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 animate-pulse md:text-5xl lg:text-6xl dark:text-white"><div class="h-5 bg-gray-500 rounded-full dark:bg-gray-700 max-w-[640px] mb-3.5 mx-auto"></div></h1>
                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200"><div role="status" class="mt-3.5 space-y-2.5 animate-pulse">
                        <div class="flex justify-center items-center w-full space-x-2">
                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <div class="flex justify-center items-center w-full space-x-2">
                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                        </div>
                        <div class="flex justify-center items-center w-full space-x-2 ">
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <div class="flex items-center w-full space-x-2">
                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                        </div>
                    </div></p>
                    <form className="w-full max-w-md mx-auto animate-pulse">
                        <label for="default-email" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Email sign-up</label>
                        <div className="relative hover:cursor-wait">
                            <div className="absolute hover:cursor-wait inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                </svg>
                            </div>
                            <input type="email" id="default-email" disabled className="hover:cursor-wait block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Enter your email here..." required />
                            <button type="submit" disabled className="hover:cursor-wait text-white absolute right-2.5 bottom-2.5 bg-red-700 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Subscribe</button>
                        </div>
                    </form>
                </div>
                <div className="bg-gradient-to-b from-red-50 to-transparent dark:from-red-900 w-full h-full absolute top-0 left-0 z-0"></div>
            </section>
        </div>
    )
}
