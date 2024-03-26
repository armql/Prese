import { Fragment } from "react";
import SpinnerIcon from "../icons/SpinnerIcon";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import Textarea from "../common/Textarea";
import File from "../common/File";

export default function ProductRegisterSubmitSkeleton({ product, categories }) {
  return (
    <Fragment>
      <title>Prese | Product Register</title>
      <section className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 p-20">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 opacity-80">
          <div className="flex items-center mb-6 text-4xl font-semibold text-gray-900">
            Administrator Tools
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                Add Product
              </h1>
              <form className="space-y-4 md:space-y-6">
                <File
                  htmlFor="preview"
                  labelName={"Product Image"}
                  type="file"
                  name="preview"
                  id="preview"
                />
                <Input
                  htmlFor="name"
                  labelName="Product Name"
                  type="text"
                  value={product.name}
                  name="name"
                  id="name"
                />
                <Textarea
                  htmlFor="description"
                  labelName="Product Description"
                  name="description"
                  value={product.description}
                />
                <Select
                  labelName="Product Category"
                  htmlFor="category_id"
                  optionName="Choose a category"
                  raw_data={categories}
                  name="category_id"
                  id="category"
                />
                <Input
                  htmlFor="retail_price"
                  labelName="Retail Price"
                  type="number"
                  value={product.retail_price}
                  name="retail_price"
                  id="retail_price"
                />
                <Input
                  htmlFor="market_price"
                  labelName="Market Price"
                  type="number"
                  value={product.market_price}
                  name="market_price"
                  id="market_price"
                />
                <Button type="submit">Create</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <SpinnerIcon />
    </Fragment>
  );
}
