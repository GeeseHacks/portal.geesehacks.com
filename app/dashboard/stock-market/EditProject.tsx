"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { projectSchema, ProjectFormData } from "@/utils/projectSchema";
import { Copy, RefreshCw } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import { Checkbox } from "@/components/ui/checkbox";

interface TeamMember {
  firstname: string;
  lastname: string;
  email: string;
  net_worth: number;
}

const AVAILABLE_TRACKS = ["Sunlife", "TeejLab", "CS-CAN"] as const;

const EditProject = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const [inviteUrl, setInviteUrl] = useState<string>("");
  const [projectId, setProjectId] = useState<string | null>(null);
  const [project, setProject] = useState<{
    submitted?: boolean;
    tracks?: string[];
  }>({
    submitted: false,
    tracks: [],
  });

  const toggleTrack = (track: string) => {
    setProject((prev) => ({
      ...prev,
      tracks: prev.tracks?.includes(track)
        ? prev.tracks.filter((t) => t !== track)
        : [...(prev.tracks || []), track],
    }));
  };

  const getProjectInviteLink = async () => {
    try {
      // Fetch current user's project_id from the database
      const response = await fetch("/api/users/teams?id=" + userId);
      const data = await response.json();

      let projectId = data.project_id;
      console.log("Project ID: ", projectId);
      if (!projectId) {
        console.log("Project ID is null, generating new UUID");
        // Generate new UUID if user doesn't have a project_id
        projectId = uuidv4();

        // Save the new project_id to the database
        await fetch("/api/users/teams", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId, project_id: projectId }),
        });
      }
      setProjectId(projectId);

      // Set the invite URL using the project_id
      setInviteUrl(`https://portal.geesehacks.com/team-invite?id=${projectId}`);
    } catch (error) {
      console.error("Failed to get project invite link:", error);
      toast.error("Failed to generate project invite link");
    }
  };

  useEffect(() => {
    getProjectInviteLink();
  }, []);

  useEffect(() => {
    if (projectId) {
      refreshTeamList();
    }
  }, [projectId]);

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      toast.success("Invite link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy invite link");
    }
  };

  const refreshTeamList = async () => {
    try {
      // Get current user's project_id first
      const teamListResponse = await fetch(
        "/api/users/teams/team-list?project_id=" + projectId
      );
      const teamListData = await teamListResponse.json();
      console.log("Team list: ", teamListData);
      setTeamMembers(teamListData);
      // toast.success("Team list refreshed!");
    } catch (error) {
      toast.error("Failed to refresh team list");
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    try {
      // Calculate total team net worth
      const totalNetWorth = teamMembers.reduce(
        (sum, member) => sum + member.net_worth,
        0
      );

      console.log(data);
      // Create the main project first
      const projectResponse = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          totalTeamNetWorth: totalNetWorth,
          tracks: project.tracks, // The selected tracks
        }),
      });

      const savedProject = await projectResponse.json();
      const projectId = savedProject.id;

      // Create entries for each selected track
      // const trackPromises = project.tracks?.map(async (track) => {
      //   const endpoint = `/api/projects/tracks/${track.toLowerCase()}`;
      //   return fetch(endpoint, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       projectId: projectId,
      //     }),
      //   });
      // });

      // if (trackPromises) {
      //   await Promise.all(trackPromises);
      // }

      toast.success("Project saved successfully!");
    } catch (error) {
      toast.error("Failed to save project");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Team Management Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>
                Manage your team members and invitations
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={refreshTeamList}
              title="Refresh team list"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label>My Invite Link</Label>
              <p className="text-sm text-muted-foreground">
                Share this link to invite others to your team
              </p>
              <div className="flex gap-2">
                <Input readOnly value={inviteUrl} className="flex-1" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyInviteLink}
                  title="Copy invite link"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>My Team</Label>
              <div className="space-y-3">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">
                        {member.firstname} {member.lastname}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {member.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Net Worth: ${member.net_worth}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Information Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Project Information</CardTitle>
              <CardDescription>
                Fill out the details about your project
              </CardDescription>
            </div>
            <Badge variant={project?.submitted ? "default" : "destructive"}>
              {project?.submitted ? "Submitted" : "Not Submitted"}
            </Badge>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter project name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">
                  Short Description (under 200 characters)
                </Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Feel free to copy your Devpost elevator pitch"
                  rows={3}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="devpostLink">Devpost Link</Label>
                <Input
                  id="devpostLink"
                  {...register("devpostLink")}
                  placeholder="Paste the link to your Devpost submission"
                />
                {errors.devpostLink && (
                  <p className="text-red-500 text-sm">
                    {errors.devpostLink.message}
                  </p>
                )}
              </div>
              <div className="space-y-4">
                <Label>Tracks</Label>
                <div className="flex flex-row gap-6">
                  {AVAILABLE_TRACKS.map((track) => (
                    <div key={track} className="flex items-center space-x-2">
                      <Checkbox
                        id={track.toLowerCase()}
                        checked={project?.tracks?.includes(track)}
                        onCheckedChange={() => toggleTrack(track)}
                      />
                      <Label
                        htmlFor={track.toLowerCase()}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {track}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" variant="default">
              Save Project
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default EditProject;
