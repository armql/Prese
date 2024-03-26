import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../api/axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import Swal from "sweetalert2";
import Input from "./common/Input";
import ErrorMessage from "./common/ErrorMessage";
import Button from "./common/Button";

const NdertesaEdit = () => {
  const { currentUser } = useStateContext();
  let { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});
  const [ndertesa, setNdertesa] = useState({
    Emri212257839: "",
    DataPT: "",
    user_id: "",
  });

  useEffect(() => {
    axiosClient
      .get(`ndertesa/${id}/edit`)
      .then((res) => {
        setNdertesa(res.data.ndertesa);
        setLoading(false);
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 404) {
            alert(error.response.data.message);
          }
          if (error.response.status === 500) {
            alert(error.response.data);
          }
        }
      });
  }, [id]);

  const handleInput = (event) => {
    event.persist();
    const { name, value } = event.target;

    const newValue =
      name === "DataPT" ? new Date(value).toISOString().split("T")[0] : value;

    setNdertesa((prevNdertesa) => ({
      ...prevNdertesa,
      [name]: newValue,
    }));
  };

  const updateNdertesa = (event) => {
    event.preventDefault();
    setSubmitting(true);
    const data = {
      Emri212257839: ndertesa.Emri212257839,
      DataPT: ndertesa.DataPT,
      user_id: ndertesa.user_id,
    };

    axiosClient
      .put(`/ndertesa/${id}`, data)
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
          if (error.response.status === 404) {
            alert(error.response.data.message);
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

  if (Object.keys(ndertesa).length === 0) {
    return (
      <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20">
        <h4 className="fw-bold text-center">No such Ndertesa Id Found</h4>
      </div>
    );
  }

  if (submitting) {
    return <div>submitting</div>;
  }

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <Fragment>
      <title>Prese | Ndertesa Edit</title>
      <section className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-4xl font-semibold text-gray-900">
            Administrator Tools
          </div>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Edit Ndertesa
              </h1>
              <form
                onSubmit={(event) =>
                  updateNdertesa(event, currentUser ? currentUser.id : "")
                }
                className="space-y-4 md:space-y-6"
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
                  value={
                    ndertesa.DataPT
                      ? new Date(ndertesa.DataPT).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleInput}
                  name="DataPT"
                  id="DataPT"
                >
                  <ErrorMessage>{inputErrorList.DataPT}</ErrorMessage>
                </Input>
                <Button type="submit">Update</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default NdertesaEdit;
