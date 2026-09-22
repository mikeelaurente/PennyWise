import { useState, useEffect } from 'react';
import apiClient from '../../../shared/api/apiClient';
import type { Account } from '../../../shared/api/types';
import { Icon } from '../../../shared/components';

function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAccounts() {
      const response = await apiClient<Account[]>('/accounts');

      if (response.status === 'success' && response.data) {
        setAccounts(response.data);
      } else {
        setError(response.message || 'Failed to load accounts');
      }

      setLoading(false);
    }

    fetchAccounts();
  }, []);

  return (
    <div className="space-y-[32px]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[16px]">
        <div>
          <h1 className="text-[28px] font-semibold text-[#17201B]">Accounts</h1>
          <p className="text-[13px] text-[#6B746D] mt-[8px]">
            Manage the accounts connected to this Space.
          </p>
        </div>
        <button className="inline-flex items-center justify-center px-[16px] py-[8px] bg-[#16A34A] hover:bg-[#15803D] text-white rounded-[8px] font-medium transition-colors w-full md:w-auto">
          <Icon name="plus" size={18} className="mr-[8px]" />
          Add Account
        </button>
      </div>

      {error && (
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[16px] bg-red-50 border-red-200">
          <p className="text-[14px] text-[#DC2626]">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[16px] text-center py-[24px]">
          <p className="text-[14px] text-[#6B746D]">Loading accounts...</p>
        </div>
      ) : accounts.length === 0 ? (
        <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[16px] text-center py-[24px]">
          <Icon
            name="accounts"
            size={48}
            className="mx-auto text-[#6B746D] mb-[16px] opacity-50"
          />
          <p className="text-[14px] text-[#6B746D]">No accounts yet.</p>
          <p className="text-[13px] text-[#6B746D] mt-[8px]">
            Add your first account to start tracking your finances.
          </p>
          <button className="inline-flex items-center justify-center px-[16px] py-[8px] bg-[#16A34A] hover:bg-[#15803D] text-white rounded-[8px] font-medium transition-colors mt-[16px] w-full md:w-auto mx-auto">
            <Icon name="plus" size={16} className="mr-[8px]" />
            Add Account
          </button>
        </div>
      ) : (
        <div className="bg-white border border-[#E5E7EB] rounded-[12px]">
          <div className="space-y-[8px]">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-[16px] border-b border-[#E5E7EB] last:border-b-0 hover:bg-[#F8FAF9] transition-colors cursor-pointer"
              >
                <div className="flex-1">
                  <h3 className="text-[14px] font-medium text-[#17201B]">
                    {account.name}
                  </h3>
                  <p className="text-[13px] text-[#6B746D]">{account.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-[20px] font-semibold text-[#17201B]">
                    {account.currency} {account.balance.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountsPage;
