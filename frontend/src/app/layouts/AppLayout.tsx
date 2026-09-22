import { NavLink, Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 border-b bg-white flex items-center px-6">
        <h1 className="text-2xl font-bold">PennyWise</h1>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-gray-50">
          <nav className="flex flex-col space-y-1 p-4">
            <NavLink
              to="/app"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded transition ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-200'
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/app/accounts"
              className={({ isActive }) =>
                `px-4 py-2 rounded transition ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-200'
                }`
              }
            >
              Accounts
            </NavLink>
            <NavLink
              to="/app/budgets"
              className={({ isActive }) =>
                `px-4 py-2 rounded transition ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-200'
                }`
              }
            >
              Budgets
            </NavLink>
            <NavLink
              to="/app/categories"
              className={({ isActive }) =>
                `px-4 py-2 rounded transition ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-200'
                }`
              }
            >
              Categories
            </NavLink>
            <NavLink
              to="/app/savings"
              className={({ isActive }) =>
                `px-4 py-2 rounded transition ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-200'
                }`
              }
            >
              Savings
            </NavLink>
            <NavLink
              to="/app/transactions"
              className={({ isActive }) =>
                `px-4 py-2 rounded transition ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-200'
                }`
              }
            >
              Transactions
            </NavLink>
          </nav>
        </aside>

        <main className="flex-1 p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
