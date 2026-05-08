import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Filter, Trash2, Plus } from "lucide-react";

import { Input } from "@/components/ui/input";

const TasksPage = () => {
  // TASK STATE
  const [tasks, setTasks] = useState([
    {
      id: "T-101",
      title: "API Authentication",
      priority: "High",
      status: "In Progress",
      dueDate: "2026-05-15",
    },
    {
      id: "T-102",
      title: "Dark Mode Toggle",
      priority: "Medium",
      status: "To Do",
      dueDate: "2026-05-18",
    },
  ]);

  // FORM STATE
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("To Do");
  const [dueDate, setDueDate] = useState("");

  // ADD TASK
  const handleAddTask = () => {
    if (!title || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      id: `T-${Date.now()}`,
      title,
      priority,
      status,
      dueDate,
    };

    setTasks([...tasks, newTask]);

    // RESET FORM
    setTitle("");
    setPriority("Medium");
    setStatus("To Do");
    setDueDate("");
  };

  // DELETE TASK
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Tasks</h2>

        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* ADD TASK FORM */}
      <div className="bg-white border rounded-lg p-5 mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Task</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* TITLE */}
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* PRIORITY */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          {/* STATUS */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          {/* DATE */}
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <Button
          onClick={handleAddTask}
          className="mt-4 bg-[#1e2632] hover:bg-slate-800"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      {/* TASK TABLE */}
      <div className="border rounded-lg bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>

              <TableHead>Task Title</TableHead>

              <TableHead>Status</TableHead>

              <TableHead>Priority</TableHead>

              <TableHead>Due Date</TableHead>

              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-mono text-xs">{task.id}</TableCell>

                  <TableCell className="font-medium">{task.title}</TableCell>

                  <TableCell>
                    <Badge variant="secondary">{task.status}</Badge>
                  </TableCell>

                  <TableCell>
                    <span
                      className={
                        task.priority === "High"
                          ? "text-red-500 font-medium"
                          : task.priority === "Medium"
                            ? "text-orange-500 font-medium"
                            : "text-green-600 font-medium"
                      }
                    >
                      {task.priority}
                    </span>
                  </TableCell>

                  <TableCell className="text-slate-500">
                    {task.dueDate}
                  </TableCell>

                  {/* DELETE BUTTON */}
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-slate-500"
                >
                  No tasks available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TasksPage;
