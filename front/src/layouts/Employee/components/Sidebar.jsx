import React from "react";
import {
    FaTachometerAlt,
    FaRegSun,
    FaChevronRight,
    FaWrench,
    FaStickyNote,
    FaRegChartBar,
    FaRegCalendarAlt,
    FaChevronLeft,
    FaBolt
} from "react-icons/fa";

export default function SideBar() {
    return (
        <div className="bg-[#F15A59] h-screen px-[20px]">
            <div className="px-[10px] py-[25px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]">
                <h1 className="text-white text-[17px] leading-[24px] font-extrabold cursor-pointer">
                    Employee panel
                </h1>
            </div>
            <div className="flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]">
                <FaTachometerAlt color="white" />
                <p className="text-white text-[14px] leading-[24px] font-bold">
                    {" "}
                    Dashboard
                </p>
            </div>
            <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
                <p className="text-white/[0.4] text-[10px] leading-[16px] font-extrabold">
                    INTERFACE
                </p>
                <div className="flex items-center justify-between gab-[10px] py-[15px] cursor-pointer">
                    <div className="flex items-center gap-[10px] ">
                        <FaRegSun color="white" />
                        <p className="text-[14px] leading-[20px] font-normal text-white">
                            Done Orders
                        </p>
                    </div>
                    <FaChevronRight color="white" />
                </div>

                <div className="flex items-center justify-between gab-[10px] py-[15px] cursor-pointer">
                    <div className="flex items-center gap-[10px]">
                        <FaRegChartBar color="white" />
                        <p className="text-[14px] leading-[20px] font-normal text-white">
                            Upcomming orders
                        </p>
                    </div>
                    <FaChevronRight color="white" />
                </div>
            </div>

            <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
                <p className="text-white/[0.4] text-[10px] leading-[16px] font-extrabold">
                    ADDONS
                </p>
                <div className="flex items-center justify-between gab-[10px] py-[15px] cursor-pointer">
                    <div className="flex items-center gap-[10px] ">
                        <FaStickyNote color="white" />
                        <p className="text-[14px] leading-[20px] font-normal text-white">
                        Salary
                        </p>
                    </div>
                    <FaChevronRight color="white" />
                </div>

                <div className="flex items-center justify-between gab-[10px] py-[15px] cursor-pointer">
                    <div className="flex items-center gap-[10px]">
                        <FaWrench color="white" />
                        <p className="text-[14px] leading-[20px] font-normal text-white">
                            Utilities
                        </p>
                    </div>
                    <FaChevronRight color="white" />
                </div>
                <div className="flex items-center gap-[10px]">
                    <FaRegCalendarAlt color="white" />
                    <p className="text-[14px] leading-[20px] font-normal text-white">
                        Calendar
                    </p>
                </div>
            </div>

        
                <div className="flex items-center justify-center pt-[15px] ">
                    <div className="h-[40px] w-[40px] bg-[#ED2B2A]/[0.5] rounded-full flex items-center justify-center cursor-pointer">
                    <FaChevronLeft color='white'/>
                    </div>
            </div>

            <div className="bg-[#ED2B2A]/[0.5] mt-[15px] flex items-center justify-center flex-col py-[15px] px-[10px] gap-[15px] rounded-[3px]">
                <FaBolt color='white'/>
                <p className="text-[12px] leading-[18px] font-normal text-white/[0.7] text-center">Lorem ipsum riam, dignissimos officia minima?</p>
                <button className="bg-[#B20600] text-white p-[5px] font-normal text-[14px] leading-[21px] flex items-center h-[30px] w-full rounded-[3px]">Upgrade to Pro!</button>
            </div>
        </div>
    );
}
