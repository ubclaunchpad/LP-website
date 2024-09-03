"use client";
import { FormChart } from "@/app/portal/admin/forms/[id]/submissions/formDataChart";
import { formContext } from "@/components/layouts/formTabView";
import { getFormAnalytics } from "@/lib/utils/forms/analytics";
import { useContext, useEffect, useState } from "react";

export default function AnalyticsPage({ submissions }: { submissions: any[] }) {
  const columns = [
    "role",
    "level",
    "status",
    "year",
    "faculty",
    "specialization",
    "graduationYear",
    "lp-team",

    // "reviewer_id",
  ];
  const { data, isLoading, error } = useChartData({
    columns: columns,
    submissions: submissions,
  });

  const dataGrid = () => {
    if (isLoading) {
      return (
        <div>
          <h4>Loading...</h4>
        </div>
      );
    } else if (error) {
      return (
        <div>
          <h4>Error loading data</h4>
        </div>
      );
    } else {
      return data.analyticsData.map((chartData, index) => (
        <FormChart
          key={index}
          chartInfo={chartData.charInfo}
          chartConfig={chartData.chartConfig}
          chartData={chartData.chartData}
        />
      ));
    }
  };

  return (
    <div className="overflow-hidden flex flex-col max-w-screen pb-32 ">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {dataGrid()}
      </section>
    </div>
  );
}

function useChartData({
  columns,
  submissions,
}: {
  columns: string[];
  submissions: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const data: { analyticsData: any[]; stats?: any } = getFormAnalytics(
    { columns },
    submissions ? submissions : [],
  );

  return { data, isLoading, error };
}
