import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../axios";
import { useStateContext } from "../../../contexts/ContextProvider";

const CategoryEdit = () => {
    const { currentUser } = useStateContext();
    let { id } = useParams();
    const navigate = useNavigate();

    const [inputErrorList, setInputErrorList] = useState({});
    const [category, setCategory] = useState({
        name: '',
        user_id: '',
    });


    useEffect(() => {
        axiosClient
            .get(`category/${id}/edit`)
            .then((res) => {
                console.log(res.data);
                setCategory(res.data.category);
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
        setCategory({ ...category, [event.target.name]: event.target.value });
    };

    const updateCategory = (event) => {
        event.preventDefault();

        const data = {
            name: category.name,
            user_id: category.user_id,
        };

        axiosClient
            .put(`/category/${id}`, data)
            .then((res) => {
                alert(res.data.message);
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
            });
    };

    if (Object.keys(category).length === 0) {
        return (
            <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20">
                <h4 className="fw-bold text-center">No such Category Id Found</h4>
            </div>
        )
    }

    return (
        <div><section className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white">
                    Administrator Tools
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Edit Preview
                        </h1>
                        <form onSubmit={(event) => updateCategory(event, currentUser ? currentUser.id : '')} className="space-y-4 md:space-y-6">
                            <input type="hidden" name="user_id" value={currentUser ? currentUser.id : ''} />
                            <div>
                                <label htmlFor="preview" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preview name</label>
                                <input type="text" value={preview.name} onChange={handleInput} name="name" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required="" />
                            </div>
                            <div className="p-1">
                                <span className="text-red">{inputErrorList.name}</span>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
};

export default CategoryEdit;