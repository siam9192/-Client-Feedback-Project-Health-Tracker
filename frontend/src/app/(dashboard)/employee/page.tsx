import EmployeeDashboardSummary from "@/components/sections/EmployeeDashboardSummary";
import PendingCheckins from "@/components/sections/PendingCheckins";

function Page() {
  return (
    <div>
      <EmployeeDashboardSummary />
      <PendingCheckins />
    </div>
  );
}

export default Page;
