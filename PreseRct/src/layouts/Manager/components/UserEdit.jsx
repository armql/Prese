import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../api/axios";
import Swal from 'sweetalert2';

const UserEdit = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [inputErrorList, setInputErrorList] = useState({});
    const [user, setUser] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        role: '',
        password: '',
        passwordConfirmation: '',
    });

    useEffect(() => {
        axiosClient
            .get(`user/${id}/edit`)
            .then((res) => {
                console.log(res.data);
                setUser(res.data.user);
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
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const editUser = (event) => {
        event.preventDefault();
        setSubmitting(true);

        const data = {
            name: user.name,
            email: user.email,
            address: user.address,
            city: user.city,
            role: user.role,
            password: user.password,
            password_confirmation: user.passwordConfirmation,
        };

        axiosClient
            .put(`/user/${id}`, data)
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    text: res.data.message,
                }).then(
                    () => {
                        navigate('../userlist')
                    }
                );
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

    if (Object.keys(user).length === 0) {
        return (
            <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20">
                <h4 className="fw-bold text-center">No such Category Id Found</h4>
            </div>
        )
    }


    if (submitting) {
        return (
            <div><section className="bg-white p-40 backdrop-filter backdrop-blur-lg bg-opacity-20">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 opacity-80">
                    <a href="#" className="flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white">
                        Administrator Tools
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Add User
                            </h1>
                            <form onSubmit={(event) => editUser(event)} className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User name</label>
                                    <input type="text" value={user.name} onChange={handleInput} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Name" required="" />
                                    <div className="mt-1">
                                        <span className="text-red-500">{inputErrorList.name}</span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="text" value={user.email} onChange={handleInput} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Email" required="" />
                                    <div className="mt-1">
                                        <span className="text-red-500">{inputErrorList.email}</span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                    <input type="text" value={user.address} onChange={handleInput} name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Address" required="" />
                                    <div className="mt-1">
                                        <span className="text-red-500">{inputErrorList.address}</span>
                                    </div>
                                </div>
                                <div className="form-group mt-2">
                                    <label
                                        htmlFor="city"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        City
                                    </label>
                                    <select
                                        id="disabledSelect"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                        name="city"
                                        value={user.city}
                                        onChange={handleInput}
                                    >
                                        <option disabled value="">
                                            Select your city
                                        </option>
                                        <option value="Gjilan">Gjilan</option>
                                        <option value="Prishtina">Prishtina</option>
                                        <option value="Mitrovica">Mitrovica</option>
                                        <option value="Peja">Peja</option>
                                        <option value="Ferizaj">Ferizaj</option>
                                    </select>
                                    <div className="mt-1">
                                        <span className="text-red-500">{inputErrorList.city}</span>
                                    </div>
                                </div>
                                <div className="form-group mt-2">
                                    <label
                                        htmlFor="role"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Role
                                    </label>
                                    <select
                                        id="disabledSelect"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                        name="role"
                                        value={user.role}
                                        onChange={handleInput}
                                    >
                                        <option disabled value="">
                                            Select role for user
                                        </option>
                                        <option value="customer">Customer</option>
                                        <option value="employee">Employee</option>
                                        <option value="driver">Driver</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                    <div className="mt-1">
                                        <span className="text-red-500">{inputErrorList.role}</span>
                                    </div>
                                </div>
                                <div className="form-group mt-2">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium dark:text-white">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                        placeholder="Enter password"
                                        value={user.password}
                                        onChange={handleInput}
                                    />
                                    <div className="mt-1">
                                        <span className="text-red-500">{inputErrorList.password}</span>
                                    </div>
                                </div>
                                <div className="form-group mt-2">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium dark:text-white">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="passwordConfirmation"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                        placeholder="Enter password"
                                        value={user.passwordConfirmation}
                                        onChange={handleInput}
                                    />
                                    <div className="mt-1">
                                        <span className="text-red-500">{inputErrorList.password}</span>
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div role="status" class="opacity-100 absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                    <svg aria-hidden="true" class="opacity-100 w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                    <span class="sr-only">Loading...</span>
                </div>
            </section>
            </div>
        );
    }

    if (loading) {
        return (
            <div><section className="bg-white p-40 backdrop-filter backdrop-blur-lg bg-opacity-20">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 opacity-80">
                    <a href="#" className="flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white">
                        Administrator Tools
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Add User
                            </h1>
                            <form onSubmit={(event) => editUser(event)} className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User name</label>
                                    <input type="text" value={user.name} onChange={handleInput} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Name" required="" />
                                    <div className="mt-1">
                                        <span className="text-red-500">{inputErrorList.name}</span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="text" value={user.email} onChange={handleInput} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Email" required="" />
                                    <div className="mt-1">
                                        <span className="text-red-500">{inputErrorList.email}</span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                    <input type="text" value={user.address} onChange={handleInput} name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Address" required="" />
                                    <div className="mt-1">
                                        <span className="text-red-500">{inputErrorList.address}</span>
                                    </div>
                                </div>
                                <div className="form-group mt-2">
                                    <label
                                        htmlFor="city"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        City
                                    </label>
                                    <select
                                        id="disabledSelect"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                        name="city"
                                        value={user.city}
                                        onChange={handleInput}
                                    >
                                        <option disabled value="">
                                            Select your city
                                        </option>
                                        <option value="Gjilan">Gjilan</option>
                                        <option value="Prishtina">Prishtina</option>
                                        <option value="Mitrovica">Mitrovica</option>
                                        <option value="Peja">Peja</option>
                                        <option value="Ferizaj">Ferizaj</option>
                                    </select>
                                    <div className="mt-1">
                                        <span className="text-red-500">{inputErrorList.city}</span>
                                    </div>
                                </div>
                                <div className="form-group mt-2">
                                    <label
                                        htmlFor="role"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Role
                                    </label>
                                    <select
                                        id="disabledSelect"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                        name="role"
                                        value={user.role}
                                        onChange={handleInput}
                                    >
                                        <option disabled value="">
                                            Select role for user
                                        </option>
                                        <option value="customer">Customer</option>
                                        <option value="employee">Employee</option>
                                        <option value="driver">Driver</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                    <div className="mt-1">
                                        <span className="text-red-500">{inputErrorList.role}</span>
                                    </div>
                                </div>
                                <div className="form-group mt-2">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium dark:text-white">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                        placeholder="Enter password"
                                        value={user.password}
                                        onChange={handleInput}
                                    />
                                    <div className="mt-1">
                                        <span className="text-red-500">{inputErrorList.password}</span>
                                    </div>
                                </div>
                                <div className="form-group mt-2">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium dark:text-white">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="passwordConfirmation"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                        placeholder="Enter password"
                                        value={user.passwordConfirmation}
                                        onChange={handleInput}
                                    />
                                    <div className="mt-1">
                                        <span className="text-red-500">{inputErrorList.password}</span>
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div role="status" class="opacity-100 absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                    <svg aria-hidden="true" class="opacity-100 w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                    <span class="sr-only">Loading...</span>
                </div>
            </section>
            </div>
        );
    }

    return (
        <div><title>GFC | User Edit</title>
            <section className="bg-white p-40 backdrop-filter backdrop-blur-lg bg-opacity-20">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white">
                    Administrator Tools
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Edit User
                        </h1>
                        <form onSubmit={(event) => editUser(event)} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User name</label>
                                <input type="text" value={user.name} onChange={handleInput} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Name" required="" />
                                <div className="mt-1">
                                    <span className="text-red-500">{inputErrorList.name}</span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="text" value={user.email} onChange={handleInput} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Email" required="" />
                                <div className="mt-1">
                                    <span className="text-red-500">{inputErrorList.email}</span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <input type="text" value={user.address} onChange={handleInput} name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Address" required="" />
                                <div className="mt-1">
                                    <span className="text-red-500">{inputErrorList.address}</span>
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <label
                                    htmlFor="city"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    City
                                </label>
                                <select
                                    id="disabledSelect"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                    name="city"
                                    value={user.city}
                                    onChange={handleInput}
                                >
                                    <option disabled value="">
                                        Select your city
                                    </option>
                                    <option value="Gjilan">Gjilan</option>
                                    <option value="Prishtina">Prishtina</option>
                                    <option value="Mitrovica">Mitrovica</option>
                                    <option value="Peja">Peja</option>
                                    <option value="Ferizaj">Ferizaj</option>
                                </select>
                                <div className="mt-1">
                                    <span className="text-red-500">{inputErrorList.city}</span>
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <label
                                    htmlFor="role"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Role
                                </label>
                                <select
                                    id="disabledSelect"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                    name="role"
                                    value={user.role}
                                    onChange={handleInput}
                                >
                                    <option disabled value="">
                                        Select role for user
                                    </option>
                                    <option value="customer">Customer</option>
                                    <option value="employee">Employee</option>
                                    <option value="driver">Driver</option>
                                    <option value="manager">Manager</option>
                                </select>
                                <div className="mt-1">
                                    <span className="text-red-500">{inputErrorList.role}</span>
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                    placeholder="Enter password"
                                    value={user.password}
                                    onChange={handleInput}
                                />
                                <div className="mt-1">
                                    <span className="text-red-500">{inputErrorList.password}</span>
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium dark:text-white">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="passwordConfirmation"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                    placeholder="Enter password"
                                    value={user.passwordConfirmation}
                                    onChange={handleInput}
                                />
                                <div className="mt-1">
                                    <span className="text-red-500">{inputErrorList.password}</span>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
};

export default UserEdit;