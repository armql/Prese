import React, { useEffect, useState } from "react";
import ManageOrderTable from "../components/ManageOrderTable";
import ManageOrderSkeleton from "./core/MOValidation_skeleton";
import axiosClient from "../../../api/axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function ManageOrder() {
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
        if (data.role === "manager") {
          navigate("../../management");
        } else if (data.role === "customer") {
          navigate("../../app");
        } else if (data.role === "driver") {
          navigate("../../workdrive");
        }
        setValidatingUser(false);
      })
      .catch(() => {
        setValidatingUser(false);
      });
  }, [navigate, setCurrentUser]);

  if (validatingUser) {
    return <ManageOrderSkeleton />;
  }

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <title>Prese | Manage Order</title>
      <ManageOrderTable />
    </div>
  );
}
