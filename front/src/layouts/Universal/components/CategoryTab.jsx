import { useEffect, useState } from "react";
import axiosClient from "../../../api/axios";
import ProductCard from "./ProductCard";
import ProductDisplaySkeleton from "./core/ProductDisplayTab_skeleton";

export default function CategoryTab() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    axiosClient
      .get("category")
      .then((response) => {
        setCategories(response.data.categories);
        setSelectedTab(response.data.categories[0]?.name);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  if (loading) {
    return <ProductDisplaySkeleton />;
  }
  const renderProducts = (tabName) => {
    const selectedCategory = categories.find(
      (category) => category.name === tabName
    );
    if (selectedCategory) {
      return selectedCategory.products.map((item, index) => {
        const imageURL = item.preview.replace("front", "");
        return (
          <ProductCard
            preview={imageURL}
            name={item.name}
            description={item.description}
            retail_price={item.retail_price}
            item={item}
            key={index}
          />
        );
      });
    }
    return null;
  };
  return (
    <div>
      <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-100">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center justify-center"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          {categories.map((category) => (
            <li className="mr-2" role="presentation" key={category.id}>
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  selectedTab === category.name
                    ? "border-black"
                    : "border-transparent"
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
      </div>
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-4 xl:px-20 lg:px-16 md:px-12 sm:px-8 px-4 gap-6">
          {renderProducts(selectedTab)}
        </div>
      </div>
    </div>
  );
}
