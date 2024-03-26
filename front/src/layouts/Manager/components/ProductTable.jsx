import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosClient from "../../../api/axios";
import { Link } from "react-router-dom";
import ProductTable_skeleton from "./core/ProductTable_skeleton";
import MOTable_pagination from "../../Employee/components/core/MOTable_pagination";
import EditIcon from "./icons/EditIcon";
import DeleteIcon from "./icons/DeleteIcon";
import ProductTableLoadSkeleton from "./Product/ProductTable_load_skeleton";

export default function ProductTable() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const productsPerPage = 5;
  const [reloadTable, setReloadTable] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page");
    const page = parseInt(pageParam) || 1;

    setCurrentPage(page);

    axiosClient
      .get(`/products?page=${page}&perPage=5`)
      .then((response) => {
        setProduct(response.data.products);
        setLoading(false);

        const totalProducts = response.data.total;
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        setTotalPages(totalPages);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setLoadingData(false);
      });
    setReloadTable(false);
  }, [reloadTable]);

  // paginates
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(productsPerPage);
    axiosClient
      .get(`/products?page=${pageNumber}&perPage=${productsPerPage}`)
      .then((response) => {
        setProduct(response.data.current_page);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch orders", error);
      });
  };

  const deleteProduct = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .delete(`product/${id}/delete`)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Deleted",
              text: res.data.message,
            }).then(() => {
              thisClicked.closest("tr").remove();
            });
          })
          .catch(function (error) {
            if (error.response) {
              thisClicked.innerText = "Deleting...";
              if (error.response.status === 404) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: error.response.data.message,
                });
              } else if (error.response.status === 500) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: error.response.data,
                });
              }
            }
          });
      }
    });
  };

  if (loading) {
    return <ProductTable_skeleton />;
  }

  let ProductDetails = "";
  ProductDetails = product.map((item, index) => {
    const createdDate = new Date(item.created_at);
    const imageURL = item.preview.replace("front", "");
    if (loadingData) {
      return (
        <ProductTableLoadSkeleton
          createdDate={createdDate}
          imageURL={imageURL}
          item={item}
          key={index}
        />
      );
    }

    return (
      <tr key={index}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{item.id}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 object-contain"
                src={imageURL}
                alt="food-image"
              />
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{item.name}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{item.description}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">EUR {item.retail_price}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">EUR {item.market_price}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">
            {createdDate.toDateString()}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-center text-gray-500">{item.user}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-center text-gray-500">
            {item.category}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center justify-center active:scale-105">
            <Link
              to={`productedit/${item.id}`}
              className="flex gap-2 mr-2 bg-cyan-100 text-black px-3 py-1 rounded-lg focus:outline-none focus:shadow-outline-blue"
              type="button"
            >
              <EditIcon />
              <p className="text-black">Edit</p>
            </Link>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center justify-center active:scale-105">
            <button
              onClick={(e) => deleteProduct(e, item.id)}
              className="flex bg-red-300 gap-2 px-3 py-1 rounded-lg focus:outline-none focus:shadow-outline-red"
              type="button"
            >
              <DeleteIcon />
              <p className="text-black">Delete</p>
            </button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className="parent">
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preview
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Retail Price
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Market Price
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Created
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created by
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit Product
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delete Product
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ProductDetails}
          </tbody>
        </table>
      </div>
      <MOTable_pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
}
