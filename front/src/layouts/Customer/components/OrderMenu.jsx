import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axiosClient from "../../../api/axios";
import PBG_Loading_skeleton from "./core/PBG_Loading_skeleton";
import { useStateContext } from "../../../contexts/ContextProvider";
import OrderBarLoading from "./core/OrderBar_loading";

export default function OrderMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [lowhiFilter, setlowhiFilter] = useState(false);
  const { currentUser, setCurrentUser } = useStateContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersActive, setFiltersActive] = useState(false);

  useEffect(() => {
    axiosClient.get("category").then((response) => {
      setCategories(response.data.categories);
      setSelectedTab(response.data.categories[0]?.name);
      setLoading(false);
    });
    axiosClient
      .get("/me")
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    setFiltersActive(searchQuery.trim() !== "" || lowhiFilter);
  }, [searchQuery, lowhiFilter]);

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handlelowhi = () => {
    setlowhiFilter(!lowhiFilter);
  };

  if (loading) {
    return (
      <>
        <OrderBarLoading
          handlelowhi={handlelowhi}
          lowhiFilter={lowhiFilter}
          isDropdownOpen={isDropdownOpen}
        />
        <PBG_Loading_skeleton />
      </>
    );
  }

  const renderProducts = (tabName) => {
    const selectedCategory = categories.find(
      (category) => category.name === tabName
    );
    if (selectedCategory) {
      let productsToDisplay = selectedCategory.products;

      if (searchQuery.trim() !== "") {
        productsToDisplay = productsToDisplay.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (lowhiFilter) {
        productsToDisplay.sort((a, b) => a.retail_price - b.retail_price);
      } else {
        productsToDisplay.sort((a, b) => b.retail_price - a.retail_price);
      }

      return productsToDisplay.map((item, index) => {
        const imageURL = item.preview.replace("front", "");
        return (
          <ProductCard
            id={item.id}
            preview={imageURL}
            name={item.name}
            description={item.description}
            retail_price={item.retail_price}
            price={item.retail_price}
            item={item}
            key={index}
          />
        );
      });
    }
    return null;
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between w-full bg-white px-2">
        <div className="flex flex-row gap-2 w-96 bg-white p-2">
          <form>
            <label
              htmlFor="default-search"
              className="text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="flex items-center gap-2">
              <input
                type="search"
                id="default-search"
                className="block text-sm bg-white text-gray-900 bg-transparent rounded-md border-2 border-gray-200 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Any favorites?"
                required
              />
            </div>
          </form>
          <div className="flex gap-2">
            <div className="grid grid-cols-1 bg-gray-100 active:scale-105 transition p-1 rounded-lg">
              <button
                className="font-semibold text-xs focus:outline-none"
                onClick={handlelowhi}
                type="button"
              >
                {lowhiFilter ? "HIGH" : "LOW"}
              </button>

              <div className="border border-gray-900"></div>
              <button
                className={`font-semibold text-xs focus:outline-none ${
                  handlelowhi ? "text-gray-600" : ""
                }`}
                onClick={handlelowhi}
                type="button"
              >
                {lowhiFilter ? "LOW" : "HIGH"}
              </button>
            </div>
            <button
              onClick={() => {
                setSearchQuery("");
                setlowhiFilter(false);
              }}
              className={`${
                filtersActive ? "" : "hidden"
              }bg-red-100 text-red-900 hover:bg-red-200 transition active:scale-105 text-xs font-semibold uppercase p-1 rounded-lg`}
            >
              {filtersActive && <>Clear</>}
            </button>
          </div>
        </div>
        <div className="">
          <button
            id="dropdownInformationButton"
            onClick={toggleDropdown}
            data-dropdown-toggle="dropdownInformation"
            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-lg text-sm px-4 py-2 text-center font-medium inline-flex items-center"
            type="button"
          >
            Categories
            <svg
              className={`w-2.5 h-2.5 ml-2.5 transform transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdownInformation"
            className={`${
              isDropdownOpen ? "block" : "hidden"
            } z-20 absolute top-17 right-2 sm:top-22 sm:right-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mt-1`}
          >
            <div className="px-4 py-3 text-sm text-gray-900">
              <div>Prese products by</div>
              <div className="font-medium truncate">Bob's Favorites</div>
            </div>
            <ul
              className="grid grid-cols-1 items-center justify-center text-center py-2 text-sm text-gray-700"
              aria-labelledby="dropdownInformationButton"
            >
              {categories.map((category) => (
                <li className=" mr-2" role="presentation" key={category.id}>
                  <button
                    className={`inline-block p-4 rounded-t-lg ${
                      selectedTab === category.name
                        ? "border-black text-red-700 font-semibold"
                        : "border-transparent"
                    }`}
                    id={`${category.name}-tab`}
                    data-tabs-target={`#${category.name}`}
                    type="button"
                    role="tab"
                    aria-controls={category.name}
                    aria-selected={selectedTab === category.name}
                    onClick={() => handleTabClick(category.name)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="py-2">
              <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Bob's Food Emporium: Crazy deals, happy wallets! In a sonic,
                we've opened our hearts to serve you. What are you waiting for,{" "}
                {currentUser.name}?{" "}
                <span className="underline hover:text-red-400 cursor-pointer">
                  Order now
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-12 px-6 gap-6">
        {renderProducts(selectedTab)}
      </div>
    </div>
  );
}
