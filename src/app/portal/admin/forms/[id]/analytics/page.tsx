"use client";
import { getFormAnalytics } from "@/app/portal/admin/actions";
import { FormChart } from "@/app/portal/admin/forms/[id]/analytics/formDataChart";
import { useEffect, useState } from "react";

export default function AnalyticsPage() {
  const columns = [
    "role",
    "year",
    "faculty",
    "specialization",
    "graduationYear",
    "lp-team",
  ];
  const { data, isLoading, error } = useChartData({
    columns: columns,
    formId: 241,
    onlySubmitted: true,
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
    <div className="overflow-hidden flex flex-col max-w-screen pb-32 py-1">
      <div className={"flex p-10 py-4 justify-between  gap-2"}>
        <div>
          <span>
            <h2 className={"text-2xl font-semibold"}>Form Analytics</h2>
          </span>
        </div>
        {data && data.stats.lastUpdated && (
          <div className={"flex flex-col items-end gap-2"}>
            <span>
              <h4>
                Data up to {new Date(data.stats.lastUpdated).toLocaleString()}
              </h4>
            </span>
            <span>
              <h4>Results: {data.stats.submissions}</h4>
            </span>
          </div>
        )}
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
        {dataGrid()}
      </section>
    </div>
  );
}

function useChartData({
  columns,
  formId,
  onlySubmitted,
}: {
  columns: string[];
  formId: number;
  onlySubmitted: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState<{ analyticsData: any[]; stats?: any }>({
    analyticsData: [],
  });
  useEffect(() => {
    getFormAnalytics(formId, { columns })
      .then((res) => {
        if (!res) {
          throw new Error("No form found");
        }
        setData(res as any);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [onlySubmitted]);
  return { data, isLoading, error };
}
