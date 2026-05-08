import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  CheckSquare,
  Folder,
  BarChart3,
  Settings,
  Search,
  Bell,
  Plus,
  LogOut,
  Menu,
  X
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const Layout = () => {
  const navigate = useNavigate();

  const [user, setUser] = React.useState(null);
  const [sidebarOpen, setSidebarOpen] = React.useState(false); // 📱 mobile sidebar

  React.useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const initials = user?.username
    ? user.username
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "GU";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-full bg-slate-50/50 overflow-hidden">

      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b flex items-center justify-between px-4 z-50">

        <div className="font-bold text-lg">Taskzy</div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu />
        </Button>

      </div>

      {/* ================= SIDEBAR (DESKTOP) ================= */}
      <aside className="hidden md:flex w-64 bg-[#1e2632] text-slate-300 flex-col shrink-0">

        <div className="p-6 flex items-center gap-3 text-white">
          <div className="bg-indigo-500 p-1.5 rounded-lg">
            <LayoutDashboard size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">Taskzy</span>
        </div>

        <ScrollArea className="flex-1 px-4">

          <div className="space-y-1">

            <SidebarLink to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" />
            <SidebarLink to="/tasks" icon={<CheckSquare size={18} />} label="My Tasks" />
            <SidebarLink to="/projects" icon={<Folder size={18} />} label="Projects" />
            <SidebarLink to="/analytics" icon={<BarChart3 size={18} />} label="Analytics" />
            <SidebarLink to="/settings" icon={<Settings size={18} />} label="Settings" />

          </div>

        </ScrollArea>

        {/* USER */}
        <div className="p-4 mt-auto border-t border-slate-700/50">

          <div className="bg-slate-800/40 rounded-xl p-3 flex items-center gap-3 border border-slate-700/50">

            <Avatar className="h-8 w-8 border border-slate-600">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div className="flex-1 overflow-hidden text-sm">
              <p className="text-white truncate">
                {user?.username || "Guest User"}
              </p>
              <p className="text-slate-500 truncate text-[10px]">
                {user?.email || "No Email"}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-400/10"
            >
              <LogOut size={16} />
            </Button>

          </div>
        </div>
      </aside>

      {/* ================= MOBILE SIDEBAR OVERLAY ================= */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">

          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />

          <aside className="w-64 bg-[#1e2632] text-slate-300 flex flex-col z-50">

            <div className="p-4 flex justify-between items-center text-white">
              <span className="font-bold text-lg">Taskzy</span>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X />
              </Button>
            </div>

            <div className="px-4 space-y-1">

              <SidebarLink to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" />
              <SidebarLink to="/tasks" icon={<CheckSquare size={18} />} label="My Tasks" />
              <SidebarLink to="/projects" icon={<Folder size={18} />} label="Projects" />
              <SidebarLink to="/analytics" icon={<BarChart3 size={18} />} label="Analytics" />
              <SidebarLink to="/settings" icon={<Settings size={18} />} label="Settings" />

            </div>

          </aside>

        </div>
      )}

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col min-w-0 bg-white md:ml-0 pt-14 md:pt-0">

        <header className="h-16 border-b flex items-center justify-between px-4 md:px-8">

          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input placeholder="Search..." className="pl-9 bg-slate-100/50 border-none" />
          </div>

          <div className="flex items-center gap-3">

            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>

            <Separator orientation="vertical" className="h-6 mx-2" />

            <Button className="bg-[#1e2632] text-white">
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>

          </div>

        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    onClick={() => {}}
    className={({ isActive }) =>
      `flex items-center gap-3 h-10 px-3 rounded-lg ${
        isActive
          ? "bg-indigo-600 text-white"
          : "text-slate-400 hover:text-white hover:bg-slate-800"
      }`
    }
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </NavLink>
);

export default Layout;