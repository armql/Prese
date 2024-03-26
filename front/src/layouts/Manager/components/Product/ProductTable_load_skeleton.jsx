import { Link } from "react-router-dom";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import SpinnerIcon from "../icons/SpinnerIcon";

export default function ProductTableLoadSkeleton({
  item,
  index,
  imageURL,
  createdDate,
}) {
  return (
    <tr key={index}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{item.id}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img src={imageURL} alt="food-image" />
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
        <div className="text-sm text-gray-500 underline text-center flex items-center justify-center">
          <SpinnerIcon />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500 underline text-center flex items-center justify-center">
          <SpinnerIcon />
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
            // onClick={(e) => deleteProduct(e, item.id)}
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
}
