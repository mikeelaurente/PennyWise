import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar, MobileHeader } from '../shared/components';

interface SpaceOption {
  id: string;
  name: string;
  type: 'personal' | 'shared';
}

function AppLayout() {
  const [currentSpace, setCurrentSpace] = useState<SpaceOption>({
    id: '1',
    name: 'Mikee Personal',
    type: 'personal',
  });

  const spaces: SpaceOption[] = [
    { id: '1', name: 'Mikee Personal', type: 'personal' },
    { id: '2', name: 'Mikee & Tan', type: 'shared' },
  ];

  const handleSpaceChange = (space: SpaceOption) => {
    setCurrentSpace(space);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9]">
      <MobileHeader
        currentSpace={currentSpace}
        spaces={spaces}
        onSpaceChange={handleSpaceChange}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar
          currentSpace={currentSpace}
          spaces={spaces}
          onSpaceChange={handleSpaceChange}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full px-[16px] py-[16px] md:px-[32px] md:py-[16px] lg:px-[48px] max-w-7xl mx-auto w-full">
            <Outlet context={{ currentSpace, spaces }} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
