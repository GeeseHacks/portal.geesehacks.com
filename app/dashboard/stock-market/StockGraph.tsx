import React from "react";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const dataForTeams: Record<string, { time: string; value: number }[]> = {
  "Team 1": [{ time: "11:00 AM", value: 186 }, { time: "11:15 AM", value: 305 }, { time: "11:30 AM", value: 256 }, { time: "11:45 AM", value: 305 }],
  "Team 2": [{ time: "11:00 AM", value: 186 }, { time: "11:15 AM", value: 305 }, { time: "11:30 AM", value: 256 }, { time: "11:45 AM", value: 305 }],
  "Team 3": [{ time: "11:00 AM", value: 186 }, { time: "11:15 AM", value: 305 }, { time: "11:30 AM", value: 256 }, { time: "11:45 AM", value: 305 }],
  "Team 4": [{ time: "11:00 AM", value: 186 }, { time: "11:15 AM", value: 305 }, { time: "11:30 AM", value: 256 }, { time: "11:45 AM", value: 305 }],
  "Team 5": [{ time: "11:00 AM", value: 186 }, { time: "11:15 AM", value: 305 }, { time: "11:30 AM", value: 256 }, { time: "11:45 AM", value: 305 }],
};

const chartConfig = {
  time: {
    label: "Time",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const StockGraph  = ({ teamName, chartData }: { teamName?: string; chartData?: { time: string; value: number }[] }) => {
  const data = teamName ? dataForTeams[teamName] : chartData || [];

  return (
    <div>
      <Card className="flex-1 flex w-full h-full min-w-0 overflow-hidden bg-opacity-5 bg-white">
        <CardContent className="flex-1 min-w-0">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                accessibilityLayer
                data={data}
                margin={{
                  top: 50,
                  bottom: 20,
                  left: 20,
                  right: 20,
                }}
              >
                <CartesianGrid
                  vertical={true}
                  horizontal={false}
                  stroke="gray"
                />
                <XAxis
                  dataKey="time"
                  tickLine={true}
                  axisLine={false}
                  tickMargin={30}
                  tickFormatter={(value, index) =>
                    index % 4 === 0 ? value : ""
                  }
                  orientation="top"
                  stroke="white"
                  tick={{ fontSize: 14 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={true}
                  tickMargin={20}
                  tickFormatter={(value) => `$${value}`}
                  stroke="gray"
                  tick={{
                    fontSize: 14,
                    fill: "purple",
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="value"
                  type="linear"
                  stroke="#ffffff"
                  strokeWidth={1.7}
                  dot={false}
                  filter="drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.8))"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card> 
    </div>
  );
};

export default StockGraph;
