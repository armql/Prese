import { useState, useEffect, Fragment } from "react";
import axiosClient from "../../../api/axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Input from "./common/Input";
import ErrorMessage from "./common/ErrorMessage";
import Button from "./common/Button";

export default function NdertesaRegister() {
  const { currentUser } = useStateContext();
  const navigate = useNavigate();
  const [inputErrorList, setInputErrorList] = useState({});
  const [ndertesa, setNdertesa] = useState({
    Emri212257839: "",
    DataPT: "",
    user_id: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setNdertesa({ ...ndertesa, user_id: currentUser.id });
    }
  }, [currentUser]);

  const handleInput = (event) => {
    event.persist();
    setNdertesa({ ...ndertesa, [event.target.name]: event.target.value });
  };

  const addNdertesa = (event) => {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("Emri212257839", ndertesa.Emri212257839);
    formData.append("DataPT", ndertesa.DataPT);
    formData.append("user_id", ndertesa.user_id);

    axiosClient
      .post(`ndertesa`, formData)
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: res.data.message,
        }).then(() => {
          navigate("../ndertesalist");
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

  if (submitting) {
    return <div>Loading</div>;
  }

  return (
    <Fragment>
      <title>Prese | Ndertesa Register</title>
      <section className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-4xl font-semibold text-gray-900">
            Administrator Tools
          </div>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Add Ndertesa
              </h1>
              <form
                onSubmit={(event) =>
                  addNdertesa(event, currentUser ? currentUser.id : "")
                }
                className="space-y-6 md:space-y-12"
              >
                <input
                  type="hidden"
                  name="user_id"
                  value={currentUser ? currentUser.id : ""}
                />
                <Input
                  htmlFor="Emri212257839"
                  labelName="Ndertesa name"
                  type="text"
                  value={ndertesa.Emri212257839}
                  onChange={handleInput}
                  name="Emri212257839"
                  id="Emri212257839"
                >
                  <ErrorMessage>{inputErrorList.Emri212257839}</ErrorMessage>
                </Input>
                <Input
                  htmlFor="DataPT"
                  labelName="Fill DataPT"
                  type="date"
                  value={ndertesa.DataPT}
                  onChange={handleInput}
                  name="DataPT"
                  id="DataPT"
                >
                  <ErrorMessage>{inputErrorList.DataPT}</ErrorMessage>
                </Input>
                <Button type="submit">Create</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
