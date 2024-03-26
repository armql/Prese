import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../api/axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import Swal from "sweetalert2";
import Input from "./common/Input";
import Select from "./common/Select";
import ErrorMessage from "./common/ErrorMessage";
import Button from "./common/Button";

const AshensorEdit = () => {
  const { currentUser } = useStateContext();
  let { id } = useParams();
  const navigate = useNavigate();
  const [ndertesa, setNdertesa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [inputErrorList, setInputErrorList] = useState("");
  const [ashensor, setAshensor] = useState({
    Emertimi212257839: "",
    NdertesaID: "",
    user_id: "",
  });

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

  useEffect(() => {
    axiosClient
      .get(`ashensor/${id}/edit`)
      .then((res) => {
        console.log(res.data);
        setAshensor(res.data.ashensori);
        setLoading(false);
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 404) {
            console.error(error.response.data.message);
          }
          if (error.response.status === 500) {
            console.error(error.response.data);
          }
        }
      });
  }, [id]);

  useEffect(() => {
    if (currentUser) {
      setAshensor({ ...ashensor, user_id: currentUser.id });
    }
  }, [currentUser]);

  const handleInput = (event) => {
    event.persist();

    if (event.target.name === "NdertesaID") {
      setAshensor({ ...ashensor, NdertesaID: event.target.value });
      console.log("rr");
    } else {
      setAshensor({ ...ashensor, [event.target.name]: event.target.value });
    }
  };

  const updateAshensor = (event) => {
    event.preventDefault();
    setSubmitting(true);

    const payload = { ...ashensor };

    if (payload.Emertimi212257839 === "") {
      setInputErrorList("Emertimi field is empty");
      setSubmitting(false);
      return;
    }
    if (payload.NdertesaID === "") {
      setInputErrorList("Ndertesa field is empty");
      setSubmitting(false);
      return;
    }

    axiosClient
      .put(`/ashensor/${id}`, payload)
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
          if (error.response.status === 404) {
            setInputErrorList(error.response.data.message);
          }
          if (error.response.status === 500) {
            setInputErrorList(error.response.data);
          }
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (Object.keys(ashensor).length === 0) {
    return (
      <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20">
        <h4 className="fw-bold text-center">No such ashensor found</h4>
      </div>
    );
  }

  if (submitting) {
    return <div>Submitting</div>;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <Fragment>
      <title>Prese | Ashensori Edit</title>
      <section className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-4xl font-semibold text-gray-900">
            Administrator Tools
          </div>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                Add Ashensori
              </h1>
              <form
                onSubmit={(event) =>
                  updateAshensor(event, currentUser ? currentUser.id : "")
                }
                className="space-y-6 md:space-y-8"
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
                  <ErrorMessage>
                    {inputErrorList.NdertesaID}
                    {inputErrorList}
                  </ErrorMessage>
                </Select>
                <Button type="submit">Update</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default AshensorEdit;
