import { NavLink, Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 border-b">
        <h1 className="text-2xl font-bold">PennyWise</h1>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 border-r">
          <nav className="flex flex-col space-y-2">
            <NavLink
              to="/app"
              end
              className={({ isActive }) =>
                isActive ? 'text-blue-500 font-bold' : 'text-gray-700'
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/app/accounts"
              end
              className={({ isActive }) =>
                isActive ? 'text-blue-500 font-bold' : 'text-gray-700'
              }
            >
              Accounts
            </NavLink>
            <NavLink
              to="/app/budgets"
              end
              className={({ isActive }) =>
                isActive ? 'text-blue-500 font-bold' : 'text-gray-700'
              }
            >
              Budgets
            </NavLink>
            <NavLink
              to="/app/categories"
              end
              className={({ isActive }) =>
                isActive ? 'text-blue-500 font-bold' : 'text-gray-700'
              }
            >
              Categories
            </NavLink>
            <NavLink
              to="/app/savings"
              end
              className={({ isActive }) =>
                isActive ? 'text-blue-500 font-bold' : 'text-gray-700'
              }
            >
              Savings
            </NavLink>
            <NavLink
              to="/app/transactions"
              end
              className={({ isActive }) =>
                isActive ? 'text-blue-500 font-bold' : 'text-gray-700'
              }
            >
              Transactions
            </NavLink>
          </nav>
        </aside>

        <main className="flex-1 p-6 flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
