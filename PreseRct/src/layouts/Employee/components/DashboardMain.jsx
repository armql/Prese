import React from "react";
import { FaRegCalendarMinus, FaEllipsisV } from "react-icons/fa";
import "../main.css";



export default function DashboardE() {
    return (
        <div className="pt-[25px] px-[25px] bg-[#F8F9FC]">
            <div className="flex items-center justify-between">
                <button className="bg-[#6dc089] h-[35px] rounded-[3px] text-white flex items-center justify-center px-[30px] cursor-pointer">
                    Accept incoming order
                </button>
            </div>
            <div className="grid grid-cols-4 gab-[50px] mt-[25px] pb-[15px]">
                <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#B70404] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                    <div>
                        <h2 className="text-[#B70404] text-[11px] leading-[17px] font-bold">
                            Orders (MONTHLY)
                        </h2>
                        <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                            30,000
                        </h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} color="" />
                </div>
                <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#B70404] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                    <div>
                        <h2 className="text-[#B70404] text-[11px] leading-[17px] font-bold">
                            EARNINGS (ANNUAL)
                        </h2>
                        <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                            $240,000
                        </h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} color="" />
                </div>
                <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#B70404] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                    <div>
                        <h2 className="text-[#B70404] text-[11px] leading-[17px] font-bold">
                            PENDING Orders
                        </h2>
                        <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                            $40,000
                        </h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} color="" />
                </div>
                <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#B70404] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
                    <div>
                        <h2 className="text-[#B70404] text-[11px] leading-[17px] font-bold">
                            Cancelled Orders
                        </h2>
                        <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                            $40,000
                        </h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} color="" />
                </div>
            </div>


            <div class="card">
                <div class="container">
                    <img src="https://images.ctfassets.net/h7j9u4fil4a3/2MAr1IgaU4lkXasDbj7jIK/8555f814361829187eb1a694f369e04e/Bucket_ExtraCrispy_Laying.png?w=520&h=278&q=50&fm=png" alt="" />
               
                    <h4><b>#order #number</b></h4> 
                    <p>Description of the order</p> 
                    <p>the adress</p>
                    <p>telephone number</p>
                    <button className="bg-[#d61f1f] h-[35px] rounded-[10px] text-white flex items-center justify-center px-[30px] cursor-pointer">
                    Send to driver
                </button>
                    
                </div>
            </div>

            <div class="card">
                <div class="container">
                    <img src="https://images.ctfassets.net/h7j9u4fil4a3/2MAr1IgaU4lkXasDbj7jIK/8555f814361829187eb1a694f369e04e/Bucket_ExtraCrispy_Laying.png?w=520&h=278&q=50&fm=png" alt="" />
                    
                    <h4><b>#order #number</b></h4> 
                    <p>Description of the order</p> 
                    <p>the adress</p>
                    <p>telephone number</p>
                    <button className="bg-[#d61f1f] h-[35px] rounded-[10px] text-white flex items-center justify-center px-[30px] cursor-pointer ">
                   Send to driver
                </button>
                </div>
            </div>  


            <div class="card">
                <div class="container">
                    <img src="https://images.ctfassets.net/h7j9u4fil4a3/2MAr1IgaU4lkXasDbj7jIK/8555f814361829187eb1a694f369e04e/Bucket_ExtraCrispy_Laying.png?w=520&h=278&q=50&fm=png" alt="" />
                 
                    <h4><b>#order #number</b></h4> 
                    <p>Description of the order</p> 
                    <p>the adress</p>
                    <p>telephone number</p>
                    <button className="bg-[#d61f1f] h-[35px] rounded-[10px] text-white flex items-center justify-center px-[30px] cursor-pointer">
                  Send to driver
                </button>
                </div>
            </div>  


           
           

          
        </div>
    );
}
