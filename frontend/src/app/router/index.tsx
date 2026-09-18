import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import AppLayout from '../layouts/AppLayout';
import AccountsPage from '../features/accounts/pages/AccountsPage';
import BudgetsPage from '../features/budgets/pages/BudgetsPage';
import CategoriesPage from '../features/categories/pages/CategoriesPage';
import SavingsPage from '../features/savings/pages/SavingsPage';
import TransactionsPage from '../features/transactions/pages/TransactionsPage';

function HomePage() {
  return <h1>PennyWise Home</h1>;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<HomePage />} />
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
