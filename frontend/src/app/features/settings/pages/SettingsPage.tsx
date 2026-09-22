import { Icon } from '../../../shared/components';

function SettingsPage() {
  return (
    <div className="space-y-[32px]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[16px]">
        <div>
          <h1 className="text-[28px] font-semibold text-[#17201B]">Settings</h1>
          <p className="text-[13px] text-[#6B746D] mt-[8px]">
            Manage your account and application preferences.
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[16px] text-center py-[32px]">
        <Icon
          name="settings"
          size={48}
          className="mx-auto text-[#6B746D] mb-[16px] opacity-50"
        />
        <p className="text-[14px] font-medium text-[#6B746D]">Coming Soon</p>
        <p className="text-[13px] text-[#6B746D] mt-[8px]">
          Settings management will be available soon. This feature is currently
          in development.
        </p>
      </div>
    </div>
  );
}

export default SettingsPage;
