import { useState, useEffect } from "react";
import axiosClient from "../../../api/axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Input from "./common/Input";
import Button from "./common/Button";
import ErrorMessage from "./common/ErrorMessage";
import Select from "./common/Select";
import Textarea from "./common/Textarea";
import File from "./common/File";
import ProductRegisterSubmitSkeleton from "./Product/ProductRegister_submit_skeleton";

export default function ProductRegister() {
  const navigate = useNavigate();
  const { currentUser } = useStateContext();
  const [inputErrorList, setInputErrorList] = useState({});
  const [product, setProduct] = useState({
    preview: null,
    preview_url: null,
    name: "",
    description: "",
    category_id: "",
    retail_price: "",
    market_price: "",
    user_id: "",
  });
  const [categories, setCategory] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setProduct({ ...product, user_id: currentUser.id });
    }
  }, [currentUser]);

  // get categories
  useEffect(() => {
    axiosClient
      .get("namecat")
      .then((res) => {
        if (Array.isArray(res.data.categories)) {
          setCategory(res.data.categories);
        } else {
          console.error("Invalid response format");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch categories", error);
      });
  }, []);

  // handler
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

  // adding product
  const addProduct = (event) => {
    event.preventDefault();
    setSubmitting(true);

    const payload = { ...product };
    if (payload.preview) {
      payload.preview = payload.preview_url;
    }
    delete payload.preview_url;

    axiosClient
      .post("/product", payload)
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
    return (
      <ProductRegisterSubmitSkeleton
        product={product}
        categories={categories}
      />
    );
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
                Add Product
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
                  optionName="Choose a category"
                  raw_data={categories}
                  onChange={handleInput}
                  name="category_id"
                  id="category"
                >
                  <ErrorMessage>{inputErrorList.category_id}</ErrorMessage>
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
                  <ErrorMessage>{inputErrorList.market_price}</ErrorMessage>
                </Input>
                <Button type="submit">Create</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
