import { Fragment } from "react";
import SpinnerIcon from "../icons/SpinnerIcon";
import Button from "../common/Button";
import Input from "../common/Input";

export default function CategoryRegisterSubmitSkeleton({ category }) {
  return (
    <Fragment>
      <title>Prese | Category Register</title>
      <section className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-20">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 opacity-80">
          <div className="flex items-center mb-6 text-4xl font-semibold text-gray-900">
            Administrator Tools
          </div>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Add Category
              </h1>
              <form className="space-y-4 md:space-y-6">
                <Input
                  htmlFor="category"
                  labelName="Category name"
                  type="text"
                  value={category.name}
                  name="name"
                  id="category"
                />
                <Button type="submit">Create</Button>
              </form>
            </div>
          </div>
        </div>
        <SpinnerIcon />
      </section>
    </Fragment>
  );
}
