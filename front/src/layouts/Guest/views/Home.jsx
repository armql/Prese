import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeValidationSkeleton from "../../Universal/views/core/HomeValidation_skeleton";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../api/axios";
import ProductDisplay from "../../Universal/views/ProductDisplay";
import OfferSlider from "../../Universal/components/OfferSlider";
import NewsLetter from "../../Universal/components/NewsLetter";
import { usePopup } from "../../../contexts/PopupContext";

export default function Home() {
  const { setCurrentUser } = useStateContext();
  const [validatingUser, setValidatingUser] = useState(true);
  const { showPopup, hideAlert } = usePopup();

  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get("/me")
      .then(({ data }) => {
        setCurrentUser(data);
        if (data.role === "manager") {
          navigate("../../management");
        } else if (data.role === "customer") {
          navigate("../../app");
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
  }, [navigate, setCurrentUser]);

  if (validatingUser) {
    return <HomeValidationSkeleton />;
  }

  return (
    <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20">
      {showPopup && (
        <div className="fixed top-0 right-2 rounded-sm flex p-4 gap-2 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50">
          <svg
            className="flex-shrink-0 w-5 h-5"
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
          <div className="ml-3 text-sm font-medium">
            You registered successfully. You can now{" "}
            <a
              href="/login"
              className="font-semibold underline hover:no-underline"
            >
              Login
            </a>
            . Join if you want.
          </div>
          <button
            onClick={hideAlert}
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg hover:text-red-800 focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8"
            data-dismiss-target="#alert-border-1"
            aria-label="Close"
          >
            <span className="sr-only">Dismiss</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      )}
      <title>Prese | Home</title>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-red-200 hover:ring-red-400 active:ring-red-600 transition duration-600 hover:translate-x-1 active:translate-x-4">
            Find out about our new Offers.{" "}
            <Link to="/login" className="font-semibold">
              <span className="absolute inset-0" aria-hidden="true" />
              Check it out here <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Nothing tastes just as at Prese
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/login"
              className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-800 transition:1s focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer"
            >
              Online Delivery
            </Link>
            <div className="text-sm font-semibold leading-6 text-gray-900 transition duration-500 hover:translate-x-1 active:translate-x-4">
              <Link to="/aboutus">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <ProductDisplay />
      <OfferSlider />
      <NewsLetter />
    </div>
  );
}
