import React, { useState } from 'react'
import ProductData from '../../../Universal/data/ProductData';
import ProductCard from './PBC_Loading_skeleton';

export default function PBG_Loading_skeleton() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-12 px-6 gap-6 ">
            {renderProducts(selectedTab)}
        </div>
    )
}
