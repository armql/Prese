import { Fragment } from "react";
import SpinnerIcon from "../icons/SpinnerIcon";

export default function ProductEditSubmitSkeleton() {
  return (
    <Fragment>
      <section className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 p-20">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 opacity-80">
          <div className="flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white">
            Administrator Tools
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center dark:text-white">
                Add Product
              </h1>
              <form className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="preview"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product preview
                  </label>
                  <input
                    type="file"
                    name="preview"
                    id="preview"
                    className="bg-gray-50 border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4.5"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Product name"
                    required=""
                  />
                </div>
                <div className="form-group  mb-2">
                  <label
                    htmlFor="Description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Preview Description
                  </label>
                  <textarea
                    name="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Product Description"
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="category_id"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product category
                  </label>
                  <select
                    name="category_id"
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4.5"
                  >
                    <option value="" disabled selected>
                      Choose a category
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="retail_price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Retail Price
                  </label>
                  <input
                    type="number"
                    name="retail_price"
                    id="retail_price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Market Price"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="market_price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Market Price
                  </label>
                  <input
                    type="number"
                    name="market_price"
                    id="market_price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Retail Price"
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <SpinnerIcon />
    </Fragment>
  );
}
