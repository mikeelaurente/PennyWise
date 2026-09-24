import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useInitializeAuth } from '../features/auth/hooks/useInitializeAuth';
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute';
import { PublicOnlyRoute } from '../features/auth/components/PublicOnlyRoute';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import AppLayout from '../layouts/AppLayout';
import AccountsPage from '../features/accounts/pages/AccountsPage';
import BudgetsPage from '../features/budgets/pages/BudgetsPage';
import CategoriesPage from '../features/categories/pages/CategoriesPage';
import SavingsPage from '../features/savings/pages/SavingsPage';
import TransactionsPage from '../features/transactions/pages/TransactionsPage';
import AnalyticsPage from '../features/analytics/pages/AnalyticsPage';
import SettingsPage from '../features/settings/pages/SettingsPage';
import { Icon } from '../shared/components';

function DashboardPage() {
  return (
    <div className="space-y-[32px]">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[16px]">
        <div>
          <h1 className="text-[28px] font-semibold text-[#17201B]">
            Dashboard
          </h1>
          <p className="text-[13px] text-[#6B746D] mt-[8px]">
            Overview of your financial activity
          </p>
        </div>
        <button className="inline-flex items-center justify-center px-[16px] py-[8px] bg-[#16A34A] hover:bg-[#15803D] text-white rounded-[8px] font-medium transition-colors w-full md:w-auto">
          <Icon name="plus" size={18} className="mr-[8px]" />
          Add Transaction
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-[16px] md:grid-cols-2 lg:grid-cols-4">
        {/* Total Balance */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[16px]">
          <p className="text-[13px] text-[#6B746D]">Total Balance</p>
          <div className="mt-[12px]">
            <p className="text-[28px] font-semibold text-[#17201B]">₱0.00</p>
          </div>
          <p className="text-[12px] text-[#6B746D] mt-[12px]">
            Across all accounts
          </p>
        </div>

        {/* This Month Income */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[16px]">
          <p className="text-[13px] text-[#6B746D]">Income</p>
          <div className="mt-[12px]">
            <p className="text-[28px] font-semibold text-[#16A34A]">₱0.00</p>
          </div>
          <p className="text-[12px] text-[#6B746D] mt-[12px]">This month</p>
        </div>

        {/* This Month Expenses */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[16px]">
          <p className="text-[13px] text-[#6B746D]">Expenses</p>
          <div className="mt-[12px]">
            <p className="text-[28px] font-semibold text-[#DC2626]">₱0.00</p>
          </div>
          <p className="text-[12px] text-[#6B746D] mt-[12px]">This month</p>
        </div>

        {/* Net Cash Flow */}
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[16px]">
          <p className="text-[13px] text-[#6B746D]">Net Cash Flow</p>
          <div className="mt-[12px]">
            <p className="text-[28px] font-semibold text-[#16A34A]">₱0.00</p>
          </div>
          <p className="text-[12px] text-[#6B746D] mt-[12px]">This month</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-[24px] lg:grid-cols-3">
        {/* Left Column - Accounts & Recent Transactions */}
        <div className="lg:col-span-2 space-y-[24px]">
          {/* Accounts Section */}
          <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[16px]">
            <div className="flex items-center justify-between mb-[16px]">
              <h2 className="text-[20px] font-semibold text-[#17201B]">
                Accounts
              </h2>
              <button className="text-[#16A34A] hover:text-[#15803D] font-medium text-[14px] flex items-center">
                <Icon name="plus" size={18} className="mr-[4px]" />
                Add Account
              </button>
            </div>
            <div className="border-t border-[#E5E7EB] pt-[16px]">
              <div className="text-center py-[24px]">
                <p className="text-[14px] text-[#6B746D]">No accounts yet.</p>
                <p className="text-[13px] text-[#6B746D] mt-[8px]">
                  Add your first account to start tracking your finances.
                </p>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[16px]">
            <div className="flex items-center justify-between mb-[16px]">
              <h2 className="text-[20px] font-semibold text-[#17201B]">
                Recent Transactions
              </h2>
              <button className="text-[#16A34A] hover:text-[#15803D] font-medium text-[14px] flex items-center">
                <Icon name="plus" size={18} className="mr-[4px]" />
                Add Transaction
              </button>
            </div>
            <div className="border-t border-[#E5E7EB] pt-[16px]">
              <div className="text-center py-[24px]">
                <p className="text-[14px] text-[#6B746D]">
                  No transactions yet.
                </p>
                <p className="text-[13px] text-[#6B746D] mt-[8px]">
                  Transactions will appear here as you track your spending.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Budget & Savings */}
        <div className="space-y-[24px]">
          {/* Budget Overview */}
          <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[16px]">
            <div className="flex items-center justify-between mb-[16px]">
              <h2 className="text-[20px] font-semibold text-[#17201B]">
                Budget
              </h2>
              <button className="text-[#16A34A] hover:text-[#15803D] font-medium text-[14px] flex items-center">
                <Icon name="plus" size={18} className="mr-[4px]" />
                Create
              </button>
            </div>
            <div className="border-t border-[#E5E7EB] pt-[16px]">
              <div className="text-center py-[16px]">
                <p className="text-[14px] text-[#6B746D]">
                  No budget for this month.
                </p>
                <p className="text-[13px] text-[#6B746D] mt-[8px]">
                  Create a budget to track spending limits.
                </p>
              </div>
            </div>
          </div>

          {/* Savings Goals */}
          <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[16px]">
            <div className="flex items-center justify-between mb-[16px]">
              <h2 className="text-[20px] font-semibold text-[#17201B]">
                Savings Goals
              </h2>
              <button className="text-[#16A34A] hover:text-[#15803D] font-medium text-[14px] flex items-center">
                <Icon name="plus" size={18} className="mr-[4px]" />
                Create
              </button>
            </div>
            <div className="border-t border-[#E5E7EB] pt-[16px]">
              <div className="text-center py-[16px]">
                <p className="text-[14px] text-[#6B746D]">
                  No savings goals yet.
                </p>
                <p className="text-[13px] text-[#6B746D] mt-[8px]">
                  Set goals to track your progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppRouter() {
  useInitializeAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="accounts" element={<AccountsPage />} />
            <Route path="budgets" element={<BudgetsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="savings" element={<SavingsPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
