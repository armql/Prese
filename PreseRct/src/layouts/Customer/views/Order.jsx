import React from "react";
import OrderMenu from "../components/OrderMenu";
export default function Order() {


  return (
    <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-40">
      <title>Prese | Order</title>
      <h1 className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-95 text-gray-900 font-semibold text-xl p-2.5">View all products</h1>
      <OrderMenu />
    </div>
  );
}