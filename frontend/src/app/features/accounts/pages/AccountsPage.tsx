import { useState, useEffect } from 'react';
import apiClient from '../../../shared/api/apiClient';
import type { Account } from '../../../shared/api/types';

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
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Accounts</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Account
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded mb-4">{error}</div>
      )}

      {loading ? (
        <div className="text-center py-8 text-gray-500">
          Loading accounts...
        </div>
      ) : accounts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No accounts yet.</p>
          <p className="text-sm mt-2">Create one to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="border rounded p-4 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{account.name}</h3>
                  <p className="text-sm text-gray-600">{account.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">
                    {account.currency} {account.balance.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AccountsPage;
