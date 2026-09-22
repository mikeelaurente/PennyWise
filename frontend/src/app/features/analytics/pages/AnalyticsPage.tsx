import { Icon } from '../../../shared/components';

function AnalyticsPage() {
  return (
    <div className="space-y-[32px]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[16px]">
        <div>
          <h1 className="text-[28px] font-semibold text-[#17201B]">
            Analytics
          </h1>
          <p className="text-[13px] text-[#6B746D] mt-[8px]">
            Insights into your spending and financial trends.
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[16px] text-center py-[32px]">
        <Icon
          name="analytics"
          size={48}
          className="mx-auto text-[#6B746D] mb-[16px] opacity-50"
        />
        <p className="text-[14px] font-medium text-[#6B746D]">Coming Soon</p>
        <p className="text-[13px] text-[#6B746D] mt-[8px]">
          Analytics and insights will be available soon. This feature is
          currently in development.
        </p>
      </div>
    </div>
  );
}

export default AnalyticsPage;
