"use client";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
function Charts({
  data: { salesData },
}: {
  data: { salesData: { month: string; totalSales: number }[] };
}) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={salesData}>
        <XAxis
          dataKey="month"
          stroke="#b5b5ae"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#b5b5ae"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="totalSales"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-stone-300"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Charts;
