import React, { useEffect, useState } from 'react';
import SideBar from "../components/Sidebar";
import DashboardView from "../components/DashboardView";
import DashboardMain from "../components/DashboardMain";

export default function EmployeeDashboard() {
    return (
        <div className="flex ">
            <title>GFC | Dashboard</title>
            <div className="basis-[12%] h-[100%] ">
                <SideBar />
            </div>
            <div className="basis-[88%] border">
                <DashboardView />
                <DashboardMain />
            </div>
            <div></div>
        </div>
    );
}

