import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../api/axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import Swal from "sweetalert2";
import Textarea from "./common/Textarea";
import Input from "./common/Input";
import Select from "./common/Select";
import ErrorMessage from "./common/ErrorMessage";
import Button from "./common/Button";
import File from "./common/File";
import ProductEditLoadingSkeleton from "./Product/ProductEdit_load_skeleton";
import ProductEditSubmitSkeleton from "./Product/ProductEdit_submit_skeleton";

const ProductEdit = () => {
  const { currentUser } = useStateContext();
  let { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [inputErrorList, setInputErrorList] = useState("");
  const [product, setProduct] = useState({
    preview: "",
    preview_url: "",
    name: "",
    description: "",
    category_id: "",
    retail_price: "",
    market_price: "",
    user_id: "",
  });

  useEffect(() => {
    axiosClient
      .get("namecat")
      .then((res) => {
        if (Array.isArray(res.data.categories)) {
          setCategories(res.data.categories);
        } else {
          console.error("Invalid response format");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch categories", error);
      });
  }, []);

  useEffect(() => {
    axiosClient
      .get(`product/${id}/edit`)
      .then((res) => {
        setProduct(res.data.product);
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

  useEffect(() => {
    if (currentUser) {
      setProduct({ ...product, user_id: currentUser.id });
    }
  }, [currentUser]);

  const handleInput = (event) => {
    event.persist();
    if (event.target.name === "preview") {
      onImageChoose(event);
    } else if (event.target.name === "category_id") {
      setProduct({ ...product, category_id: event.target.value });
    } else {
      setProduct({ ...product, [event.target.name]: event.target.value });
    }
  };

  const updateProduct = (event) => {
    event.preventDefault();
    setSubmitting(true);
    // const fieldsToCheck = [
    //   "category_id",
    //   "preview",
    //   "preview_url",
    //   "name",
    //   "description",
    //   "retail_price",
    //   "market_price",
    // ];

    const payload = { ...product };

    // for (const field of fieldsToCheck) {
    //   if (payload[field] === "") {
    //     setInputErrorList((prev) => ({
    //       ...prev,
    //       [field]: `Fill ${field}, field is empty`,
    //     }));
    //     setSubmitting(false);
    //     return;
    //   }
    // }

    if (payload.preview) {
      payload.preview = payload.preview_url;
    }
    delete payload.preview_url;

    axiosClient
      .put(`/product/${id}`, payload)
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: res.data.message,
        }).then(() => {
          navigate("../productlist");
        });
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 422) {
            setInputErrorList(error.response.data.errors);
          }
          if (error.response.status === 404) {
            setInputErrorList({ simple: error.response.data.message });
          }
          if (error.response.status === 500) {
            setInputErrorList({ other: error.response.data });
          }
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const onImageChoose = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setProduct({
        ...product,
        preview: file,
        preview_url: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  if (Object.keys(product).length === 0) {
    return (
      <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20">
        <h4 className="fw-bold text-center">No such product found</h4>
      </div>
    );
  }

  if (submitting) {
    return <ProductEditSubmitSkeleton />;
  }

  if (loading) {
    return <ProductEditLoadingSkeleton />;
  }

  return (
    <Fragment>
      <title>Prese | Product Edit</title>
      <section className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-4xl font-semibold text-gray-900">
            Administrator Tools
          </div>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                Add Product
              </h1>
              <form
                onSubmit={(event) =>
                  updateProduct(event, currentUser ? currentUser.id : "")
                }
                className="space-y-6 md:space-y-8"
              >
                <input
                  type="hidden"
                  name="user_id"
                  value={currentUser ? currentUser.id : ""}
                />
                <File
                  htmlFor="preview"
                  labelName={"Product Image"}
                  type="file"
                  onChange={onImageChoose}
                  name="preview"
                  id="preview"
                >
                  <ErrorMessage>{inputErrorList.preview}</ErrorMessage>
                </File>
                <Input
                  htmlFor="name"
                  labelName="Product Name"
                  type="text"
                  value={product.name}
                  onChange={handleInput}
                  name="name"
                  id="name"
                  placeholder="Product Name"
                >
                  <ErrorMessage>{inputErrorList.name}</ErrorMessage>
                </Input>
                <Textarea
                  htmlFor="description"
                  labelName="Product Description"
                  name="description"
                  value={product.description}
                  onChange={handleInput}
                >
                  <ErrorMessage>{inputErrorList.description}</ErrorMessage>
                </Textarea>
                <Select
                  labelName="Product Category"
                  htmlFor="category_id"
                  optionName={
                    categories.id === product.category_id
                      ? categories.name
                      : "Choose an category"
                  }
                  raw_data={categories}
                  onChange={handleInput}
                  name="category_id"
                  id="category"
                >
                  <ErrorMessage>
                    {inputErrorList.category_id}
                    {inputErrorList.simple}
                  </ErrorMessage>
                </Select>

                <Input
                  htmlFor="retail_price"
                  labelName="Retail Price"
                  type="number"
                  value={product.retail_price}
                  onChange={handleInput}
                  name="retail_price"
                  id="retail_price"
                >
                  <ErrorMessage>{inputErrorList.retail_price}</ErrorMessage>
                </Input>
                <Input
                  htmlFor="market_price"
                  labelName="Market Price"
                  type="number"
                  value={product.market_price}
                  onChange={handleInput}
                  name="market_price"
                  id="market_price"
                >
                  <ErrorMessage>
                    {inputErrorList.market_price}
                    {inputErrorList.other}
                  </ErrorMessage>
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

export default ProductEdit;
