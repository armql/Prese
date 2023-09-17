import React, { useState } from "react";
import { Link } from "react-router-dom";
import Productsbg from "../components/Productsbg";
import { CartProvider } from "react-use-cart";

export default function Order() {


  return (
    <CartProvider>
      <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-40">
        <title>Prese | Order</title>
        <h1 className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-95 text-gray-900 font-medium p-2.5">View all products</h1>
        <Productsbg />
      </div>
    </CartProvider>
  );
}
