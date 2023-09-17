import React from 'react'

export default function ProductCard(item) {
    return (
        <div key={item.id} className="animate-pulse max-w-sm py-2 px-15 shadow-md bg-white backdrop-filter backdrop-blur-lg bg-opacity-97 rounded-md">
            <div className='flex items-center justify-center w-full'>
                <div class="flex items-center justify-center w-80 h-80 bg-red-100 rounded dark:bg-gray-700">
                    <svg class="w-8 h-12 text-gray-500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                </div>
            </div>
            <div className="px-5 pb-5">
                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mt-4"></div>
                <div className="flex items-center justify-between">
                    <div class="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-40 "></div>
                    <a href="#" className="hover:text-white hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Order here <span aria-hidden="true">&rarr;</span></a>
                </div>
            </div>
        </div>
    )
}
