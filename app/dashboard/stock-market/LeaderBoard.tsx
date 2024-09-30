import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import StockGraph from "./StockGraph";


const teamsData = [
  { id: 1, name: "Team 1", value: "$1,000,000", change: "+50%" },
  { id: 2, name: "Team 2", value: "$1,000,000", change: "+50%" },
  { id: 3, name: "Team 3", value: "$1,000,000", change: "+50%" },
  { id: 4, name: "Team 4", value: "$1,000,000", change: "+50%" },
  { id: 5, name: "Team 5", value: "$1,000,000", change: "+50%" },
];

const LeaderBoard = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const handleRowClick = (teamName: string) => {
    setSelectedTeam(teamName); // Set the selected team
  };
  
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
            {teamsData.map((team) => (
              <TableRow key={team.id} className="hover:bg-[#0E0823] cursor-pointer">
                <TableCell className="text-[20px] text-[#D175FA] font-bold">{team.id}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="text-[20px] font-bold text-white underline"
                        onClick={() => handleRowClick(team.name)}
                      >
                        {team.name}
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{team.name} Stock Graph</DialogTitle>
                        <DialogDescription>
                          Detailed graph data for {team.name}.
                        </DialogDescription>
                      </DialogHeader>
                      <StockGraph teamName={team.name} />
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell className="text-[#F1D2FF] text-lg font-bold">{team.value}</TableCell>
                <TableCell className="text-right text-lg text-[#95F2FF] font-bold">{team.change}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default LeaderBoard;
