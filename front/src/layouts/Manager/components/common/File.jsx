import React from "react";

export default function File({
  children,
  htmlFor,
  labelName,
  props,
  type,
  value,
  name,
  id,
  onChange,
}) {
  return (
    <div className="">
      <label
        htmlFor={htmlFor}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {labelName}
      </label>
      <input
        {...props}
        type={type}
        value={value}
        name={name}
        id={id}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4.5 text-wrap"
        required=""
      />
      {children}
    </div>
  );
}
