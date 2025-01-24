"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

interface TeamMember {
  firstname: string;
  lastname: string;
  email: string;
}

export default function TeamInvitePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isAlreadyMember, setIsAlreadyMember] = useState(false);
  const [isTeamFull, setIsTeamFull] = useState(false);

  useEffect(() => {
    const projectId = searchParams.get("id");
    if (!projectId) {
      setError("Invalid invite link");
      setLoading(false);
      return;
    }

    const verifyInvite = async () => {
      try {
        // Fetch team members
        const teamListResponse = await fetch(
          "/api/users/teams/team-list?project_id=" + projectId
        );
        const teamListData = await teamListResponse.json();
        setTeamMembers(teamListData);

        // Check if team is full
        if (teamListData.length >= 4) {
          setIsTeamFull(true);
        }

        // Check if current user is already in the team
        const isUserInTeam = teamListData.some(
          (member: TeamMember) => member.email === session?.user?.email
        );

        if (isUserInTeam) {
          setIsAlreadyMember(true);
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to verify invite link");
        setLoading(false);
      }
    };

    verifyInvite();
  }, [searchParams, session?.user?.email]);

  const handleAcceptInvite = async () => {
    const teamId = searchParams.get("id");
    try {
      // Write project_id to this user's project_id column in the users table
      const response = await fetch("/api/projects/project-id", {
        method: "POST",
        body: JSON.stringify({ user_id: userId, project_id: teamId }),
      });
      // Verify response
      if (response.ok) {
        toast.success("Successfully joined the team!");
        router.push("/dashboard/stock-market");
      } else {
        toast.error("Failed to join team");
      }
    } catch (err) {
      toast.error("Failed to join team");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Team Invitation</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="space-y-4">
              <p>You've been invited to join a team!</p>

              <div className="space-y-2">
                <h3 className="font-medium">Current Team Members:</h3>
                <div className="space-y-3">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          {member.firstname} {member.lastname}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {!error && !isAlreadyMember && !isTeamFull && (
            <Button onClick={handleAcceptInvite}>Accept Invitation</Button>
          )}
          {isAlreadyMember && (
            <p className="text-red-500">
              You are already a member of this team
            </p>
          )}
          {isTeamFull && (
            <p className="text-red-500">
              Team has reached the 4-member limit
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
