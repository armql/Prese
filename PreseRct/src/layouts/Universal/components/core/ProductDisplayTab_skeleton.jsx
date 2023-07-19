import React, { useState } from 'react';
import ProductData from '../../data/ProductData';
import ProductCard from './ProductDisplayCard_skeleton';

export default function ProductDisplay_skeleton() {
    const [selectedTab, setSelectedTab] = useState('Burgerswraps');

    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    };

    const renderProducts = (tabName) => {
        switch (tabName) {
            case 'Burgerswraps':
                return ProductData.Burgerswraps.map((item, index) => (
                    <ProductCard
                        img={item.img}
                        title={item.title}
                        desc={item.desc}
                        price={item.price}
                        item={item}
                        key={index}
                    />
                ));
            case 'BucketsPieces':
                return ProductData.BucketsPieces.map((item, index) => (
                    <ProductCard
                        img={item.img}
                        title={item.title}
                        desc={item.desc}
                        price={item.price}
                        item={item}
                        key={index}
                    />
                ));
            case 'SnacksSides':
                return ProductData.SnacksSides.map((item, index) => (
                    <ProductCard
                        img={item.img}
                        title={item.title}
                        desc={item.desc}
                        price={item.price}
                        item={item}
                        key={index}
                    />
                ));
            case 'BeveragesDesserts':
                return ProductData.BeveragesDesserts.map((item, index) => (
                    <ProductCard
                        img={item.img}
                        title={item.title}
                        desc={item.desc}
                        price={item.price}
                        item={item}
                        key={index}
                    />
                ));
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="bg-white animate-pulse backdrop-filter backdrop-blur-lg bg-opacity-100 ">
                <ul
                    className="flex flex-wrap -mb-px text-sm font-medium text-center justify-center"
                    id="myTab"
                    data-tabs-toggle="#myTabContent"
                    role="tablist"
                >
                    <li className="mr-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${selectedTab === 'Burgerswraps' ? 'border-black' : 'border-transparent'
                                }`}
                            id="profile-tab"
                            data-tabs-target="#profile"
                            type="button"
                            role="tab"
                            aria-controls="profile"
                            aria-selected={selectedTab === 'Burgerswraps'}
                            onClick={() => handleTabClick('Burgerswraps')}
                        >
                            <div class="h-2.5 bg-gray-700 rounded-full dark:bg-gray-700 w-48 "></div>
                        </button>
                    </li>
                    <li className="mr-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${selectedTab === 'BucketsPieces' ? 'border-black' : 'border-transparent'
                                }`}
                            id="dashboard-tab"
                            data-tabs-target="#dashboard"
                            type="button"
                            role="tab"
                            aria-controls="dashboard"
                            aria-selected={selectedTab === 'BucketsPieces'}
                            onClick={() => setSelectedTab('BucketsPieces')}
                        >
                            <div class="h-2.5 bg-gray-700 rounded-full dark:bg-gray-700 w-48"></div>
                        </button>
                    </li>
                    <li className="mr-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${selectedTab === 'SnacksSides' ? 'border-black' : 'border-transparent'}`}
                            id="settings-tab"
                            data-tabs-target="#settings"
                            type="button"
                            role="tab"
                            aria-controls="settings"
                            aria-selected={selectedTab === 'SnacksSides'}
                            onClick={() => setSelectedTab('SnacksSides')}
                        >
                            <div class="h-2.5 bg-gray-700 rounded-full dark:bg-gray-700 w-48 "></div>
                        </button>
                    </li>
                    <li role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${selectedTab === 'BeveragesDesserts' ? 'border-black' : 'border-transparent'}`}
                            id="contacts-tab"
                            data-tabs-target="#contacts"
                            type="button"
                            role="tab"
                            aria-controls="contacts"
                            aria-selected={selectedTab === 'BeveragesDesserts'}
                            onClick={() => setSelectedTab('BeveragesDesserts')}
                        >
                            <div class="h-2.5 bg-gray-700 rounded-full dark:bg-gray-700 w-48"></div>
                        </button>
                    </li>
                </ul>
            </div>
            <div className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-4 px-20 gap-6">
                    {renderProducts(selectedTab)}
                </div>
            </div>
        </div>
    )
}
