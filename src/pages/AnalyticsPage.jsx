import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, BarChart3, TrendingUp } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from "recharts";

const AnalyticsPage = () => {
  // Mock data for Bar Chart (Task Velocity)
  const velocityData = [
    { day: "Mon", completed: 12 },
    { day: "Tue", completed: 19 },
    { day: "Wed", completed: 15 },
    { day: "Thu", completed: 22 },
    { day: "Fri", completed: 30 },
    { day: "Sat", completed: 10 },
    { day: "Sun", completed: 8 },
  ];

  // Mock data for Pie Chart (Category Distribution)
  const distributionData = [
    { name: "Frontend", value: 45, color: "#6366f1" }, // Indigo
    { name: "Backend", value: 30, color: "#f59e0b" },  // Amber
    { name: "Design", value: 15, color: "#ec4899" },   // Pink
    { name: "DevOps", value: 10, color: "#10b981" },   // Emerald
  ];

  const stats = [
    { title: "Total Tasks", value: "124", icon: <BarChart3 size={20} />, trend: "+12%" },
    { title: "Completed", value: "86", icon: <CheckCircle2 size={20} />, trend: "+5%" },
    { title: "In Progress", value: "38", icon: <Clock size={20} />, trend: "-2%" },
    { title: "Efficiency", value: "92%", icon: <TrendingUp size={20} />, trend: "+8%" },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Analytics</h2>
        <p className="text-slate-500 text-sm mt-1">Track your productivity and task trends.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-sm border-slate-200 bg-white">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full mt-2 inline-block ${
                  stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {stat.trend} from last week
                </span>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Task Velocity - Bar Chart */}
        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Task Velocity</CardTitle>
          </CardHeader>
          <CardContent className="h-80 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={velocityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar 
                  dataKey="completed" 
                  fill="#6366f1" 
                  radius={[6, 6, 0, 0]} 
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution - Pie Chart */}
        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  formatter={(value) => <span className="text-xs font-medium text-slate-600">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default AnalyticsPage;