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
}

const dataForTeams = [
  {
    time: "9:00 AM",
    team1: 100,
    team2: 150,
    team3: 200,
    team4: 175,
    team5: 125,
  },
  {
    time: "9:05 AM",
    team1: 105,
    team2: 145,
    team3: 198,
    team4: 180,
    team5: 130,
  },
  {
    time: "9:10 AM",
    team1: 110,
    team2: 160,
    team3: 202,
    team4: 170,
    team5: 140,
  },
  {
    time: "9:15 AM",
    team1: 115,
    team2: 155,
    team3: 210,
    team4: 190,
    team5: 145,
  },
  {
    time: "9:20 AM",
    team1: 120,
    team2: 170,
    team3: 215,
    team4: 185,
    team5: 150,
  },
  {
    time: "9:25 AM",
    team1: 125,
    team2: 175,
    team3: 220,
    team4: 200,
    team5: 155,
  },
  {
    time: "9:30 AM",
    team1: 130,
    team2: 180,
    team3: 225,
    team4: 205,
    team5: 160,
  },
  {
    time: "9:35 AM",
    team1: 135,
    team2: 185,
    team3: 230,
    team4: 210,
    team5: 165,
  },
  {
    time: "9:40 AM",
    team1: 140,
    team2: 190,
    team3: 240,
    team4: 215,
    team5: 170,
  },
  {
    time: "9:45 AM",
    team1: 145,
    team2: 195,
    team3: 235,
    team4: 220,
    team5: 175,
  },
  {
    time: "9:50 AM",
    team1: 150,
    team2: 200,
    team3: 245,
    team4: 225,
    team5: 180,
  },
  {
    time: "9:55 AM",
    team1: 155,
    team2: 205,
    team3: 250,
    team4: 230,
    team5: 185,
  },
  {
    time: "10:00 AM",
    team1: 160,
    team2: 210,
    team3: 255,
    team4: 235,
    team5: 190,
  },
  {
    time: "10:05 AM",
    team1: 165,
    team2: 215,
    team3: 260,
    team4: 240,
    team5: 195,
  },
  {
    time: "10:10 AM",
    team1: 170,
    team2: 220,
    team3: 265,
    team4: 245,
    team5: 200,
  },
  {
    time: "10:15 AM",
    team1: 175,
    team2: 225,
    team3: 270,
    team4: 250,
    team5: 205,
  },
  {
    time: "10:20 AM",
    team1: 180,
    team2: 230,
    team3: 275,
    team4: 255,
    team5: 210,
  },
  {
    time: "10:25 AM",
    team1: 185,
    team2: 235,
    team3: 280,
    team4: 260,
    team5: 215,
  },
  {
    time: "10:30 AM",
    team1: 190,
    team2: 240,
    team3: 285,
    team4: 265,
    team5: 220,
  },
  {
    time: "10:35 AM",
    team1: 195,
    team2: 245,
    team3: 290,
    team4: 270,
    team5: 225,
  },
  {
    time: "10:40 AM",
    team1: 200,
    team2: 250,
    team3: 295,
    team4: 275,
    team5: 230,
  },
  {
    time: "10:45 AM",
    team1: 205,
    team2: 255,
    team3: 300,
    team4: 280,
    team5: 235,
  },
  {
    time: "10:50 AM",
    team1: 210,
    team2: 260,
    team3: 305,
    team4: 285,
    team5: 240,
  },
  {
    time: "10:55 AM",
    team1: 215,
    team2: 265,
    team3: 310,
    team4: 290,
    team5: 245,
  },
  {
    time: "11:00 AM",
    team1: 220,
    team2: 270,
    team3: 315,
    team4: 295,
    team5: 250,
  },
  {
    time: "11:05 AM",
    team1: 225,
    team2: 275,
    team3: 320,
    team4: 300,
    team5: 255,
  },
  {
    time: "11:10 AM",
    team1: 230,
    team2: 280,
    team3: 325,
    team4: 305,
    team5: 260,
  },
  {
    time: "11:15 AM",
    team1: 235,
    team2: 285,
    team3: 330,
    team4: 310,
    team5: 265,
  },
  {
    time: "11:20 AM",
    team1: 240,
    team2: 290,
    team3: 335,
    team4: 315,
    team5: 270,
  },
  {
    time: "11:25 AM",
    team1: 245,
    team2: 295,
    team3: 340,
    team4: 320,
    team5: 275,
  },
  {
    time: "11:30 AM",
    team1: 250,
    team2: 300,
    team3: 345,
    team4: 325,
    team5: 280,
  },
  {
    time: "11:35 AM",
    team1: 255,
    team2: 305,
    team3: 350,
    team4: 330,
    team5: 285,
  },
  {
    time: "11:40 AM",
    team1: 260,
    team2: 310,
    team3: 355,
    team4: 335,
    team5: 290,
  },
  {
    time: "11:45 AM",
    team1: 265,
    team2: 315,
    team3: 360,
    team4: 340,
    team5: 295,
  },
  {
    time: "11:50 AM",
    team1: 270,
    team2: 320,
    team3: 365,
    team4: 345,
    team5: 300,
  },
  {
    time: "11:55 AM",
    team1: 275,
    team2: 325,
    team3: 370,
    team4: 350,
    team5: 305,
  },
  {
    time: "12:00 PM",
    team1: 280,
    team2: 330,
    team3: 375,
    team4: 355,
    team5: 310,
  },
];

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
  return (
    <div>
      <Card className="flex-1 flex w-full h-full min-w-0 overflow-hidden bg-opacity-5 bg-white">
        <CardContent className="flex-1 min-w-0">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                accessibilityLayer
                data={dataForTeams}
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
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
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
