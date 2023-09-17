import React from 'react'
import { useCart } from "react-use-cart";

export default function ProductCard(props) {

    const { addItem } = useCart();
    console.log(addItem)

    return (
        <div className="bg-white max-w-sm py-2 px-15 shadow-md rounded-md">
            <a href="#">
                <img className="p-8 rounded-t-lg" src={props.preview} alt="product image" />
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{props.name}</h5>
                </a>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{props.retail_price}EUR</span>
                    <a href="#"
                        onChange={() => addItem(props.item.id)}
                        className="hover:text-white hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Add to Cart</a>
                </div>
            </div>
        </div>
    )
}
