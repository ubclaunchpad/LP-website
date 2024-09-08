import {
  ReferenceMap,
  ReferenceItem,
} from "@/app/portal/admin/forms/[id]/submissions/columns";
import { ChartConfig } from "@/components/primitives/chart";

type temp = {
  columns: string[];
};

interface AggregatedValue {
  id: string;
  count: number;
  label: string;
}

interface AggregationResult {
  charInfo: {
    title: string;
    description: string;
  };
  chartData: AggregatedValue[];
  chartConfig: any; // Replace 'any' with the appropriate type if you know it
}

function aggregateColumn(
  data: Record<string, any>[],
  column: string,
  ref: ReferenceMap | null,
): AggregationResult {
  const aggData = data.reduce(
    (acc: Record<string, AggregatedValue>, row: Record<string, any>) => {
      const value = row[column];
      if (!value) {
        return acc;
      }
      if (Array.isArray(value)) {
        value.forEach((val) => {
          if (acc[val]) {
            acc[val] = {
              ...acc[val],
              count: acc[val].count + 1,
            };
          } else {
            acc[val] = {
              id: val,
              count: 1,
              label: ref ? ref[val].label : val,
            };
          }
        });
        return acc;
      }
      if (acc[value]) {
        acc[value] = {
          ...acc[value],
          count: acc[value].count + 1,
        };
      } else {
        acc[value] = {
          id: value,
          count: 1,
          label: ref ? ref[value].label : value,
        };
      }
      return acc;
    },
    {} as Record<string, AggregatedValue>,
  );

  return {
    charInfo: { title: column, description: `Number of ${column}(s)` },
    chartData: Object.values(aggData),
    chartConfig: createChartConfig(Object.values(aggData), [column]), // Type 'chartConfig' properly
  };
}

function createChartConfig(data: any[], columns: string[]) {
  const chartConfig: ChartConfig = {};
  columns.forEach((column, index) => {
    chartConfig[column] = {
      label: column,
      color: `var(--lp-200)`,
    };
  });
  return chartConfig;
}

export function getFormAnalytics(
  config: temp,
  submissions: any,
  refMap: ReferenceMap,
) {
  const chartData = config.columns.map((column) => {
    let ref = refMap[column];
    if (typeof ref === "string") {
      ref = refMap[ref];
    }
    return aggregateColumn(submissions, column, ref ? ref : null);
  });
  return {
    analyticsData: chartData,
    stats: {
      submissions: submissions.length,
    },
  };
}
