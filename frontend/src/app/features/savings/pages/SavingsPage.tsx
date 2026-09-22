function SavingsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Savings</h1>
        <button
          disabled
          className="bg-gray-300 text-gray-500 px-4 py-2 rounded cursor-not-allowed"
        >
          Add Goal
        </button>
      </div>

      <div className="border border-dashed rounded p-8 text-center">
        <p className="text-gray-600 font-medium">Coming Soon</p>
        <p className="text-sm text-gray-500 mt-2">
          Savings goals will be available soon. This feature is currently in
          development.
        </p>
      </div>
    </div>
  );
}

export default SavingsPage;
