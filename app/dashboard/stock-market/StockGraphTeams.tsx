import React from "react";
import { useEffect, useState } from "react";
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

interface Team {
  id: number;
  name: string;
  value: string;
  change: string;
  projectId: string;
  color: string;
  dataKey: string;
  history?: { time: string; value: number }[];
}

const chartConfig = {
  time: {
    label: "Time",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface StockGraphTeamsProps {
  teamsData: Team[];
}

const StockGraphTeams = ({ teamsData }: StockGraphTeamsProps) => {
  console.log("teamsData", teamsData);
  const [formattedData, setFormattedData] = useState<any[]>([]);

  useEffect(() => {
    // Sort teams by value (descending order)
    const sortedTeams = [...teamsData].sort(
      (a, b) => parseFloat(b.value) - parseFloat(a.value)
    );

    // Create a mapping of team ID to placement name
    const teamPlacementMap = new Map(
      sortedTeams.map((team, index) => [
        team.id,
        `${index + 1}${getOrdinalSuffix(index + 1)} Place`,
      ])
    );

    // Group the data points by timestamp
    const timePoints = new Map();

    teamsData.forEach((team) => {
      team.history?.forEach((dataPoint) => {
        const timeStr = dataPoint.time;

        if (!timePoints.has(timeStr)) {
          timePoints.set(timeStr, {
            time: timeStr,
            [`${team.dataKey}_name`]: teamPlacementMap.get(team.id),
          });
        }

        const point = timePoints.get(timeStr);
        point[team.dataKey] = dataPoint.value;
        point[`${team.dataKey}_name`] = teamPlacementMap.get(team.id);
      });
    });

    // Convert Map to array and sort by time
    const sortedData = Array.from(timePoints.values()).sort(
      (a, b) =>
        new Date(`1970/01/01 ${a.time}`).getTime() -
        new Date(`1970/01/01 ${b.time}`).getTime()
    );

    setFormattedData(sortedData);
  }, [teamsData]);

  // Helper function to get ordinal suffix
  const getOrdinalSuffix = (num: number): string => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  };

  // Custom tooltip content component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/80 backdrop-blur-sm border p-2 rounded-lg shadow">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry: any) => {
            const teamName = entry.payload[`${entry.dataKey}_name`];
            return (
              <div
                key={entry.dataKey}
                className="flex items-center gap-2 text-sm"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span>
                  {teamName}: ${entry.value}
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <Card className="flex-1 flex w-full h-full min-w-0 overflow-hidden bg-opacity-5 bg-white">
        <CardContent className="flex-1 min-w-0">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                accessibilityLayer
                data={formattedData}
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
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={true}
                  tickMargin={20}
                  tickFormatter={(value) => `$${value}`}
                  stroke="gray"
                  tick={{
                    fontSize: 12,
                    fill: "purple",
                  }}
                />
                <ChartTooltip cursor={false} content={<CustomTooltip />} />
                {teamsData.map((team) => (
                  <Line
                    key={team.id}
                    dataKey={team.dataKey}
                    type="linear"
                    stroke={team.color}
                    strokeWidth={1.7}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockGraphTeams;
