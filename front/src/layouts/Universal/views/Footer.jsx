import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2  gap-8 px-4 py-6 lg:py-8 md:grid-cols-3">
          <div className="z-20">
            <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase">
              Shortcuts
            </h2>
            <ul className="text-gray-500 font-medium">
              <li className="mb-2">
                <Link to="/home" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/aboutus" className=" hover:underline">
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/signup" className="hover:underline">
                  Sign up
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
              Contact us
            </h2>
            <ul className="text-gray-500 font-medium">
              <li className="mb-4">Rruga Mulla Idrizi, Gjilan 60000</li>
              <li className="mb-4">info@gmail.com</li>
              <li className="mb-4">+383 44-265-568</li>
            </ul>
          </div>
          <div className="text-6xl flex flex-col items-center justify-center font-bold">
            Prese
          </div>
        </div>
        <div className="bg-transparent px-4 py-6 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
            © 2023 <Link to="https://flowbite.com/">Prese™</Link>. All Rights
            Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
