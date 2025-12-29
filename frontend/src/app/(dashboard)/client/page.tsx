"use client";
import ClientDashboardSummary from "@/components/sections/ClientDashboardSummary";
import LastSubmittedFeedback from "@/components/sections/LastSubmittedFeedback";
import { queryCache } from "@/utils/queryCache";

function page() {
  return (
    <div>
      <button onClick={() => queryCache.invalidate(["latest-feedback"])}>Invalid query</button>
      <ClientDashboardSummary />
      <LastSubmittedFeedback />
    </div>
  );
}

export default page;
