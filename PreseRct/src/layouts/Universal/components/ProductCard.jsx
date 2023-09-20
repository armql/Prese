import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';

export default function ProductCard(item) {
    const { currentUser } = useStateContext();

    const handleOrderClick = () => {
        if (currentUser.role !== 'customer') {
            return <Link to="/login" />;
        } else {
            return <Navigate to="../orders" />;
            //TODO: Handle the order logic for customers here
        }
    };

    return (
        <div className="shadow-md bg-white backdrop-filter backdrop-blur-lg bg-opacity-97 rounded-md">
            <div>
                <img
                    className="p-8 rounded-t-lg"
                    src={item.preview}
                    alt="product image"
                />
            </div>
            <div className="flex flex-col px-2 py-0.5">
                <div>
                    <h5 className="text-[2rem] font-semibold tracking-tight text-gray-900 dark:text-white">
                        {item.name}
                    </h5>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {item.retail_price}EUR
                    </span>
                    <Link
                        className=""
                        to="/app/order"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 transition duration-400 hover:text-red-600 hover:translate-x-1 active:translate-x-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
