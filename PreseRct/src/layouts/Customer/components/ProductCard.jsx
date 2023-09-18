import React, { useContext, useState } from 'react';
import { CartContext } from '../../../contexts/CartContext';

export default function ProductCard(props) {
    const { cartItems, addToCart } = useContext(CartContext);

    return (
        <div
            className="bg-white shadow-md group relative overflow-hidden"
        >
            <div>
                <div className="rounded-t-lg">
                    <img
                        src={props.preview}
                        alt="product image"
                        className="rounded-t-lg transform transition-transform group-hover:scale-105"
                    />
                </div>
            </div>
            <div className="px-1.5 py-2">
                <div>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {props.name}
                    </h5>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {props.retail_price}EUR
                    </span>
                    <button
                        onClick={() => {
                            addToCart(props);
                        }}
                        className="hover:text-red-800 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-sm text-sm duration-100 px-2 py-4 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 transition"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
