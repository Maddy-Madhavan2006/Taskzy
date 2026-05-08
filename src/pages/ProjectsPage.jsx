import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Folder, CheckCircle2, ListTodo } from "lucide-react";

const ProjectsPage = () => {
  // 1. LOAD DATA (Same keys you used in Dashboard/Analytics)
  const [projects] = useState([
    { id: "proj-1", name: "Thiranex Internship", desc: "Task Management App Development" },
    { id: "proj-2", name: "Personal Portfolio", desc: "Building my 2026 developer site" },
    { id: "proj-3", name: "College Exams", desc: "DBMS and System Architect prep" }
  ]);

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tf-tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // 2. THE CALCULATION ENGINE
  const calculateProgress = (projectId) => {
    const projectTasks = tasks.filter(t => t.projectId === projectId);
    if (projectTasks.length === 0) return 0;

    // We assume 'col-4' is your "Done" column based on our previous logic
    const completedTasks = projectTasks.filter(t => t.columnId === "col-4").length;
    
    return Math.round((completedTasks / projectTasks.length) * 100);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Active Projects</h2>
        <p className="text-slate-500 text-sm mt-1">Real-time progress based on your task board.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const progress = calculateProgress(project.id);
          const totalTasks = tasks.filter(t => t.projectId === project.id).length;

          return (
            <Card key={project.id} className="border-slate-200 hover:shadow-md transition-shadow group">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Folder size={20} />
                  </div>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-[10px]">
                    {totalTasks} Tasks
                  </Badge>
                </div>
                <CardTitle className="mt-4 text-slate-800">{project.name}</CardTitle>
                <CardDescription className="line-clamp-2">{project.desc}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-indigo-600">{progress}%</span>
                  </div>
                  {/* shadcn Progress component */}
                  <Progress value={progress} className="h-2 bg-slate-100" />
                </div>
              </CardContent>

              <CardFooter className="border-t border-slate-50 pt-4 flex justify-between">
                <div className="flex items-center text-[11px] text-slate-400 gap-1">
                  <CheckCircle2 size={12} className="text-emerald-500" />
                  {tasks.filter(t => t.projectId === project.id && t.columnId === "col-4").length} Done
                </div>
                <div className="flex items-center text-[11px] text-slate-400 gap-1">
                  <ListTodo size={12} className="text-indigo-500" />
                  {tasks.filter(t => t.projectId === project.id && t.columnId !== "col-4").length} Pending
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsPage;