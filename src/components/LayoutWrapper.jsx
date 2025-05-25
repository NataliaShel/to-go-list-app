const LayoutWrapper = ({ title, children }) => (
  <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{title}</h1>
    {children}
  </div>
);

export default LayoutWrapper;
