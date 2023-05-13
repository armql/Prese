import React, { useState, useEffect } from 'react';
import axiosClient from '../../../axios';
import { useStateContext } from '../../../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ProductRegister() {
  const navigate = useNavigate();
  const { currentUser } = useStateContext();
  const [inputErrorList, setInputErrorList] = useState({});
  const [product, setProduct] = useState({
    preview: '',
    name: '',
    description: '',
    category_id: '',
    retail_price: '',
    market_price: '',
    user_id: '',
  });
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setProduct({ ...product, user_id: currentUser.id });
    }
  }, [currentUser]);

  useEffect(() => {
    axiosClient.get('namecat').then((res) => {
      if (Array.isArray(res.data.categories)) {
        setCategory(res.data.categories);
      } else {
        console.error('Invalid response format');
      }
    }).catch((error) => {
      console.error('Failed to fetch categories', error);
    });
  }, []);

  const handleInput = (event) => {
    event.persist();
    if (event.target.name === 'preview') {
      setProduct({ ...product, preview: URL.createObjectURL(event.target.files[0]) });
    } else if (event.target.name === 'category_id') {
      setProduct({ ...product, category_id: event.target.value });
    } else {
      setProduct({ ...product, [event.target.name]: event.target.value });
    }
  };


  const addProduct = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('preview', product.preview);
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('category_id', product.category_id);
    formData.append('retail_price', product.retail_price);
    formData.append('market_price', product.market_price);
    formData.append('user_id', product.user_id);

    axiosClient
      .post(`product`, formData)
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: res.data.message,
        }).then(
          () => {
            navigate('../productlist')
          }
        );
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
      });
  };

  return (
    <div><section className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 p-20">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white">
          Administrator Tools
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center dark:text-white">
              Add Product
            </h1>
            <form onSubmit={(event) => addProduct(event, currentUser ? currentUser.id : '')} className="space-y-4 md:space-y-6">
              <input type="hidden" name="user_id" value={currentUser ? currentUser.id : ''} />
              <div>
                <label htmlFor="preview" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product preview</label>
                <input type="file" onChange={handleInput} name="preview" id="preview" className="bg-gray-50 border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required="" />
              </div>
              <span className="text-red">{inputErrorList.preview}</span>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product name</label>
                <input type="text" value={product.name} onChange={handleInput} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Product name" required="" />
              </div>
              <span className="text-red">{inputErrorList.name}</span>
              <div className="form-group  mb-2">
                <label htmlFor="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Preview Description
                </label>
                <textarea
                  name="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  placeholder="Product Description"
                  value={product.description}
                  onChange={handleInput}
                ></textarea>
                <span className="text-danger mt-5">{inputErrorList.description}</span>
              </div>
              <div>
                <label htmlFor="category_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product category</label>
                <select
                  onChange={handleInput}
                  name="category_id"
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  required
                >
                  <option value="" disabled selected>
                    Choose a category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-red">{inputErrorList.category}</span>
              <div>
                <label htmlFor="retail_price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Retail Price</label>
                <input type="number" value={product.retail_price} onChange={handleInput} name="retail_price" id="retail_price" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Market Price" required="" />
              </div>
              <span className="text-red">{inputErrorList.retail_price}</span>
              <div>
                <label htmlFor="market_price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Market Price</label>
                <input type="number" value={product.market_price} onChange={handleInput} name="market_price" id="market_price" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Retail Price" required="" />
              </div>
              <div className="p-1">
                <span className="text-red">{inputErrorList.market_price}</span>
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create</button>
            </form>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}