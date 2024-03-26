import { useState, useEffect } from "react";
import axiosClient from "../../../api/axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Input from "./common/Input";
import Button from "./common/Button";
import ErrorMessage from "./common/ErrorMessage";
import Select from "./common/Select";

export default function AshensoriRegister() {
  const navigate = useNavigate();
  const { currentUser } = useStateContext();
  const [inputErrorList, setInputErrorList] = useState({});
  const [ashensor, setAshensori] = useState({
    Emertimi212257839: "",
    NdertesaID: "",
    user_id: "",
  });
  const [ndertesa, setNdertesa] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setAshensori({ ...ashensor, user_id: currentUser.id });
    }
  }, [currentUser]);

  useEffect(() => {
    axiosClient
      .get("namendertesa")
      .then((res) => {
        if (Array.isArray(res.data.ndertesat)) {
          setNdertesa(res.data.ndertesat);
        } else {
          console.error("Invalid response format");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch ndertesat", error);
      });
  }, []);

  // handler
  const handleInput = (event) => {
    event.persist();
    if (event.target.name === "NdertesaID") {
      setAshensori({ ...ashensor, NdertesaID: event.target.value });
      console.log("rr");
    } else {
      setAshensori({ ...ashensor, [event.target.name]: event.target.value });
    }
  };

  // adding product
  const addProduct = (event) => {
    event.preventDefault();
    setSubmitting(true);

    const payload = { ...ashensor };

    axiosClient
      .post("/ashensor", payload)
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: res.data.message,
        }).then(() => {
          navigate("../ashensorilist");
        });
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 422) {
            setInputErrorList(error.response.data.errors);
          }
          if (error.response.status === 500) {
            alert(error.response.data);
          }
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  console.log(ashensor);

  if (submitting) {
    return <div>Submitting</div>;
  }

  return (
    <div>
      <section className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 p-20">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-4xl font-semibold text-gray-900">
            Administrator Tools
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                Add Ashensor
              </h1>
              <form
                onSubmit={(event) =>
                  addProduct(event, currentUser ? currentUser.id : "")
                }
                className="space-y-4 md:space-y-6 flex gap-4 flex-col"
              >
                <input
                  type="hidden"
                  name="user_id"
                  value={currentUser ? currentUser.id : ""}
                />
                <Input
                  htmlFor="Emertimi212257839"
                  labelName="Ashensori Emri"
                  type="text"
                  value={ashensor.Emertimi212257839}
                  onChange={handleInput}
                  name="Emertimi212257839"
                  id="Emertimi212257839"
                >
                  <ErrorMessage>
                    {inputErrorList.Emertimi212257839}
                  </ErrorMessage>
                </Input>
                <Select
                  labelName="Ashensori ndertesa"
                  htmlFor="NdertesaID"
                  optionName="Choose a ndertesa"
                  raw_data={ndertesa}
                  onChange={handleInput}
                  name="NdertesaID"
                  id="NdertesaID"
                >
                  <ErrorMessage>{inputErrorList.NdertesaID}</ErrorMessage>
                </Select>

                <Button type="submit">Create</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
