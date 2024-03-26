import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosClient from "../../../api/axios";
import { Link } from "react-router-dom";
import MOTable_pagination from "../../Employee/components/core/MOTable_pagination";
import EditIcon from "./icons/EditIcon";
import DeleteIcon from "./icons/DeleteIcon";

export default function AshensoriTable() {
  const [loading, setLoading] = useState(true);
  const [ashensor, setAshensor] = useState([]);
  const [user, setUsers] = useState({});
  const [ndertesa, setNdertesa] = useState({});
  const [loadingData, setLoadingData] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [ashensoriPerPage] = useState(10);
  const [reloadTable, setReloadTable] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page");
    const page = parseInt(pageParam) || 1;

    setCurrentPage(page);

    axiosClient
      .get(`/ashensorit?page=${page}&perPage=10`)
      .then((response) => {
        setAshensor(response.data.ashensori);
        setLoading(false);

        const totalAshensori = response.data.total;
        const totalPages = Math.ceil(totalAshensori / ashensoriPerPage);
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
    axiosClient
      .get(`/ashensorit?page=${pageNumber}&perPage=${ashensoriPerPage}`)
      .then((response) => {
        setAshensor(response.data.current_page);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch orders", error);
      });
  };

  const deleteAshensori = (e, id) => {
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
          .delete(`ashensor/${id}/delete`)
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
    return <div>loading</div>;
  }

  let AshensoriDetails = "";
  AshensoriDetails = ashensor.map((item, index) => {
    if (loadingData) {
      return <div key={index}>Loading data</div>;
    }
    return (
      <tr key={index}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{item.id}</div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {item.Emertimi212257839}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-center text-gray-500">{item.user}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-center text-gray-500">
            {item.ndertesa}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center justify-center active:scale-105">
            <Link
              to={`ashensoriedit/${item.id}`}
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
              onClick={(e) => deleteAshensori(e, item.id)}
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
                Emri
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created by
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ndertesa
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit Ashensori
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delete Ashensori
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {AshensoriDetails}
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
