import React, { useState } from 'react';
import { Icon } from './Icon';

interface SpaceOption {
  id: string;
  name: string;
  type: 'personal' | 'shared';
}

interface MobileHeaderProps {
  currentSpace?: SpaceOption;
  spaces?: SpaceOption[];
  onSpaceChange?: (space: SpaceOption) => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  currentSpace = { id: '1', name: 'Mikee Personal', type: 'personal' },
  spaces = [
    { id: '1', name: 'Mikee Personal', type: 'personal' },
    { id: '2', name: 'Mikee & Tan', type: 'shared' },
  ],
  onSpaceChange,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSpaceSelect = (space: SpaceOption) => {
    onSpaceChange?.(space);
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header className="md:hidden h-16 border-b border-[#E5E7EB] bg-white flex items-center justify-between px-[16px]">
        <h1 className="text-2xl font-bold text-[#16A34A]">PennyWise</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-[12px] hover:bg-[#F8FAF9] rounded-[8px] transition-colors"
        >
          <Icon name="menu" size={24} className="text-[#17201B]" />
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="fixed top-16 left-0 w-64 max-w-[90vw] bg-white border-r border-[#E5E7EB] z-50 h-[calc(100vh-64px)] overflow-y-auto">
            {/* Mobile Sidebar Content */}
            <div className="py-[16px] border-b border-[#E5E7EB]">
              <div className="px-[16px]">
                <div className="px-[16px] py-[12px] bg-[#F8FAF9] border border-[#E5E7EB] rounded-[8px]">
                  <p className="text-[12px] text-[#6B746D]">Current Space</p>
                  <p className="text-[14px] font-medium text-[#17201B] mt-[4px]">
                    {currentSpace?.name || 'Select Space'}
                  </p>
                </div>
              </div>
            </div>

            {/* Space Selection */}
            <div className="px-[16px] py-[16px] border-b border-[#E5E7EB]">
              <p className="text-[12px] font-medium text-[#6B746D] mb-[8px]">
                Your Spaces
              </p>
              <div className="space-y-[8px]">
                {spaces.map((space) => (
                  <button
                    key={space.id}
                    onClick={() => handleSpaceSelect(space)}
                    className={`w-full text-left px-[12px] py-[8px] rounded-[8px] transition-colors ${
                      currentSpace?.id === space.id
                        ? 'bg-[#DCFCE7] text-[#16A34A]'
                        : 'hover:bg-[#F8FAF9] text-[#17201B]'
                    }`}
                  >
                    <p className="text-[14px] font-medium">{space.name}</p>
                    <p className="text-[12px] opacity-75">
                      {space.type === 'personal'
                        ? 'Personal Space'
                        : 'Shared Space'}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="px-[16px] py-[16px]">
              {/* Navigation items would be inserted here */}
            </nav>
          </div>
        </>
      )}
    </>
  );
};
