
// function aggregateOnColumn(data: any[], column: string) {
//     return data.reduce((acc: Record<string, number>, row: any) => {
//         const value = row[column];
//         const stringifiedValue = Array.isArray(value) ? value.join(", ") : value;
//         if (!acc[stringifiedValue.toLowerCase()]) {
//             acc[stringifiedValue.toLowerCase()] = {
//                 id: value,
//                 count: 0,
//                 label: stringifiedValue.toLowerCase()
//             }
//         }
//         acc[stringifiedValue.toLowerCase()] = {
//             ...acc[stringifiedValue.toLowerCase()],
//             count: acc[stringifiedValue.toLowerCase()].count + 1
//         }
//         return acc;
//     }, {});
// }
//
// function makeConfigFromData(data: { [key: string]:{id: string, count: number, label: string} }) {
//     const config = {
//         count: {
//             label: "Count",
//             color: "hsl(var(--chart-1))",
//
//         },
//
//     } satisfies ChartConfig;
//
//     return config;
// }


export default function AnalyticsPage() {
    return (
        <div className="overflow-hidden flex flex-col max-w-screen pb-32 py-1">
            <div className={"flex p-2 justify-between items-center gap-2"}>
                <p>
                    More analytics coming soon
                </p>

            </div>

        </div>
    );
}
