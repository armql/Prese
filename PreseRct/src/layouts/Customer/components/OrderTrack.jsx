import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../api/axios';

function OrderTrack() {
    let { id } = useParams();
    const [order, setOrder] = useState({});
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient
            .get(`ordertrack/${id}`)
            .then((res) => {
                setOrder(res.data.order);
                setUser(res.data)
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

    // useEffect(() => {
    //     const handleClick = () => {
    //         const swalWithBootstrapButtons = Swal.mixin({
    //             customClass: {
    //                 confirmButtonText: 'btn btn-success',
    //                 cancelButtonText: 'btn btn-danger',
    //                 confirmButton: 'btn btn-success',
    //                 cancelButton: 'btn btn-danger',
    //                 closeButton: 'btn btn-secondary',
    //             },
    //             buttonsStyling: true,
    //         });

    //         swalWithBootstrapButtons
    //             .fire({
    //                 title: 'Edit',
    //                 text: 'What is that you want to edit?',
    //                 icon: 'warning',
    //                 showCancelButton: true,
    //                 confirmButtonText: 'Add a comment!',
    //                 cancelButtonText: 'I want to, cancel!',
    //                 confirmButtonColor: '#3085d6',
    //                 cancelButtonColor: '#d33',
    //                 reverseButtons: true,
    //                 showCloseButton: true,
    //             })
    //             .then((result) => {
    //                 if (result.isConfirmed) {
    //                     swalWithBootstrapButtons
    //                         .fire({
    //                             title: 'Add Comment',
    //                             html: '<input id="comment" class="swal2-input" placeholder="Enter your comment" type="text">',
    //                             icon: 'info',
    //                             showCancelButton: true,
    //                             confirmButtonText: 'Submit',
    //                             cancelButtonText: 'Cancel',
    //                             confirmButtonColor: '#3085d6',
    //                             cancelButtonColor: '#d33',
    //                             showCloseButton: true,
    //                             reverseButtons: true,
    //                             preConfirm: () => {
    //                                 const commentInput = Swal.getPopup().querySelector('#comment').value;
    //                                 if (!commentInput) {
    //                                     Swal.showValidationMessage('Please enter a comment');
    //                                 }
    //                                 return { comment: commentInput };
    //                             },
    //                         })
    //                         .then((result) => {
    //                             if (result.isConfirmed) {
    //                                 const comment = result.value.comment;
    //                                 // TODO: Backend for using the comment
    //                                 swalWithBootstrapButtons.fire('Comment Added!', Your comment "${comment}" has been added., 'success');
    //                             } else {
    //                                 // TODO: Backend for going back
    //                                 swalWithBootstrapButtons.fire('Go Back', 'You have chosen to go back.', 'info');
    //                             }
    //                         });
    //                 } else if (result.dismiss === Swal.DismissReason.cancel) {
    //                     swalWithBootstrapButtons
    //                         .fire({
    //                             title: 'Cancel Order',
    //                             text: 'Are you sure you want to cancel the order?',
    //                             icon: 'warning',
    //                             showCancelButton: true,
    //                             confirmButtonText: 'Yes',
    //                             cancelButtonText: 'No',
    //                             confirmButtonColor: '#d33',
    //                             cancelButtonColor: '#3085d6',
    //                             reverseButtons: true,
    //                             showCloseButton: true,
    //                         })
    //                         .then((result) => {
    //                             if (result.isConfirmed) {
    //                                 // TODO: Backend for canceling the order
    //                                 swalWithBootstrapButtons.fire('Order Canceled!', 'Your order has been canceled.', 'success');
    //                             }
    //                         });
    //                 }
    //             });
    //     };

    //     const buttonElement = document.getElementById('myButton');
    //     buttonElement.addEventListener('click', handleClick);

    //     return () => {
    //         buttonElement.removeEventListener('click', handleClick);
    //     };
    // }, []);

    const getStatusText = (status) => {
        switch (status) {
            case 'cancelled':
                return (
                    <div>
                        <div className="reference">
                            <p>Order has been cancelled, contact customer service for information.</p>
                        </div>
                        <div className="progress-box">
                            <div className="progress-bar">
                                <div className={`progress-bar-cancelled`}></div>
                            </div>
                        </div>
                        <div className="progress-text">
                            <div className={`progress-item-cancelled`}>
                                <p className={`progress-item-cancelled`}>Cancelled</p>
                                <p className={`progress-item-cancelled`}>Pending</p>
                                <p className={`progress-item-cancelled`}>Delivering</p>
                                <p className={`progress-item-cancelled`}>Delivered</p>
                            </div>
                        </div>
                    </div>
                );
            case 'delivering':
                return (
                    <div>
                        <div className="reference">
                            <p>Order is being delivered.</p>
                        </div>
                        <div className="progress-box">
                            <div className="progress-bar">
                                <div className={`progress-bar-delivering`}></div>
                            </div>
                        </div>
                        <div className="progress-text">
                            <div className={`progress-item-delivering`}>
                                <p className={`progress-item-delivering`}>Cancelled</p>
                                <p className={`progress-item-delivering`}>Pending</p>
                                <p className={`progress-item-delivering`}>Delivering</p>
                                <p className={`progress-item-delivering`}>Delivered</p>
                            </div>
                        </div>
                    </div>
                );
            case 'delivered':
                return (
                    <div>
                        <div className="reference">
                            <p>Order has been delivered.</p>
                        </div>
                        <div className="progress-box">
                            <div className="progress-bar">
                                <div className={`progress-bar-delivered`}></div>
                            </div>
                        </div>
                        <div className="progress-text">
                            <div className={`progress-item-delivered`}>
                                <p className={`progress-item-delivered`}>Cancelled</p>
                                <p className={`progress-item-delivered`}>Pending</p>
                                <p className={`progress-item-delivered`}>Delivering</p>
                                <p className={`progress-item-delivered`}>Delivered</p>
                            </div>
                        </div>
                    </div>
                );
            case 'pending':
                return (
                    <div>
                        <div className="reference">
                            <p>Order is pending</p>
                        </div>
                        <div className="progress-box">
                            <div className="progress-bar">
                                <div className={`progress-bar-pending`}></div>
                            </div>
                        </div>
                        <div className="progress-text">
                            <div className={`progress-item-pending`}>
                                <p className={`progress-item-pending`}>Cancelled</p>
                                <p className={`progress-item-pending`}>Pending</p>
                                <p className={`progress-item-pending`}>Delivering</p>
                                <p className={`progress-item-pending`}>Delivered</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className='bg-white backdrop-filter backdrop-blur-lg bg-opacity-20'>
                <h1 className='text-2xl text-center font-bold'>Loading order</h1>
            </div>
        )
    }

    return (
        <div className='bg-white backdrop-filter backdrop-blur-lg bg-opacity-20'>
            <div className='parent'>
                <div className="grid grid-cols-1 gap-10 py-14 px-14">
                    <h1 className='text-3xl font-bold'>My Order Invoice #3</h1>
                    <div className="bg-white shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-95">
                        <div className="grid grid-cols-1 items-center lg:grid-cols-1">
                            <div className='grid  sm:grid-cols-2 md-grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                                {
                                    order.order_items.map(item => (
                                        <div className='grid grid-cols-1'>
                                            <div className='border-2 border-red-200'>
                                                <h1 className='font-bold text-2xl text-red-900 m-1'>{item.quantity}X</h1>
                                                <h2 className="ml-1 font-bold tracking-tight text-gray-900 sm:text-4xl ">{item.product.name}</h2>
                                                <p className=" ml-2 text-xs text-gray-500 sm:text-xl ">{item.product.description}</p>
                                                <p className="ml-1.5 text-xs font-bold text-gray-900 dark:text-white tracking-tight sm:text-2xl">EUR {item.product.retail_price}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="border-2 border-green-300 grid grid-cols-1 sm:grid-cols-2">
                                    <div className="pt-4">
                                        <h2 className="text-s font-semibold text-gray-900 m-2 sm:text-2xl">Delivery Address</h2>
                                        <p className='text-xs text-gray-700 mt-1 sm:text-xl m-3'>{order.user.address}</p>
                                        <h2 className="text-l font-semibold text-gray-900 m-2 sm:text-2xl">Delivery Updates</h2>
                                        <h3 className='text-xs text-gray-700 mt-1 sm:text-xl m-3'>{order.driver} Contact Us(044 138 813)</h3>
                                    </div>
                                    <div className="mt-4 sm:mt-0 sm:border-gray-200 pt-4">
                                        <div className='flex justify-center'>
                                            <div className='rounded-md flex bg-transparent border-2 border-gray-400 items-center justify-center text-center rounded-10 w-20 h-10 sm:w-25 sm:h-10 hover:cursor-pointer active:scale-101'>
                                                <button id="myButton" className='font-bold text-xl sm:w-50'>Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {getStatusText(order.status)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OrderTrack