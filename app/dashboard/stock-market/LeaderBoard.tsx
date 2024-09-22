import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";

const LeaderBoard = () => {
  return (
    <div >
      <Card className="flex-1 flex w-full h-full min-w-0 overflow-hidden bg-opacity-5 bg-white ">
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead className="text-2xl text-white">ID</TableHead>
              <TableHead className="text-2xl text-white">Value</TableHead>
              <TableHead className="text-right text-2xl text-white">
                % Change
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-[#0E0823]">
              <TableCell className="text-[20px] text-[#D175FA] font-bold">
                1
              </TableCell>
              <TableCell className="text-[20px] font-bold">Team 1</TableCell>
              <TableCell className="text-[#F1D2FF] text-lg font-bold">
                $1,000,000
              </TableCell>
              <TableCell className="text-right text-lg text-[#95F2FF] font-bold">
                +50%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-[20px] text-[#D175FA] font-bold">
                2
              </TableCell>
              <TableCell className="text-[20px] font-bold">Team 2</TableCell>
              <TableCell className="text-[#F1D2FF] text-lg">
                $1,000,000
              </TableCell>
              <TableCell className="text-right text-lg">+50%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-[20px] text-[#D175FA] font-bold">
                3
              </TableCell>
              <TableCell className="text-[20px] font-bold">Team 3</TableCell>
              <TableCell className="text-[#F1D2FF] text-lg">
                $1,000,000
              </TableCell>
              <TableCell className="text-right text-lg">+50%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-[20px] text-[#D175FA] font-bold">
                4
              </TableCell>
              <TableCell className="text-[20px] font-bold">Team 4</TableCell>
              <TableCell className="text-[#F1D2FF] text-lg">
                $1,000,000
              </TableCell>
              <TableCell className="text-right text-lg">+50%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-[20px] text-[#D175FA] font-bold">
                5
              </TableCell>
              <TableCell className="text-[20px] font-bold">Team 5</TableCell>
              <TableCell className="text-[#F1D2FF] text-lg">
                $1,000,000
              </TableCell>
              <TableCell className="text-right text-lg">+50%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default LeaderBoard;
