import React from 'react';
import { useStateContext } from '../../../contexts/ContextProvider';


export default function Checkout() {

  const { currentUser, } = useStateContext();

  return (
    <div className='bg-white backdrop-filter backdrop-blur-lg bg-opacity-20'>
      <section>
        <h1 className="sr-only">Checkout</h1>

        <div className="mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="py-12 md:py-24">
            <div className="mx-auto space-y-8 px-4 lg:px-8">
              <div className="flex items-center gap-4">
                <span className="h-10 w-10 rounded-full bg-blue-700"></span>

                <h2 className="font-medium text-gray-900">{currentUser.name}</h2>
              </div>

              <div>
                <p className="text-2xl font-medium font-bold tracking-tight text-gray-900">
                  99.99EUR
                </p>

                <p className="mt-1 text-sm text-gray-600">For the purchase of</p>
              </div>

              <div>
                <div className="grid grid-cols-4 ">
                  <ul className="border-2 border-red-200 bg-white divide-y divide-gray-100">
                    <li className="grid p-2 xl:grid-cols-2 sm:grid-cols-1 items-center gap-4">
                      <img
                        src="https://images.ctfassets.net/9tka4b3550oc/1FQSRLVXt2Q1lvXXkOyW6U/f306561ef7bfc5ab7c84a739a46d3629/Food_09.png?q=75&w=1280"
                        alt=""
                        className="h-16 w-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-sm text-gray-900">Chicken 6-Pack</h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">Description:</dt>
                          </div>
                          <div>
                            <dt className="inline">Quantity:</dt>
                            <dd className="inline">6</dd>
                          </div>

                        </dl>
                      </div>
                    </li>
                  </ul>

                </div>
              </div>
            </div>
          </div>

          <div className="bg-white py-12 md:py-24">
            <div className="mx-auto max-w-lg px-4 lg:px-8">
              <form className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                  <label
                    htmlFor="FirstName"
                    className="block text-xs font-medium text-gray-700"
                  >
                    First Name
                  </label>

                  <input
                    type="text"
                    id="FirstName"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="LastName"
                    className="block text-xs font-medium text-gray-700"
                  >
                    Last Name
                  </label>

                  <input
                    type="text"
                    id="LastName"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="Email" className="block text-xs font-medium text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    id="Email"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="Phone" className="block text-xs font-medium text-gray-700">
                    Phone
                  </label>

                  <input
                    type="tel"
                    id="Phone"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>

                <fieldset className="col-span-6">
                  <legend className="block text-sm font-medium text-gray-700">
                    Card Details
                  </legend>

                  <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                    <div>
                      <label htmlFor="CardNumber" className="sr-only"> Card Number </label>

                      <input
                        type="text"
                        id="CardNumber"
                        placeholder="Card Number"
                        className="relative mt-1 w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                      />
                    </div>

                    <div className="flex">
                      <div className="flex-1">
                        <label htmlFor="CardExpiry" className="sr-only"> Card Expiry </label>

                        <input
                          type="text"
                          id="CardExpiry"
                          placeholder="Expiry Date"
                          className="relative w-full rounded-es-md border-gray-200 focus:z-10 sm:text-sm"
                        />
                      </div>

                      <div className="-ms-px flex-1">
                        <label htmlFor="CardCVC" className="sr-only"> Card CVC </label>

                        <input
                          type="text"
                          id="CardCVC"
                          placeholder="CVC"
                          className="relative w-full rounded-ee-md border-gray-200 focus:z-10 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="col-span-6">
                  <legend className="block text-sm font-medium text-gray-700">
                    Billing Address
                  </legend>

                  <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                    <div>
                      <label htmlFor="Country" className="sr-only">Country</label>

                      <select
                        id="Country"
                        className="relative w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                      >
                        <option>Gjilan</option>
                        <option>Prishtine</option>
                        <option>Ferizaj</option>
                        <option>Peje</option>
                      </select>
                    </div>

                    <div>
                      <label className="sr-only" htmlFor="PostalCode"> ZIP/Post Code </label>

                      <input
                        type="text"
                        id="PostalCode"
                        placeholder="ZIP/Post Code"
                        className="relative w-full rounded-b-md border-gray-200 focus:z-10 sm:text-sm"
                      />
                    </div>
                  </div>
                </fieldset>
                <div className="col-span-6">
                  <button
                    className="block w-full rounded-md bg-[#B31312] p-2.5 text-sm text-white transition hover:shadow-lg"
                  >
                    Pay Now
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
