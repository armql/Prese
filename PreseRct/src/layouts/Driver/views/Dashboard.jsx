import React from "react";
import DriverOrder from "../components/DriverOrder";

export default function Dashboard() {


    return (
        <div className="relative overflow-x-auto bg-white rounded-md shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-20">
            <DriverOrder />
        </div>
    );
}