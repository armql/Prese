export default function Textarea({
  children,
  props,
  htmlFor,
  labelName,
  value,
  onChange,
  name,
  id,
}) {
  return (
    <div className="form-group mb-2">
      <label
        htmlFor={htmlFor}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {labelName}
      </label>
      <textarea
        {...props}
        placeholder={labelName}
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        className="bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      ></textarea>
      {children}
    </div>
  );
}
