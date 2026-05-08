import React, { useState } from "react";
import { 
  MoreHorizontal, Plus, Trash2, CheckCircle2, 
  Clock, BarChart3, AlertCircle, Eraser 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  // 1. STATE MANAGEMENT
  const [columns, setColumns] = useState([
    { id: "col-1", title: "Backlog", color: "bg-slate-400" },
    { id: "col-2", title: "To Do", color: "bg-indigo-500" },
    { id: "col-3", title: "In Progress", color: "bg-orange-500" },
    { id: "col-4", title: "Done", color: "bg-emerald-500" },
  ]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [tasks, setTasks] = useState([
    { id: 1, columnId: "col-1", title: "Project Setup", desc: "Initialize Vite and Tailwind 4" },
    { id: 2, columnId: "col-2", title: "Auth Flow", desc: "Create Login and Register pages" },
  ]);

  // 2. ACTION HANDLERS
  const handleAddTask = (columnId) => {
    const newTask = {
      id: Date.now(),
      columnId: columnId,
      title: "New Task",
      desc: "Describe your work here..."
    };
    setTasks([newTask, ...tasks]);
  };

  const handleClearColumn = (columnId) => {
    if (window.confirm("Clear all tasks in this column?")) {
      setTasks(tasks.filter(t => t.columnId !== columnId));
    }
  };

  const handleDeleteColumn = (columnId) => {
    if (window.confirm("Delete this entire column?")) {
      setColumns(columns.filter(c => c.id !== columnId));
      setTasks(tasks.filter(t => t.columnId !== columnId));
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <header className="mb-8">
       <h2 className="text-3xl font-bold !text-slate-900 tracking-tight text-left">Welcome back, {user?.username || "Guest User"}!</h2>
        <p className="text-slate-500 mt-1 text-left">Here is what is happening with your projects today.</p>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard title="Total Tasks" value={tasks.length} color="text-indigo-600" icon={<BarChart3 size={18} />} />
        <StatCard title="In Progress" value={tasks.filter(t => t.columnId === "col-3").length} color="text-orange-500" icon={<Clock size={18} />} />
        <StatCard title="Completed" value={tasks.filter(t => t.columnId === "col-4").length} color="text-emerald-500" icon={<CheckCircle2 size={18} />} />
        <StatCard title="Active Columns" value={columns.length} color="text-slate-600" icon={<AlertCircle size={18} />} />
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-6 text-left">Project Board</h3>

      {/* Kanban Container */}
      <div className="flex gap-6 pb-10 overflow-x-auto overflow-y-visible items-start justify-start custom-scrollbar">
        {columns.map((col) => (
          <BoardColumn 
            key={col.id}
            column={col}
            tasks={tasks.filter(t => t.columnId === col.id)}
            onAdd={() => handleAddTask(col.id)}
            onClear={() => handleClearColumn(col.id)}
            onDelete={() => handleDeleteColumn(col.id)}
          />
        ))}
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const BoardColumn = ({ column, tasks, onAdd, onClear, onDelete }) => (
  <div className="w-[320px] flex-none bg-slate-50/50 rounded-2xl p-4 border border-dashed border-slate-200 relative self-start">
    <div className="flex items-center justify-between mb-5 px-1">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${column.color}`} />
        <span className="font-bold text-sm text-slate-700 uppercase tracking-tight">{column.title}</span>
        <Badge variant="secondary" className="text-[10px] bg-white border h-5 min-w-[20px] justify-center">
          {tasks.length}
        </Badge>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1.5 hover:bg-white rounded-lg transition-all cursor-pointer text-slate-400 hover:text-slate-900 outline-none border border-transparent hover:border-slate-100">
            <MoreHorizontal size={16} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent align="end" className="w-48 shadow-2xl border-slate-200 rounded-xl p-1 z-50 bg-white">
            <DropdownMenuItem className="cursor-pointer py-2 rounded-lg focus:bg-indigo-50" onClick={onAdd}>
              <Plus className="mr-2 h-4 w-4 text-indigo-600" />
              <span className="font-semibold text-sm text-slate-700">Add Task</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="my-1 bg-slate-100" />
            
            <DropdownMenuItem className="cursor-pointer py-2 rounded-lg focus:bg-orange-50" onClick={onClear}>
              <Eraser className="mr-2 h-4 w-4 text-orange-600" />
              <span className="font-semibold text-sm text-slate-700">Clear Tasks</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer py-2 rounded-lg focus:bg-rose-50 text-rose-600" onClick={onDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span className="font-semibold text-sm">Delete Column</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>

    <div className="space-y-4">
      {tasks.map(task => (
        <TaskCard key={task.id} title={task.title} desc={task.desc} />
      ))}
    </div>
  </div>
);

const TaskCard = ({ title, desc }) => (
  <Card className="group hover:shadow-md hover:border-indigo-200 transition-all border-slate-200 shadow-sm bg-white cursor-grab active:cursor-grabbing">
    <CardContent className="p-4">
      <h5 className="font-bold text-sm text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors text-left">{title}</h5>
      <p className="text-[11px] text-slate-500 line-clamp-2 mb-4 leading-relaxed text-left">{desc}</p>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
        <Avatar className="h-6 w-6 border-2 border-white ring-1 ring-slate-100">
          <AvatarFallback className="text-[8px]">U</AvatarFallback>
        </Avatar>
        <Badge variant="secondary" className="text-[9px] px-2 py-0 h-5 bg-indigo-50 text-indigo-600 border-none font-bold italic">
          TaskFlow
        </Badge>
      </div>
    </CardContent>
  </Card>
);

const StatCard = ({ title, value, color, icon }) => (
  <Card className="border-slate-100 shadow-sm relative overflow-hidden bg-white">
    <div className={`absolute top-0 left-0 w-1 h-full ${color.replace('text', 'bg')}`} />
    <CardHeader className="pb-2 pt-4 flex flex-row items-center justify-between space-y-0">
      <CardTitle className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{title}</CardTitle>
      <div className={`${color} opacity-70`}>{icon}</div>
    </CardHeader>
    <CardContent>
      <div className={`text-3xl font-bold ${color} text-left`}>{value}</div>
    </CardContent>
  </Card>
);

export default Dashboard;