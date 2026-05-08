import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // Ensure you ran 'add progress'

const members = [
  {
    name: "Madhavan R.",
    role: "Full-stack Developer",
    status: "Active",
    workload: 85,
    email: "madhavan@taskflow.com",
    avatar: "https://github.com/shadcn.png",
    tags: ["React", "Node.js", "MySQL"]
  },
  {
    name: "Sarah Chen",
    role: "UI/UX Designer",
    status: "In Meeting",
    workload: 40,
    email: "sarah@taskflow.com",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    tags: ["Figma", "Design System"]
  },
  {
    name: "Arjun Kumar",
    role: "Backend Engineer",
    status: "Away",
    workload: 95,
    email: "arjun@taskflow.com",
    avatar: "https://i.pravatar.cc/150?u=arjun",
    tags: ["Go", "PostgreSQL", "Docker"]
  }
];

const TeamsPage = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Team Members</h2>
          <p className="text-slate-500 mt-1">Manage your collaborators and monitor their current capacity.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Mail size={16} /> Invite via Email
          </Button>
          <Button className="bg-[#1e2632] hover:bg-slate-800 text-white gap-2">
            <Plus size={16} /> Add Member
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <QuickStat label="Total Members" value="12" />
        <QuickStat label="Active Now" value="8" sub="67% of team" />
        <QuickStat label="Open Seats" value="2" sub="Hiring for Backend" />
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {members.map((member) => (
          <Card key={member.name} className="group hover:border-indigo-200 transition-all duration-300 shadow-sm overflow-hidden">
            <CardHeader className="p-6 pb-4 flex flex-row items-start justify-between space-y-0">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-14 w-14 ring-2 ring-slate-100 group-hover:ring-indigo-100 transition-all">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                    member.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'
                  }`} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{member.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{member.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                <MoreVertical size={16} />
              </Button>
            </CardHeader>
            
            <CardContent className="px-6 pb-6 pt-0">
              <div className="space-y-4">
                {/* Workload Progress */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <span>Current Workload</span>
                    <span className={member.workload > 90 ? "text-red-500" : "text-slate-600"}>
                      {member.workload}%
                    </span>
                  </div>
                  <Progress value={member.workload} className="h-1.5" />
                </div>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {member.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 border-none font-medium">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Separator className="bg-slate-100" />

                {/* Social/Action Links */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-indigo-500">
                      <Github size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-indigo-500">
                      <ExternalLink size={14} />
                    </Button>
                  </div>
                  <Button variant="link" className="text-xs text-indigo-600 h-auto p-0 font-bold uppercase tracking-tight">
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Internal Helper for Stats
const QuickStat = ({ label, value, sub }) => (
  <div className="bg-white p-5 rounded-xl border shadow-sm">
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
    <div className="flex items-baseline gap-2 mt-1">
      <span className="text-2xl font-bold text-slate-900">{value}</span>
      {sub && <span className="text-[10px] font-medium text-emerald-600">{sub}</span>}
    </div>
  </div>
);

export default TeamsPage;