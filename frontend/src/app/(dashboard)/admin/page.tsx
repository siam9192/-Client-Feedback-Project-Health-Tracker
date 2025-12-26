
 import HighRiskProjects from "@/components/sections/HighRiskProjects";
import MissingCheckIns from "@/components/sections/MissingCheckIns";
import MetadataCard from "@/components/ui/MetadataCard";
import { Metadata } from "@/types";
import {Users, CheckSquare, AlertCircle, Folder } from "lucide-react";

function Page() {
 
 const metadata: Metadata[] = [
  {
    label: "Total Users",
    icon: Users,
    value: 1245,
  },
  {
    label: "Active Projects",
    icon: Folder,
    value: 87,
  },
  {
    label: "Pending Tasks",
    icon: CheckSquare,
    value: 34,
  },
  {
    label: "High-Risk Projects",
    icon: AlertCircle,
    value: 5,
  },
];


  return (
    <main className="w-full">
     

      {/* Grid Container for Cards / Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {
          metadata.map(data=>(<MetadataCard key={data.label} data={data} />))
        }
      </div>

   
       <MissingCheckIns/>
       <HighRiskProjects/>
   
    </main>
  );
}

export default Page;
