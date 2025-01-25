import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
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

interface Team {
  id: number;
  name: string;
  value: string;
  projectId: string;
}

interface LeaderBoardProps {
  category: string;
  teamsData: Team[];
}

const LeaderBoard = ({ category, teamsData }: LeaderBoardProps) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  // Define helper function first
  const getOrdinalSuffix = (num: number): string => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  };

  // Then use it in sorting and mapping
  const sortedTeams = [...teamsData].sort(
    (a, b) => parseFloat(b.value) - parseFloat(a.value)
  );

  const anonymizedTeams = sortedTeams.map((team, index) => ({
    ...team,
    name: `${index + 1}${getOrdinalSuffix(index + 1)} Place`,
  }));

  const handleRowClick = (teamName: string) => {
    setSelectedTeam(teamName); // Set the selected team
  };

  return (
    <div>
      <Card className="flex-1 flex w-full h-full min-w-0 overflow-hidden bg-opacity-5 bg-white pt-7 sm:py-9 px-2 sm:px-10">
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] pb-4"></TableHead>
              <TableHead className="text-lg sm:text-xl font-bold text-white pb-4">
                Name
              </TableHead>
              <TableHead className="text-lg sm:text-xl font-bold text-white pb-4">
                Value
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {anonymizedTeams.map((team) => (
              <Dialog key={team.id}>
                <DialogTrigger asChild>
                  <TableRow
                    className="hover:bg-[#0E0823] cursor-pointer"
                    onClick={() => handleRowClick(team.name)}
                  >
                    <TableCell className="text-[20px] text-[#D175FA] font-bold">
                      {team.id}
                    </TableCell>
                    <TableCell>
                      <span className="text-[20px] font-bold text-white">
                        {team.name}
                      </span>
                    </TableCell>
                    <TableCell className="text-[#F1D2FF] text-lg font-bold">
                      {team.value}
                    </TableCell>
                  </TableRow>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{team.name} Stock Graph</DialogTitle>
                    <DialogDescription>
                      Detailed graph data for {team.name}.
                    </DialogDescription>
                  </DialogHeader>
                  <StockGraph projId={team.projectId} />
                </DialogContent>
              </Dialog>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default LeaderBoard;
