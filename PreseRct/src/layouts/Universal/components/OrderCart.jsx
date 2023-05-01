import React from 'react'

export default function ProductCard(item) {
    return (
        <div className="max-w-sm py-2 px-15 shadow-md bg-white backdrop-filter backdrop-blur-lg bg-opacity-97 rounded-md">
            <a href="#">
                <img className="p-8 rounded-t-lg" src={item.img} alt="product image" />
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                </a>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{item.price}EUR</span>
                    <a href="#" className="hover:text-white hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Order here <span aria-hidden="true">&rarr;</span></a>
                </div>
            </div>
        </div>
    )
}
