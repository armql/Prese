import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../contexts/CartContext';
import { useStateContext } from '../../../contexts/ContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../../api/axios';

function Cart() {
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
    const [modalVisible, setModalVisible] = useState(false);
    const { currentUser, setCurrentUser, userToken } = useStateContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (!userToken) {
            navigate('../../');
            return;
        }

        axiosClient
            .get('/me')
            .then(({ data }) => {
                setCurrentUser(data);

            })
            .catch(() => {
            });
    }, [navigate, setCurrentUser]);

    const buttonCheckoutClick = () => {
        navigate('checkout');
        setModalVisible(false);
    }

    const closeModal = () => {
        setModalVisible(false);
    };

    const openModal = () => {
        setModalVisible(true);
    }

    const calculateQTTotal = (price, quantity) => {
        const finalPrice = price * quantity;

        return finalPrice;
    }

    let convertImageURL = (items) => {
        const imageURL = items.replace('../GfcRct', '');
        return imageURL;
    };

    return (
        <div className=''>
            <title>Prese | Checking out</title>
            {
                cartItems.length > 0 ? (
                    <>

                        <div className=" flex items-center justify-center" onClick={openModal}>
                            <div className="fixed bottom-0 z-40 group bg-red-700 text-white text-4xl px-4 py-3 hover:py-5 hover:px-5 cursor-pointer transition-all duration-400 rounded-t-full font-semibold active:cursor-wait ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 group-hover:w-10 transition group-hover:h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>
                        </div>
                    </>
                ) : (
                    <div
                        className="hidden fixed right-10 top-40 text-lg bg-red-100 text-red-800 p-1 rounded-sm font-semibold"></div>
                )
            }
            {modalVisible && (
                <div
                    id="drawer-swipe"
                    className="fixed z-40 w-full bg-white border-t-2 border-gray-300 transition-transform top-96 left-0 right-0 bottom-0 overflow-y-auto"
                    tabIndex="-1"
                    aria-labelledby="drawer-swipe-label"
                >
                    <div className="flex justify-between px-4 py-3">
                        <h5
                            onClick={closeModal}
                            className="text-sm font-semibold text-gray-600 cursor-pointer "
                        >
                            Close
                        </h5>
                        <h5 className="text-sm font-semibold text-gray-600 ">
                            Order Details
                        </h5>
                        <h5 className="text-sm font-semibold text-gray-600 ">
                            &nbsp;
                        </h5>
                    </div>
                    <div

                    >
                        <div className="px-4 py-6 grid gap-2 sm:grid-cols-1 md-grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                            {cartItems.map((item) => (
                                <div key={item.id} className="grid grid-cols-2 border-2 p-4">
                                    <div className="grid grid-cols-1">
                                        <img
                                            src={convertImageURL(item.preview)}
                                            alt="food icon"
                                            className="w-24 h-24 mx-auto rounded-md"
                                        />
                                        <h5 className="text-xl font-bold text-gray-800 text-center">
                                            {item.name}
                                        </h5>
                                        <p className="text-sm text-gray-500  text-center">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="grid grid-cols-2 items-center justify-between">
                                            <h5 className="text-sm font-bold text-gray-800">
                                                Quantity
                                            </h5>
                                            <p className=" text-end text-gray-500">
                                                {item.quantity}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 items-center">
                                            <h5 className="text-sm font-bold text-gray-800">
                                                Price per pc.
                                            </h5>
                                            <p className="mt-1 text-sm text-end text-gray-500 ">
                                                {item.retail_price}EUR
                                            </p>
                                            {item.quantity > 1 && (
                                                <>
                                                    <h5 key={item.id} className="text-sm font-bold text-gray-800">
                                                        Price per qt.
                                                    </h5>
                                                    <p className="mt-1 text-sm text-end text-gray-500 ">
                                                        {calculateQTTotal(item.price, item.quantity).toFixed(2)}EUR
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                        <div className='flex flex-row justify-around text-center items-center'>
                                            <button
                                                onClick={() => {
                                                    addToCart(item)
                                                }}
                                                className='bg-green-100 hover:bg-green-200 active:scale-105 transition text-green-800 p-4'>
                                                <div className='flex justify-center items-center gap'>
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                                                        </svg> */}
                                                    Add
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => {
                                                    removeFromCart(item)
                                                }}
                                                className='bg-rose-100 text-rose-800 hover:bg-rose-200 active:scale-105 transition p-4'>
                                                <div className='flex justify-center items-center gap'>
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                            <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                                        </svg> */}
                                                    Remove
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {
                                cartItems.length > 0 ? (
                                    <>

                                        <div className="flex justify-between w-full h-60 border-2 border-red-400 p-4 bg-red-300">
                                            <div className="grid grid-cols-1 items-center">
                                                <div className="flex flex-col justify-center text-xl font-bold text-rose-950 text-center">
                                                    <div className='text-2xl pb-1'>
                                                        Total of order
                                                    </div>
                                                    <div className='flex flex-col'>

                                                        {cartItems.map((item) => (

                                                            <div key={item.id} className='text-start text-rose-900 font-normal text-sm'>
                                                                {item.quantity}X {item.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="grid grid-cols-1">
                                                <div className="flex flex-col items-end">
                                                    <h5 className="text-sm font-bold text-red-950">
                                                        Ordered by
                                                    </h5>
                                                    <p className="mt-1 text-sm text-rose-800 ">
                                                        {currentUser.name}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <h5 className="text-sm font-bold text-red-950">
                                                        City
                                                    </h5>
                                                    <p className="mt-1 text-sm text-rose-800  ">
                                                        {currentUser.city}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <h5 className="text-sm font-bold text-red-950">
                                                        Address
                                                    </h5>
                                                    <p className="text-sm text-rose-800 ">
                                                        {currentUser.address}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col justify-center items-end">
                                                    <h5 className="text-sm font-bold text-red-950">
                                                        Total
                                                    </h5>
                                                    <p className="mt-1 text-sm text-rose-800 ">
                                                        {getCartTotal().toFixed(2)}EUR
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='grid items-center h-40'>
                                            <div className='flex justify-around text-2xl'>
                                                <button
                                                    onClick={() => {
                                                        clearCart()
                                                    }}
                                                    className='text-xl bg-red-200 text-red-800 p-4 rounded-sm hover:bg-red-300 active:scale-105 transition'>
                                                    Clear Cart
                                                </button>
                                                <button
                                                    onClick={buttonCheckoutClick}
                                                    className='text-xl bg-gray-200 text-gray-800 p-4 rounded-sm font-semibold hover:bg-emerald-300 transition active:scale-105 hover:text-emerald-900 '>
                                                    <div className='flex items-center justify-center gap-10'>
                                                        Checkout
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        className="flex items-top justify-center text-2xl font-semibold w-screen h-24">Your cart is empty 🍴</div>
                                )
                            }
                        </div>
                    </div>
                </div>

            )}
        </div>

    );
}

export default Cart;
