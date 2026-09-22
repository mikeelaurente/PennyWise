import { Icon } from '../../../shared/components';

function BudgetsPage() {
  return (
    <div className="space-y-[32px]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[16px]">
        <div>
          <h1 className="text-[28px] font-semibold text-[#17201B]">Budgets</h1>
          <p className="text-[13px] text-[#6B746D] mt-[8px]">
            Set and monitor spending limits for categories.
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center px-[16px] py-[8px] bg-[#16A34A] hover:bg-[#15803D] text-white rounded-[8px] font-medium transition-colors w-full md:w-auto"
          disabled
        >
          <Icon name="plus" size={18} className="mr-[8px]" />
          Add Budget
        </button>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-[16px] text-center py-[32px]">
        <Icon
          name="budgets"
          size={48}
          className="mx-auto text-[#6B746D] mb-[16px] opacity-50"
        />
        <p className="text-[14px] font-medium text-[#6B746D]">Coming Soon</p>
        <p className="text-[13px] text-[#6B746D] mt-[8px]">
          Budget management will be available soon. This feature is currently in
          development.
        </p>
      </div>
    </div>
  );
}

export default BudgetsPage;
