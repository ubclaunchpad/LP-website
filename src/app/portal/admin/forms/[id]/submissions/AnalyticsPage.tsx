"use client";
import { FormChart } from "@/app/portal/admin/forms/[id]/submissions/formDataChart";
import { getFormAnalytics } from "@/lib/utils/forms/analytics";
import { ReferenceMap } from "./columns";

export default function AnalyticsPage({
  submissions,
  refMap,
  columns,
}: {
  submissions: any[];
  refMap: ReferenceMap;
  columns: string[];
}) {
  const { data } = useChartData({
    columns: columns,
    submissions: submissions,
    refMap: refMap,
  });

  return (
    <div className="overflow-hidden flex flex-col max-w-screen pb-32 ">
      <section className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2  gap-4 ">
        {data.analyticsData.map((chartData, index) => (
          <FormChart
            key={index}
            chartInfo={chartData.charInfo}
            chartConfig={chartData.chartConfig}
            chartData={chartData.chartData}
          />
        ))}
      </section>
    </div>
  );
}

function useChartData({
  columns,
  submissions,
  refMap,
}: {
  columns: string[];
  submissions: any;
  refMap: ReferenceMap;
}) {
  const data: { analyticsData: any[]; stats?: any } = getFormAnalytics(
    { columns },
    submissions ? submissions : [],
    refMap,
  );

  return { data };
}
