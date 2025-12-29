import { DashboardSummary } from "@/types";

interface Props {
  data: DashboardSummary;
}

const DashboardSummaryCard = ({ data }: Props) => {
  const Icon = data.icon;

  return (
    <div className="flex flex-col items-center justify-center p-3 md:p-5 bg-base-100 rounded-2xl  hover:shadow-lg transition-shadow duration-200 space-y-4">
      {/* Icon */}
      <div className="flex items-center justify-center w-14 h-14 bg-primary/10 text-primary rounded-full">
        <Icon size={24} />
      </div>

      {/* Label */}
      <span className="lg:text-lg font-semibold text-center opacity-80 font-secondary">
        {data.label}
      </span>

      {/* Value */}
      <p className="text-2xl md:text-3xl font-bold text-center text-base-content font-primary">
        {data.value}
      </p>
    </div>
  );
};

export default DashboardSummaryCard;
