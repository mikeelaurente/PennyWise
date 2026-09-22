function CategoriesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          disabled
          className="bg-gray-300 text-gray-500 px-4 py-2 rounded cursor-not-allowed"
        >
          Add Category
        </button>
      </div>

      <div className="border border-dashed rounded p-8 text-center">
        <p className="text-gray-600 font-medium">Coming Soon</p>
        <p className="text-sm text-gray-500 mt-2">
          Category management will be available soon. This feature is currently
          in development.
        </p>
      </div>
    </div>
  );
}

export default CategoriesPage;
