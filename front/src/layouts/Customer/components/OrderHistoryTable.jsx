import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./core/OHT_pagination";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../api/axios";
import OHTModalSkeleton from "./core/OHTModal_skeleton";
import SimpleLoader from "../../Universal/core/SimpleLoader";

export default function OrderHistoryTable() {
  const { currentUser } = useStateContext();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page");
    const page = parseInt(pageParam) || 1;
    setCurrentPage(page);

    axiosClient
      .get(
        `/customerOrder?page=${page}&perPage=${ordersPerPage}&user_id=${currentUser.id}`
      )
      .then((response) => {
        setOrders(response.data.orders);
        const totalOrders = response.data.total;
        const totalPages = Math.ceil(totalOrders / ordersPerPage);
        setTotalPages(totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch orders", error);
      });
  }, [loading, currentUser.id, ordersPerPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    axiosClient
      .get(`/customerOrder?page=${pageNumber}&perPage=${ordersPerPage}`)
      .then((response) => {
        setOrders(response.data.current_page);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch orders", error);
      });
  };

  const openModal = (orderId) => {
    setLoadingModal(true);
    axiosClient
      .get(`/orders/${orderId}/items`)
      .then((response) => {
        setSelectedOrderItems(response.data.order);
        setSelectedOrderId(orderId);
        setLoadingModal(false);
        setModalVisible(true);
      })
      .catch((error) => {
        console.error("Failed to fetch order items", error);
      });
  };

  const closeModal = () => {
    setLoadingModal(false);
    setModalVisible(false);
  };

  const calculateTotal = (items) => {
    let total = 0;
    const productQuantities = {};

    for (let i = 0; i < items.order_items.length; i++) {
      const item = items.order_items[i];
      const productId = item.product_id;
      const quantity = item.quantity;
      if (productQuantities.hasOwnProperty(productId)) {
        productQuantities[productId] += quantity;
      } else {
        productQuantities[productId] = quantity;
      }

      total += quantity * item.product.retail_price;
    }

    total = total.toFixed(2);

    return total;
  };

  const getStatusText = (status) => {
    switch (status) {
      case "cancelled":
        return (
          <div className="flex items-center justify-center bg-red-200 rounded-full p-1 px-5 text-red-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-6 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
            Cancelled
          </div>
        );
      case "delivering":
        return (
          <div className="flex items-center justify-center gap-1 bg-lime-200 rounded-full p-1 px-5 text-lime-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-6"
            >
              <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
              <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
              <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
            </svg>
            Delivering
          </div>
        );
      case "delivered":
        return (
          <div className="flex items-center justify-center bg-green-200 p-1 px-5 rounded-full text-green-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-6 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
              />
            </svg>
            Delivered
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center justify-center bg-amber-200 rounded-full p-1 px-5 text-amber-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-6 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                clipRule="evenodd"
              />
            </svg>
            Pending
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <SimpleLoader />;
  }

  if (loadingModal) {
    return (
      <div className="relative overflow-x-auto">
        <div className="grid gap-2 bg-white">
          <div className="py-6 px-4 grid sm:grid-cols-1 md-grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="shadow-sm bg-white border border-red-100 rounded-sm p-5"
              >
                <div className="orders-detail">
                  <div className="grid gap-5 grid-cols-1">
                    <div className="grid grid-cols-2 justify-between">
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-1">
                        <p className="text-l font-bold text-gray-700">
                          Order ID
                        </p>
                        <p className="text-l font-bold text-gray-700">
                          Date of Placement
                        </p>
                        <p className="text-l font-bold text-gray-700">
                          Order Total
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-2 mt-2">
                        <p className="text-xs font-bold text-gray-500">
                          #{order.id}
                        </p>
                        <p className="text-xs font-bold text-gray-500">
                          {new Date(order.created_at).toLocaleString()}
                        </p>
                        <p className="text-xs font-bold text-gray-500">
                          {calculateTotal(order)}EUR
                        </p>
                      </div>
                    </div>
                    <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 items-center justify-center">
                      <div>{getStatusText(order.status)}</div>

                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => openModal(order.id)}
                          type="button"
                          className="focus:outline-none h-10 bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-2 py-1"
                        >
                          View Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <OHTModalSkeleton />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center text-4xl bg-white font-bold">
        <p>
          You have not made an order yet, make an order{" "}
          <Link
            to={"../order"}
            className="underline transition hover:text-red-900"
          >
            here
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-auto">
      <div className="grid bg-transparent bg-white ">
        <div className="py-6 px-4 grid sm:grid-cols-2 md-grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-sm border-2 border-red-100 shadow-sm p-5"
            >
              <div className="orders-detail">
                <div className="grid gap-5 grid-cols-1">
                  <div className="grid grid-cols-2 justify-between">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-1">
                      <p className="text-l font-bold text-gray-700">Order ID</p>
                      <p className="text-l font-bold text-gray-700">
                        Date of Placement
                      </p>
                      <p className="text-l font-bold text-gray-700">
                        Order Total
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2 mt-2">
                      <p className="text-xs font-bold text-gray-500">
                        #{order.id}
                      </p>
                      <p className="text-xs font-bold text-gray-500">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                      <p className="text-xs font-bold text-gray-500">
                        {calculateTotal(order)}EUR
                      </p>
                    </div>
                  </div>
                  <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 items-center justify-center">
                    <div>{getStatusText(order.status)}</div>

                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => openModal(order.id)}
                        type="button"
                        className=" focus:outline-none h-10 bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-2 py-1"
                      >
                        View Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalVisible && (
        <div
          id="drawer-swipe"
          className="fixed top-96 z-40 w-full overflow-y-auto max-h-screen bg-white border-t-2 border-gray-300 transition-transform bottom-0 top-90 left-0 right-0"
          tabIndex="-1"
          aria-labelledby="drawer-swipe-label"
        >
          <div className="flex justify-between px-4 py-3">
            <h5
              onClick={closeModal}
              className="text-sm font-semibold text-gray-600 cursor-pointer"
            >
              Close
            </h5>
            <h5 className="text-sm font-semibold text-gray-600">
              Order Details
            </h5>
            <h5 className="text-sm font-semibold text-gray-600">&nbsp;</h5>
          </div>
          <div className="px-4 py-6 grid gap-2 sm:grid-cols-1 md-grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {selectedOrderItems.order_items.map((item) => {
              const imageUrl = (imageUrl) => {
                return imageUrl.replace("front", "../");
              };
              return (
                <div key={item.id} className="grid grid-cols-2">
                  <div className="grid grid-cols-1 border-y-2 gap-2 p-4 border-l-2 items-center">
                    <img
                      src={imageUrl(item.product.preview)}
                      alt="food icon"
                      className="w-24 h-24 mx-auto rounded-md"
                    />
                    <h5 className="text-xl font-bold text-gray-800 text-center">
                      {item.product.name}
                    </h5>
                    <p className="text-sm text-gray-500 text-center">
                      {item.product.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-6 border-y-2 border-r-2 p-4">
                    <div className="grid grid-cols-2 items-center">
                      <h5 className="text-sm font-bold text-gray-800">
                        Quantity
                      </h5>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.quantity}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                      <h5 className="text-sm font-bold text-gray-800">Price</h5>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.product.retail_price} EUR
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            {orders
              .filter((item) => item.id === selectedOrderId)
              .map((item) => (
                <div key={item.id} className="grid grid-cols-2">
                  <div className="grid grid-cols-1 border-y-2 gap-2 p-4 border-l-2 items-center">
                    <div className="grid grid-cols-1 gap-2 items-center">
                      <h5 className="text-xl font-bold text-gray-800 text-center">
                        Total of order
                      </h5>
                    </div>
                    <h3 className="font-bold text-gray-700">
                      Comment / Request
                    </h3>
                    <h5 className="text-gray-500 bg-gray-100 border-gray-200 p-1 border-2">
                      {selectedOrderItems.comment}
                    </h5>
                  </div>
                  <div className="grid grid-cols-1 gap-6 border-y-2 border-r-2 p-4">
                    <div className="grid grid-cols-2 items-center">
                      <h5 className="text-sm font-bold text-gray-800">
                        Order ID
                      </h5>
                      <p className="mt-1 text-sm text-gray-500">#{item.id}</p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                      <h5 className="text-sm font-bold text-gray-800">City</h5>
                      <p className="mt-1 text-sm text-gray-500 whitespace-nowrap">
                        {item.user.city}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                      <h5 className="text-sm font-bold text-gray-800">
                        Address
                      </h5>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.user.address}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                      <h5 className="text-sm font-bold text-gray-800">Total</h5>
                      <p className="mt-1 text-sm text-gray-500">
                        {calculateTotal(selectedOrderItems)}EUR
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
}
