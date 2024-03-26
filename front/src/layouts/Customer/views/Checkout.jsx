import { useContext, useEffect, useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import { CartContext } from "../../../contexts/CartContext";
import axiosClient from "../../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import SimpleLoader from "../../Universal/core/SimpleLoader";

export default function Checkout() {
  const { cartItems, clearCart, getCartTotal } = useContext(CartContext);
  const { currentUser, setCurrentUser, userToken } = useStateContext();
  const [orderPayment, setOrderPayment] = useState(false);
  const [infoCheck, setInfoCheck] = useState(false);
  const [commentEnabled, setCommentEnabled] = useState(false);
  const [validatingUser, setValidatingUser] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [comment, setComment] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [globalError, setGlobalError] = useState("");
  const navigate = useNavigate();
  const pattern = /^(044|045)\s?\d+$/;

  useEffect(() => {
    if (!userToken) {
      navigate("../../");
      return;
    }

    axiosClient
      .get("/me")
      .then(({ data }) => {
        setCurrentUser(data);
        if (data.role === "manager") {
          navigate("../../management");
        } else if (data.role === "driver") {
          navigate("../../workdrive");
        } else if (data.role === "employee") {
          navigate("../../workspace");
        }
        setValidatingUser(false);
      })
      .catch(() => {
        setValidatingUser(false);
      });
  }, [navigate, setCurrentUser, userToken]);

  if (validatingUser) {
    return <SimpleLoader />;
  }

  const handleCheckout = (event) => {
    event.preventDefault();

    if (phoneNumber.trim() === "") {
      setGlobalError(
        "Phone number is empty, please write a number in order for us to get in contact."
      );
      return;
    }

    if (commentEnabled && comment.trim() === "") {
      setGlobalError("Comment is empty, please write a comment.");
      return;
    }

    if (!pattern.test(phoneNumber)) {
      setGlobalError("Please enter a valid RKS phone number prefix.");
      return;
    }

    const commentToSubmit = comment.trim() === "" ? "No comment" : comment;

    const orderItems = cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const orderData = {
      user_id: currentUser.id,
      order_items: orderItems,
      comment: commentToSubmit,
      phone_number: phoneNumber,
    };

    axiosClient
      .post("/checkout", orderData)
      .then((response) => {
        console.log("Order created:", response.data.order);
        clearCart();
        navigate("/app/orderhistory/orders:page");
      })
      .catch((error) => {
        console.error("Error:", error);
        setGlobalError(error);
      });
  };

  const togglePayment = () => {
    setOrderPayment(!orderPayment);
  };

  const handlePhoneInput = (e) => {
    const inputText = e.target.value;
    setPhoneNumber(inputText);

    if (pattern.test(inputText)) {
      setInfoCheck(true);
      setPhoneNumberError("");
    } else {
      setInfoCheck(false);
      setPhoneNumberError("Please enter a valid RKS phone number prefix.");
    }
  };

  let convertImageURL = (items) => {
    const imageURL = items.replace("../front", "");
    return imageURL;
  };

  return (
    <div
      className={`${
        validatingUser ? "block" : "hidden"
      }bg-white backdrop-filter backdrop-blur-lg bg-opacity-20`}
    >
      <section>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 bg-red-50">
          <div className="flex flex-col gap-10">
            <ol className="flex lg:flex-row flex-col justify-center items-center space-y-4 sm:flex sm:space-x-8 sm:space-y-0 px-10 pt-10 bg-white pb-6">
              {cartItems.length > 0 ? (
                <>
                  <li className="flex items-center text-red-900 space-x-2.5">
                    <span className="flex bg-red-100 items-center justify-center w-8 h-8 border text-red-900 border-red-900 rounded-full shrink-0">
                      1
                    </span>
                    <span>
                      <h3 className="font-medium leading-tight">
                        Ordered Products
                      </h3>
                      <p className="text-sm">Your order</p>
                    </span>
                  </li>
                </>
              ) : (
                <li className="flex items-center text-gray-500 space-x-2.5">
                  <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0">
                    1
                  </span>
                  <span>
                    <h3 className="font-medium leading-tight">
                      Ordered Products
                    </h3>
                    <p className="text-sm">Your order</p>
                  </span>
                </li>
              )}
              <li
                className={`${
                  infoCheck ? "text-red-900" : "text-gray-500"
                } flex items-center  space-x-2.5`}
              >
                <span
                  className={`${
                    infoCheck
                      ? "bg-red-100 text-red-900 border-red-900"
                      : "text-gray-500 border-gray-500"
                  } flex items-center justify-center w-8 h-8 border rounded-full shrink-0`}
                >
                  2
                </span>
                <span>
                  <h3 className="font-medium leading-tight">User Info</h3>
                  <p className="text-sm">User information</p>
                </span>
              </li>
              <li
                className={`${
                  orderPayment ? "text-amber-900" : "text-green-500"
                } flex items-center space-x-2.5`}
              >
                <span
                  className={`${
                    orderPayment
                      ? "text-amber-900 bg-amber-100 border-amber-900"
                      : "text-green-500 border-green-500 bg-green-100"
                  } flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0`}
                >
                  3
                </span>
                <span>
                  <h3 className="font-medium leading-tight">Payment</h3>
                  <p className="text-sm">{`${
                    orderPayment ? "Card" : "Cash"
                  }`}</p>
                </span>
              </li>
            </ol>

            <div className="mx-auto space-y-8 px-4 lg:px-8">
              <div className="flex items-center gap-4">
                <span className="flex justify-center items-center h-6 w-6 rounded-full bg-red-400 text-red-800"></span>

                <h2 className="font-semibold text-red-950 text-3xl">
                  {currentUser.name}
                </h2>
              </div>

              <div>
                <p className="text-2xl font-medium tracking-tight text-red-900">
                  {getCartTotal().toFixed(2)}EUR
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  For the purchase of
                </p>
              </div>

              <div className="">
                <div className="grid grid-cols-2 gap-4 p-4">
                  {cartItems.map((item) => (
                    <ul
                      key={item.preview}
                      className="relative rounded-sm bg-white shadow-sm"
                    >
                      <div className="absolute bg-red-200 px-4 py-2 -left-2 -top-2 text-red-950 rounded-full">
                        {item.quantity}
                      </div>
                      <li className="grid p-4 xl:grid-cols-2 sm:grid-cols-1 items-center">
                        <div className="flex items-center justify-center">
                          <img
                            src={convertImageURL(item.preview)}
                            alt=""
                            className="h-24 w-24 object-cover"
                          />
                        </div>
                        <div key={item.id} className="flex flex-col">
                          <h3 className="text-lg pt-2 text-red-900 font-bold">
                            {item.name}
                          </h3>

                          <div className="">
                            <dt className="">{item.description}</dt>
                          </div>
                        </div>
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-white py-12 md:py-24">
            <div className="relative mx-auto max-w-lg px-4 pt-10 lg:px-8">
              <div className="absolute top-0 right-0">
                <Link
                  to={`editprofile`}
                  className="flex gap-2 hover:bg-red-100 border-transparent border-2 hover:border-red-200 hover:shadow-md rounded-sm p-1 font-semibold hover:text-red-900 text-sm hover:cursor-pointer hover:scale-105 active:scale-100 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                    />
                  </svg>
                  Edit Profile
                </Link>
              </div>
              <form className="grid grid-cols-6 gap-4">
                <div className="col-span-6">
                  <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>

                  <input
                    type="text"
                    id="FirstName"
                    value={currentUser.name}
                    disabled
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    id="Email"
                    value={currentUser.email}
                    disabled
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    placeholder="Ex. 044 449 944"
                    maxLength="9"
                    value={phoneNumber}
                    onChange={handlePhoneInput}
                  />
                  {phoneNumberError && (
                    <p className="mt-2 text-sm text-red-600">
                      {phoneNumberError}
                    </p>
                  )}
                </div>

                <fieldset className="col-span-6">
                  <ul className="grid w-full gap-6 md:grid-cols-2 py-4">
                    <li>
                      <input
                        onChange={togglePayment}
                        checked={!orderPayment}
                        type="radio"
                        id="payment-cash"
                        name="payment"
                        value="payment-cash"
                        className="hidden peer"
                        required
                      />
                      <label
                        htmlFor="payment-cash"
                        className={` ${
                          orderPayment
                            ? "bg-white"
                            : "bg-emerald-100 text-emerald-800"
                        } inline-flex items-center justify-between w-full p-5 text-gray-500 border border-gray-200 rounded-lg cursor-pointer hover:text-emerald-800 hover:bg-emerald-100 shadow-sm`}
                      >
                        <div className="block">
                          <div className="w-full text-lg font-semibold">
                            Cash
                          </div>
                          <div className="w-full">Pay with cash up front</div>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-11 h-11"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                          />
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
                        className="hidden peer"
                      />
                      <label
                        htmlFor="payment-card"
                        className={`${
                          orderPayment
                            ? "bg-amber-100 text-amber-800"
                            : "bg-white"
                        } inline-flex items-center justify-between w-full p-5 text-gray-500 border border-gray-200 rounded-lg cursor-pointer hover:text-amber-800 hover:bg-amber-100 active:bg-amber-100 active:text-amber-800 shadow-sm`}
                      >
                        <div className="block">
                          <div className="w-full text-lg font-semibold">
                            Credit Card
                          </div>
                          <div className="w-full">
                            Pay online with a credit card
                          </div>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-14 h-14"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                          />
                        </svg>
                      </label>
                    </li>
                  </ul>
                  <legend className="block text-sm font-medium text-gray-700">
                    Payment Details
                  </legend>

                  {orderPayment && (
                    <div
                      className={`text-sm mt-1 -space-y-px rounded-md bg-white shadow-sm`}
                    >
                      <div>
                        <label htmlFor="CardNumber" className="sr-only">
                          {" "}
                          Card Number{" "}
                        </label>

                        <input
                          type="text"
                          id="CardNumber"
                          placeholder="Card Number"
                          className="relative mt-1 w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                        />
                      </div>

                      <div className="flex">
                        <div className="flex-1">
                          <label htmlFor="CardExpiry" className="sr-only">
                            {" "}
                            Card Expiry{" "}
                          </label>

                          <input
                            type="text"
                            id="CardExpiry"
                            placeholder="Expiry Date"
                            className="relative w-full rounded-es-md border-gray-200 focus:z-10 sm:text-sm"
                          />
                        </div>

                        <div className="-ms-px flex-1">
                          <label htmlFor="CardCVC" className="sr-only">
                            {" "}
                            Card CVC{" "}
                          </label>

                          <input
                            type="text"
                            id="CardCVC"
                            placeholder="CVC"
                            className="relative w-full rounded-ee-md border-gray-200 focus:z-10 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </fieldset>

                <fieldset className="col-span-6">
                  <legend className="block text-sm font-medium text-gray-700">
                    Billing Address
                  </legend>

                  <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                    <div>
                      <label htmlFor="Country" className="sr-only">
                        Country
                      </label>

                      <select
                        id="Country"
                        value={currentUser.city}
                        disabled
                        className="relative w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                      >
                        <option>Gjilan</option>
                        <option>Prishtine</option>
                        <option>Ferizaj</option>
                        <option>Peje</option>
                      </select>
                    </div>

                    <div>
                      <label className="sr-only" htmlFor="PostalCode">
                        {" "}
                        ZIP/Post Code{" "}
                      </label>

                      <input
                        type="text"
                        id="PostalCode"
                        placeholder="ZIP/Post Code"
                        value={currentUser.address}
                        disabled
                        className="relative w-full rounded-b-md border-gray-200 focus:z-10 sm:text-sm"
                      />
                    </div>
                  </div>
                </fieldset>
                <fieldset className="col-span-6">
                  <div className="mt-1 -space-y-px bg-white flex gap-2 flex-col">
                    {commentEnabled && (
                      <div>
                        <legend className="block text-sm font-medium text-gray-700">
                          Comment
                        </legend>
                        <label className="sr-only" htmlFor="comment">
                          ZIP/Post Code
                        </label>
                        <textarea
                          type="text"
                          id="comment"
                          name="comment"
                          value={comment}
                          placeholder="Write a comment if needed, special request if you have, if not leave blank."
                          className="relative focus:outline-0 w-full rounded-md shadow-sm border-gray-200 focus:z-10 sm:text-sm"
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={commentEnabled}
                        onChange={() => setCommentEnabled(!commentEnabled)}
                        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-4"
                      />
                      <label className="flex items-center font-light text-sm text-gray-700">
                        If you need a comment or special request for the order.
                      </label>
                    </div>
                  </div>
                </fieldset>
                <div className="col-span-6">
                  {globalError && (
                    <div
                      className="flex p-2 mt-4 text-sm text-red-600 rounded-t-lg bg-red-50"
                      role="alert"
                    >
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 inline w-5 h-5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Danger</span>
                      <div>
                        <span className="font-medium">
                          Ensure that these requirements are met:
                        </span>
                        <ul className="mt-1.5 ml-4 list-disc list-inside">
                          <li>{globalError}</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={handleCheckout}
                    className={`block w-full ${
                      globalError
                        ? "rounded-b-md bg-red-200 hover:bg-red-400 text-red-950"
                        : "bg-red-800 rounded-md text-white hover:bg-red-900"
                    } p-2.5  transition hover:shadow-sm active:scale-105`}
                  >
                    Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
