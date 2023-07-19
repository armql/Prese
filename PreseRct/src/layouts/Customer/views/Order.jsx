import React from "react";
import OrderMenu from "../components/OrderMenu";
import {CartProvider} from "react-use-cart";

export default function Order() {
    return(
        <div class=' bg-white backdrop-filter '>
            <title>Prese | Order</title>
            <CartProvider>
            <OrderMenu/>
            </CartProvider>
        </div>

    );
}