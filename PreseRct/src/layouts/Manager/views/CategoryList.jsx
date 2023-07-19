import React, { useEffect, useState } from "react";
import CategoryTable from "../components/CategoryTable";
import { Link, useNavigate } from "react-router-dom";
import ManagerValidationSkeleton from "./core/ManagerValidation_skeleton";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../api/axios";

export default function CategoryList() {
    const { setCurrentUser, userToken } = useStateContext();
    const [validatingUser, setValidatingUser] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userToken) {
            navigate("../../");
            return;
        }

        axiosClient
            .get("/me")
            .then(({ data }) => {
                setCurrentUser(data);
                if (data.role === 'customer') {
                    navigate('../../app')
                }else if (data.role === 'driver') {
                    navigate('../../workdrive')
                }else if (data.role === 'employee') {
                    navigate('../../workspace')
                }
                setValidatingUser(false);
            })
            .catch(() => {
                setValidatingUser(false);
            });
    }, [navigate, setCurrentUser]);

    if (validatingUser) {
        return <ManagerValidationSkeleton />;
    }

    

    return (
        <div id="parent">
            <title>GFC | Category List</title>
            <div className="flex justify-between p-1 bg-white">
                <div className="p-2">
                    <Link
                        to="../categoryregister"
                        className="text-black font-bold gap-1 rounded-3xl"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 hover:scale-110"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </Link>
                </div>
               
            </div>
            <CategoryTable />
        </div>
    );
}
