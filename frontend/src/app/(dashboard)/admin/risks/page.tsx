import RiskCard from "@/components/ui/RiskCard";




function page() {
  return (
    <main className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Project Risks
        </h1>
        <p className="text-sm text-gray-500">
          Track, assess, and mitigate project risks
        </p>
      </div>

      {/* Risks List */}
      <div className="grid grid-cols-3 gap-5">
        {Array.from({length:20}).map((risk,index) => (
       <RiskCard key={index}/>
        ))}
      </div>
    </main>
  );
}

export default page;
