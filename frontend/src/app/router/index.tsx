import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import AppLayout from '../layouts/AppLayout';
import AccountsPage from '../features/accounts/pages/AccountsPage';
import BudgetsPage from '../features/budgets/pages/BudgetsPage';
import CategoriesPage from '../features/categories/pages/CategoriesPage';
import SavingsPage from '../features/savings/pages/SavingsPage';
import TransactionsPage from '../features/transactions/pages/TransactionsPage';

function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-600 text-sm">Total Balance</p>
          <p className="text-2xl font-bold mt-2">$0.00</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-600 text-sm">This Month</p>
          <p className="text-2xl font-bold mt-2">$0.00</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-600 text-sm">Budgets</p>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-600 text-sm">Accounts</p>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
      </div>

      <div className="border border-dashed rounded p-8 text-center text-gray-500">
        <p>Dashboard content coming soon</p>
        <p className="text-sm mt-2">
          Start by adding an account to see your financial overview
        </p>
      </div>
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="accounts" element={<AccountsPage />} />
          <Route path="budgets" element={<BudgetsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="savings" element={<SavingsPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
