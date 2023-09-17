import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import axiosClient from '../../../api/axios';
import { Link } from 'react-router-dom';
import PBG_Loading_skeleton from './core/PBG_Loading_skeleton';

export default function Productsbg() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [lowhiFilter, setlowhiFilter] = useState(false);

    useEffect(() => {
        axiosClient
            .get('category')
            .then(response => {
                setCategories(response.data.categories);
                setSelectedTab(response.data.categories[0]?.name);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);
    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const handleButtonClick = () => {
        setIsActive(!isActive);
    };

    const handlelowhi = () => {
        setlowhiFilter(!lowhiFilter);
    };

    if (loading) {
        return (
            <>
                <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-90">
                    <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-70 px-2.5 pb-2.5">
                        <div className='flex items-center justify-between'>
                            <div className='grid grid-cols-1 items-center gap-4 sm:grid-cols-2'>
                                <form>
                                    <label
                                        htmlFor="default-search"
                                        className="text-sm font-medium text-gray-900 sr-only dark:text-white"
                                    >
                                        Search
                                    </label>
                                    <div className="flex items-center bg-white p-0.5 hover:cursor-pointer border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-1 focus:bg-orange-400 dark:focus:border-orange-500">
                                        <button type="submit" className="flex items-center active:scale-105">
                                            <svg
                                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                                />
                                            </svg>
                                        </button>
                                        <input
                                            type="search"
                                            id="default-search"
                                            className="block w-full text-sm bg-white text-gray-900 border-none bg-transparent focus:outline-none focus:ring-0"
                                            placeholder="Search Products"
                                            required
                                        />
                                    </div>
                                </form>
                                <div className='flex gap-2'>
                                    <button
                                        className={`bg-gray-100 p-1 rounded-lg ${isActive ? '' : ''}`}
                                        onClick={handleButtonClick}
                                        type='button'
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className={`w-6 h-6 transform transition-transform ${isActive ? 'rotate-180' : ''}`}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                        </svg>
                                    </button>
                                    <button className='bg-gray-100 p-1 rounded-lg' type='submit'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                                        </svg>
                                    </button>
                                    <div className='grid grid-cols-1 bg-gray-100 p-1 rounded-lg'>
                                        <button
                                            className='font-semibold text-xs focus:outline-none'
                                            onClick={handlelowhi}
                                            type='button'
                                        >
                                            {lowhiFilter ? 'HIGH' : 'LOW'}
                                        </button>
                                        <div className='border border-gray-900'></div>
                                        <button
                                            className='font-semibold text-xs focus:outline-none'
                                            onClick={handlelowhi}
                                            type='button'
                                        >
                                            {lowhiFilter ? 'LOW' : 'HIGH'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className=' '>

                                <button
                                    id="dropdownInformationButton"
                                    onClick={toggleDropdown}
                                    data-dropdown-toggle="dropdownInformation"
                                    className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-lg text-sm px-1 py-0.5 text-center inline-flex items-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                                    type="button"
                                >
                                    Options
                                    <svg
                                        className={`w-2.5 h-2.5 ml-2.5 transform transition-transform ${isDropdownOpen ? "rotate-180" : ""
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
                                    className={`${isDropdownOpen ? "block" : "hidden"} z-20 absolute top-20 right-2 sm:top-10 sm:right-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 mt-1`}
                                >
                                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                        <div>Prese products by</div>
                                        <div className="font-medium truncate">Bob's Favorites</div>
                                    </div>
                                    <ul className="grid grid-cols-1 items-center justify-center text-center py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                                        {categories.map(category => (
                                            <li className=" mr-2" role="presentation" key={category.id}>
                                                <button
                                                    className={`inline-block p-4 rounded-t-lg ${selectedTab === category.name ? 'border-black text-red-700 font-semibold' : 'border-transparent'
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
                                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Bob's Food Emporium: Crazy deals, happy wallets! In a sonic, we've opened our hearts to serve you. What are you waiting for, /Name/? <Link to="#" className="underline hover:text-orange-900 text-gray-700 ">Check our deals here!</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PBG_Loading_skeleton />
            </>
        )
            ;
    }
    const renderProducts = (tabName) => {
        const selectedCategory = categories.find(category => category.name === tabName);
        if (selectedCategory) {
            return selectedCategory.products.map((item, index) => {
                const imageURL = item.preview.replace('GfcRct', '');
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
        <div className='parent'>
            <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-90">
                <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-70 px-2.5 pb-2.5">
                    <div className='flex items-center justify-between'>
                        <div className='grid grid-cols-1 items-center gap-4 sm:grid-cols-2'>
                            <form>
                                <label
                                    htmlFor="default-search"
                                    className="text-sm font-medium text-gray-900 sr-only dark:text-white"
                                >
                                    Search
                                </label>
                                <div className="flex items-center bg-white p-0.5 hover:cursor-pointer border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-1 focus:bg-orange-400 dark:focus:border-orange-500">
                                    <button type="submit" className="flex items-center active:scale-105">
                                        <svg
                                            className="w-4 h-5 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                            />
                                        </svg>
                                    </button>
                                    <input
                                        type="search"
                                        id="default-search"
                                        className="block w-full text-sm bg-white text-gray-900 border-none bg-transparent focus:outline-none focus:ring-0"
                                        placeholder="Search Products"
                                        required
                                    />
                                </div>
                            </form>
                            <div className='flex gap-2'>
                                <button
                                    className={`bg-gray-100 p-1 rounded-lg ${isActive ? '' : ''}`}
                                    onClick={handleButtonClick}
                                    type='button'
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className={`w-6 h-6 transform transition-transform ${isActive ? 'rotate-180' : ''}`}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                    </svg>
                                </button>
                                <button className='bg-gray-100 p-1 rounded-lg' type='submit'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                                    </svg>
                                </button>
                                <div className='grid grid-cols-1 bg-gray-100 p-1 rounded-lg'>
                                    <button
                                        className='font-semibold text-xs focus:outline-none'
                                        onClick={handlelowhi}
                                        type='button'
                                    >
                                        {lowhiFilter ? 'HIGH' : 'LOW'}
                                    </button>
                                    <div className='border border-gray-900'></div>
                                    <button
                                        className='font-semibold text-xs focus:outline-none'
                                        onClick={handlelowhi}
                                        type='button'
                                    >
                                        {lowhiFilter ? 'LOW' : 'HIGH'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className=' '>

                            <button
                                id="dropdownInformationButton"
                                onClick={toggleDropdown}
                                data-dropdown-toggle="dropdownInformation"
                                className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-lg text-sm px-1 py-1.5 text-center font-medium inline-flex items-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                                type="button"
                            >
                                Options
                                <svg
                                    className={`w-2.5 h-2.5 ml-2.5 transform transition-transform ${isDropdownOpen ? "rotate-180" : ""
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
                                className={`${isDropdownOpen ? "block" : "hidden"} z-20 absolute top-17 right-2 sm:top-10 sm:right-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 mt-1`}
                            >
                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                    <div>Prese products by</div>
                                    <div className="font-medium truncate">Bob's Favorites</div>
                                </div>
                                <ul className="grid grid-cols-1 items-center justify-center text-center py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                                    {categories.map(category => (
                                        <li className=" mr-2" role="presentation" key={category.id}>
                                            <button
                                                className={`inline-block p-4 rounded-t-lg ${selectedTab === category.name ? 'border-black text-red-700 font-semibold' : 'border-transparent'
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
                                    <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Bob's Food Emporium: Crazy deals, happy wallets! In a sonic, we've opened our hearts to serve you. What are you waiting for, /Name/? <Link to="#" className="underline hover:text-orange-900 text-gray-700 ">Check our deals here!</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-4 px-20 gap-6">
                    {renderProducts(selectedTab)}
                </div>
            </div>
        </div>
    )
}
