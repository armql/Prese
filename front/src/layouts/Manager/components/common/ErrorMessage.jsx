export default function ErrorMessage({ children }) {
  return (
    <div className="mt-1 fixed">
      <span className="text-red-500 text-sm">{children}</span>
    </div>
  );
}
