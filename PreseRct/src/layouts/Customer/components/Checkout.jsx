import React, { useContext, useState } from 'react';
import { useStateContext } from '../../../contexts/ContextProvider';
import { CartContext } from '../../../contexts/CartContext';
import axiosClient from '../../../api/axios';
import { useNavigate } from 'react-router-dom';


export default function Checkout() {
  const { cartItems, clearCart, getCartTotal } = useContext(CartContext);
  const { currentUser, } = useStateContext();
  const [orderPayment, setOrderPayment] = useState(false);
  const [numberCheck, setNumberCheck] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [comment, setComment] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [globalError, setGlobalError] = useState('');
  const navigate = useNavigate();

  const handleCheckout = (event) => {
    event.preventDefault();
    const orderItems = cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const orderData = {
      user_id: currentUser.id,
      order_items: orderItems,
      comment: comment,
      phone_number: phoneNumber,
    };

    axiosClient
      .post('/checkout', orderData)
      .then((response) => {
        console.log('Order created:', response.data.order);
        clearCart();
        navigate('/app/orderhistory/orders:page');
      })
      .catch((error) => {
        console.error('Error:feafseafdsafedsafe____', error);
        setGlobalError(error);
      });
  };


  const togglePayment = () => {
    setOrderPayment(!orderPayment);
  };

  const handlePhoneInput = (e) => {
    const inputText = e.target.value;
    setPhoneNumber(inputText);

    const pattern = /^(044|045)\s?\d+$/;

    if (pattern.test(inputText)) {
      setPhoneNumberError('');
    } else {
      setPhoneNumberError('Please enter a valid RKS phone number prefix ex. 044 265 455 or 045 551 441.');
    }
  };

  let convertImageURL = (items) => {
    const imageURL = items.replace('../GfcRct', '');
    return imageURL;
  };

  return (
    <div className='bg-white backdrop-filter backdrop-blur-lg bg-opacity-20'>
      <section>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 bg-red-50">
          <div className="flex flex-col gap-10">
            <ol className="flex lg:flex-row flex-col justify-center items-center space-y-4 sm:flex sm:space-x-8 sm:space-y-0 px-10 pt-10 bg-white pb-6">
              {
                cartItems.length > 0 ? (
                  <>
                    <li className="flex items-center text-red-900 space-x-2.5">
                      <span className="flex bg-red-100 items-center justify-center w-8 h-8 border text-red-900 border-red-900 rounded-full shrink-0">
                        1
                      </span>
                      <span>
                        <h3 className="font-medium leading-tight">Ordered Products</h3>
                        <p className="text-sm">Your order</p>
                      </span>
                    </li>
                  </>
                ) : (
                  <li className="flex items-center text-gray-500 space-x-2.5">
                    <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0">
                      1
                    </span>
                    <span>
                      <h3 class="font-medium leading-tight">Ordered Products</h3>
                      <p class="text-sm">Your order</p>
                    </span>
                  </li>
                )
              }
              <li class={`${numberCheck ? 'text-red-900' : 'text-gray-500'} flex items-center  space-x-2.5`}>
                <span class={`${numberCheck ? 'bg-red-100 text-red-900 border-red-900' : 'text-gray-500 border-gray-500'} flex items-center justify-center w-8 h-8 border rounded-full shrink-0`}>
                  2
                </span>
                <span>
                  <h3 class="font-medium leading-tight">User Info</h3>
                  <p class="text-sm">User information</p>
                </span>
              </li>
              <li class={`${orderPayment ? 'text-amber-900' : 'text-green-500'} flex items-center space-x-2.5`}>
                <span class={`${orderPayment ? 'text-amber-900 bg-amber-100 border-amber-900' : 'text-green-500 border-green-500 bg-green-100'} flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0`}>
                  3
                </span>
                <span>
                  <h3 class="font-medium leading-tight">Payment</h3>
                  <p class="text-sm">{`${orderPayment ? 'Card' : 'Cash'}`}</p>
                </span>
              </li>
            </ol>

            <div className="mx-auto space-y-8 px-4 lg:px-8">
              <div className="flex items-center gap-4">
                <span className="flex justify-center items-center h-6 w-6 rounded-full bg-red-400 text-red-800">
                </span>

                <h2 className="font-semibold text-red-950 text-3xl">{currentUser.name}</h2>
              </div>


              <div>
                <p className="text-2xl font-medium tracking-tight text-red-900">
                  {getCartTotal().toFixed(2)}EUR
                </p>

                <p className="mt-1 text-sm text-gray-700">For the purchase of</p>
              </div>

              <div className=''>
                <div className="grid grid-cols-2 gap-4 p-4">
                  {
                    cartItems.map((item) => (
                      <ul className="relative rounded-sm bg-white shadow-sm">
                        <div className='absolute bg-red-200 px-4 py-2 -left-2 -top-2 text-red-950 rounded-full'>{item.quantity}</div>
                        <li className="grid p-4 xl:grid-cols-2 sm:grid-cols-1 items-center">
                          <div className='flex items-center justify-center'>
                            <img
                              src={convertImageURL(item.preview)}
                              alt=""
                              className="h-24 w-24 object-cover"
                            />
                          </div>
                          <div key={item.id} className='flex flex-col'>
                            <h3 className="text-lg pt-2 text-red-900 font-bold">{item.name}</h3>

                            <div className=''>
                              <dt className="">{item.description}</dt>
                            </div>
                          </div>
                        </li>
                      </ul>
                    ))
                  }

                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-white py-12 md:py-24">
            <div className="mx-auto max-w-lg px-4 lg:px-8">
              <form className="grid grid-cols-6 gap-4">
                <div className="col-span-6">
                  <label
                    for="FirstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>

                  <input
                    type="text"
                    id="FirstName"
                    value={currentUser.name}

                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label for="Email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    id="Email"
                    value={currentUser.email}

                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label for="Phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    placeholder='Ex. 044 449 944'
                    maxLength="9"
                    value={phoneNumber}
                    onChange={handlePhoneInput}
                  />
                  {phoneNumberError && (
                    <p className="mt-2 text-sm text-red-600">{phoneNumberError}</p>
                  )}
                </div>

                <fieldset className="col-span-6">
                  <ul class="grid w-full gap-6 md:grid-cols-2 py-4">
                    <li>
                      <input
                        onChange={togglePayment}
                        checked={!orderPayment}
                        type="radio"
                        id="payment-cash"
                        name="payment" value="payment-cash" class="hidden peer" required />
                      <label for="payment-cash" class={` ${orderPayment ? 'bg-white' : 'bg-emerald-100 text-emerald-800'} inline-flex items-center justify-between w-full p-5 text-gray-500 border border-gray-200 rounded-lg cursor-pointer hover:text-emerald-800 hover:bg-emerald-100 shadow-sm`}>
                        <div class="block">
                          <div class="w-full text-lg font-semibold">Cash</div>
                          <div class="w-full">Pay with cash up front</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-11 h-11">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                        </svg>
                      </label>
                    </li>
                    <li>
                      <input
                        onChange={togglePayment}
                        checked={orderPayment}
                        type="radio"
                        id="payment-card"
                        name="payment"
                        value="payment-card"
                        class="hidden peer" />
                      <label for="payment-card" class={`${orderPayment ? 'bg-amber-100 text-amber-800' : 'bg-white'} inline-flex items-center justify-between w-full p-5 text-gray-500 border border-gray-200 rounded-lg cursor-pointer hover:text-amber-800 hover:bg-amber-100 active:bg-amber-100 active:text-amber-800 shadow-sm`} >
                        <div class="block">
                          <div class="w-full text-lg font-semibold">Credit Card</div>
                          <div class="w-full">Pay online with a credit card</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                        </svg>
                      </label>
                    </li>
                  </ul>
                  <legend className="block text-sm font-medium text-gray-700">
                    Payment Details
                  </legend>

                  {
                    orderPayment && (
                      <div className={`text-sm mt-1 -space-y-px rounded-md bg-white shadow-sm`}>
                        <div>
                          <label for="CardNumber" className="sr-only"> Card Number </label>

                          <input
                            type="text"
                            id="CardNumber"
                            placeholder="Card Number"
                            className="relative mt-1 w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                          />
                        </div>

                        <div className="flex">
                          <div className="flex-1">
                            <label for="CardExpiry" className="sr-only"> Card Expiry </label>

                            <input
                              type="text"
                              id="CardExpiry"
                              placeholder="Expiry Date"
                              className="relative w-full rounded-es-md border-gray-200 focus:z-10 sm:text-sm"
                            />
                          </div>

                          <div className="-ms-px flex-1">
                            <label for="CardCVC" className="sr-only"> Card CVC </label>

                            <input
                              type="text"
                              id="CardCVC"
                              placeholder="CVC"
                              className="relative w-full rounded-ee-md border-gray-200 focus:z-10 sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>

                    )
                  }
                </fieldset>

                <fieldset className="col-span-6">
                  <legend className="block text-sm font-medium text-gray-700">
                    Billing Address
                  </legend>

                  <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                    <div>
                      <label for="Country" className="sr-only">Country</label>

                      <select
                        id="Country"
                        value={currentUser.city}

                        className="relative w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                      >
                        <option>Gjilan</option>
                        <option>Prishtine</option>
                        <option>Ferizaj</option>
                        <option>Peje</option>
                      </select>
                    </div>

                    <div>
                      <label className="sr-only" for="PostalCode"> ZIP/Post Code </label>

                      <input
                        type="text"
                        id="PostalCode"
                        placeholder="ZIP/Post Code"
                        value={currentUser.address}

                        className="relative w-full rounded-b-md border-gray-200 focus:z-10 sm:text-sm"
                      />
                    </div>
                  </div>
                </fieldset>
                <fieldset className="col-span-6">
                  <legend className="block text-sm font-medium text-gray-700">
                    Comment
                  </legend>

                  <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                    <div>
                      <label className="sr-only" for="comment"> ZIP/Post Code </label>

                      <textarea
                        type="text"
                        id="comment"
                        name='comment'
                        value={comment}
                        placeholder="Write a comment if needed, special request if you have, if not leave blank."
                        className="relative w-full rounded-b-md border-gray-200 focus:z-10 sm:text-sm"
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                  </div>
                </fieldset>
                <div className="col-span-6">
                  <button
                    onClick={handleCheckout}
                    className="block w-full rounded-md bg-[#B31312] p-2.5 text-sm text-white transition hover:shadow-lg"
                  >
                    Order
                  </button>
                  {globalError && (
                    <p className="mt-2 text-sm text-red-600">{globalError}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
