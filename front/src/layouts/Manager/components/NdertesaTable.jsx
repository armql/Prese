import { useEffect, useState } from "react";
import axiosClient from "../../../api/axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import MOTable_pagination from "../../Employee/components/core/MOTable_pagination";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";

export default function NdertesaTable() {
  const [loading, setLoading] = useState(true);
  const [ndertesa, setNdertesa] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [ndertesaPerPage] = useState(10);
  const [reloadTable, setReloadTable] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page");
    const page = parseInt(pageParam) || 1;

    setCurrentPage(page);

    axiosClient
      .get(`/ndertesat?page=${page}&perPage=10`)
      .then((response) => {
        setNdertesa(response.data.ndertesat);
        setLoading(false);

        const totalNdertesat = response.data.total;
        const totalPages = Math.ceil(totalNdertesat / ndertesaPerPage);
        setTotalPages(totalPages);
      })
      .catch((error) => {
        console.error("Failed to fetch ndertesat", error);
      });

    setReloadTable(false);
  }, [reloadTable, ndertesaPerPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    axiosClient
      .get(`/ndertesat?page=${pageNumber}&perPage=${ndertesaPerPage}`)
      .then((response) => {
        setNdertesa(response.data.current_page);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch orders", error);
      });
  };

  const deleteNdertesa = (e, id) => {
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
          .delete(`ndertesa/${id}/delete`)
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
    return <div>Loading</div>;
  }

  let ndertesaDetails = "";
  ndertesaDetails = ndertesa.map((item, index) => {
    const createdDate = new Date(item.created_at);
    const dataPT = new Date(item.DataPT);

    return (
      <tr key={index}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{item.id}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {item.Emri212257839}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500 text-start">
            {dataPT.toDateString()}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500 text-center">
            {createdDate.toDateString()}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500 underline text-center">
            {item.user}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center text-cyan-900 justify-center active:scale-105">
            <Link
              to={`ndertesaedit/${item.id}`}
              className="flex gap-2 mr-2 bg-cyan-100 px-3 py-1 rounded-lg focus:outline-none focus:shadow-outline-blue"
              type="button"
            >
              <EditIcon />
              <p>Edit</p>
            </Link>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center text-red-900 justify-center active:scale-105">
            <button
              onClick={(e) => deleteNdertesa(e, item.id)}
              className="flex bg-red-300 gap-2 px-3 py-1 rounded-lg focus:outline-none focus:shadow-outline-red"
              type="button"
            >
              <DeleteIcon />
              <p>Delete</p>
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
              <th className="px-6 py-3 text-xs text-start font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-xs text-start font-medium text-gray-500 uppercase tracking-wider">
                Emertimi
              </th>
              <th className="px-6 py-3 text-xs text-start font-medium text-gray-500 uppercase tracking-wider">
                DataPT
              </th>
              <th className="px-6 py-3 text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
                Date Created
              </th>
              <th className="px-6 py-3 text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
                Created by
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit Ndertesa
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delete Ndertesa
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ndertesaDetails}
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
