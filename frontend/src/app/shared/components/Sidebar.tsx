import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Icon } from './Icon';
import { useAuthStore } from '../../features/auth/store/useAuthStore';

interface SpaceOption {
  id: string;
  name: string;
  type: 'personal' | 'shared';
}

interface SidebarProps {
  currentSpace?: SpaceOption;
  spaces?: SpaceOption[];
  onSpaceChange?: (space: SpaceOption) => void;
}

const NAVIGATION_ITEMS = [
  { path: '/app', label: 'Dashboard', icon: 'dashboard' as const },
  { path: '/app/accounts', label: 'Accounts', icon: 'accounts' as const },
  {
    path: '/app/transactions',
    label: 'Transactions',
    icon: 'transactions' as const,
  },
  { path: '/app/budgets', label: 'Budgets', icon: 'budgets' as const },
  { path: '/app/savings', label: 'Savings Goals', icon: 'savings' as const },
  { path: '/app/analytics', label: 'Analytics', icon: 'analytics' as const },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentSpace = { id: '1', name: 'Mikee Personal', type: 'personal' },
  spaces = [
    { id: '1', name: 'Mikee Personal', type: 'personal' },
    { id: '2', name: 'Mikee & Tan', type: 'shared' },
  ],
  onSpaceChange,
}) => {
  const navigate = useNavigate();
  const [isSpaceMenuOpen, setIsSpaceMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  const handleLogout = () => {
    clearUser();
    navigate('/login');
  };

  const handleSpaceSelect = (space: SpaceOption) => {
    onSpaceChange?.(space);
    setIsSpaceMenuOpen(false);
  };

  return (
    <aside className="hidden md:flex md:flex-col w-64 border-r border-[#E5E7EB] bg-white">
      {/* Logo */}
      <div className="p-[16px] border-b border-[#E5E7EB]">
        <h1 className="text-2xl font-bold text-[#16A34A]">PennyWise</h1>
      </div>

      {/* Space Selector */}
      <div className="px-[16px] py-[16px] border-b border-[#E5E7EB]">
        <div className="relative">
          <button
            onClick={() => setIsSpaceMenuOpen(!isSpaceMenuOpen)}
            className="w-full flex items-center justify-between px-[16px] py-[12px] bg-[#F8FAF9] border border-[#E5E7EB] rounded-[8px] hover:bg-[#EFF3F1] transition-colors"
          >
            <div className="text-left flex-1">
              <p className="text-[12px] text-[#6B746D]">Current Space</p>
              <p className="text-[14px] font-medium text-[#17201B]">
                {currentSpace.name}
              </p>
            </div>
            <Icon
              name="chevron-down"
              size={16}
              className="text-[#6B746D] flex-shrink-0"
            />
          </button>

          {/* Space Dropdown */}
          {isSpaceMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-[8px] bg-white border border-[#E5E7EB] rounded-[8px] shadow-subtle z-50 overflow-hidden">
              <div className="px-[16px] py-[12px] border-b border-[#E5E7EB]">
                <p className="text-[12px] font-medium text-[#6B746D]">
                  Your Spaces
                </p>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {spaces.map((space) => (
                  <button
                    key={space.id}
                    onClick={() => handleSpaceSelect(space)}
                    className={`w-full text-left px-[16px] py-[12px] hover:bg-[#DCFCE7] transition-colors ${
                      currentSpace.id === space.id ? 'bg-[#DCFCE7]' : ''
                    }`}
                  >
                    <p className="text-[14px] font-medium text-[#17201B]">
                      {space.name}
                    </p>
                    <p className="text-[12px] text-[#6B746D]">
                      {space.type === 'personal'
                        ? 'Personal Space'
                        : 'Shared Space'}
                    </p>
                  </button>
                ))}
              </div>
              <div className="px-[16px] py-[12px] border-t border-[#E5E7EB]">
                <button className="w-full text-left flex items-center text-[#16A34A] hover:text-[#15803D] font-medium text-[14px]">
                  <Icon name="plus" size={16} className="mr-[8px]" />
                  Create Space
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-[16px] py-[16px]">
        <div className="space-y-[8px]">
          {NAVIGATION_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/app'}
              className={({ isActive }) =>
                `flex items-center space-x-[8px] px-[16px] py-[12px] rounded-[8px] font-medium text-[14px] transition-colors ${
                  isActive
                    ? 'bg-[#DCFCE7] text-[#16A34A]'
                    : 'text-[#17201B] hover:bg-[#F8FAF9]'
                }`
              }
            >
              <Icon name={item.icon} size={20} className="flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Settings & User Area */}
      <div className="border-t border-[#E5E7EB] px-[16px] py-[16px] space-y-[8px]">
        <NavLink
          to="/app/settings"
          className={({ isActive }) =>
            `flex items-center space-x-[8px] px-[16px] py-[12px] rounded-[8px] font-medium text-[14px] transition-colors ${
              isActive
                ? 'bg-[#DCFCE7] text-[#16A34A]'
                : 'text-[#17201B] hover:bg-[#F8FAF9]'
            }`
          }
        >
          <Icon name="settings" size={20} className="flex-shrink-0" />
          <span>Settings</span>
        </NavLink>

        <button className="w-full flex items-center space-x-[8px] px-[16px] py-[12px] rounded-[8px] font-medium text-[14px] text-[#17201B] hover:bg-[#F8FAF9] transition-colors">
          <Icon name="user" size={20} className="flex-shrink-0" />
          <span>{user?.name || 'Profile'}</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-[8px] px-[16px] py-[12px] rounded-[8px] font-medium text-[14px] text-[#DC2626] hover:bg-red-50 transition-colors"
        >
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
