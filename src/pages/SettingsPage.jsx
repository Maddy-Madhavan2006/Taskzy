import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

import { User, Bell, Shield, Database, Trash2 } from "lucide-react";

const SettingsPage = () => {
  // GET USER FROM LOCAL STORAGE
  const user = JSON.parse(localStorage.getItem("user"));

  // FORM STATE
  const [username, setUsername] = useState(user?.username || "");

  const [email, setEmail] = useState(user?.email || "");

  // RESET FUNCTION
  const handleReset = () => {
    if (
      window.confirm(
        "This will permanently delete all tasks and local data. Continue?",
      )
    ) {
      localStorage.clear();

      window.location.reload();
    }
  };

  // UPDATE PROFILE
  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(
        "https://taskflow-1-v0ec.onrender.com/api/auth/update-profile",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            id: user.id,
            username,
            email,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        // UPDATE LOCAL STORAGE
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Profile updated successfully!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);

      alert("Something went wrong");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* PAGE HEADER */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
          Settings
        </h2>

        <p className="text-slate-500 text-sm mt-1">
          Manage your account preferences and application data.
        </p>
      </div>

      <div className="grid gap-6">
        {/* PROFILE SECTION */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <User size={20} />
            </div>

            <div>
              <CardTitle className="text-lg">Profile Settings</CardTitle>

              <CardDescription>
                Update how you appear on the platform.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* USERNAME */}
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>

                <Input
                  id="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="focus-visible:ring-indigo-500"
                />
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>

                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* UPDATE BUTTON */}
            <Button
              onClick={handleUpdateProfile}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Update Profile
            </Button>
          </CardContent>
        </Card>

        {/* APPLICATION SETTINGS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NOTIFICATIONS */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Bell size={20} />
              </div>

              <CardTitle className="text-base">Notifications</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Email Alerts</Label>

                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Task Reminders</Label>

                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* SECURITY */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Shield size={20} />
              </div>

              <CardTitle className="text-base">Privacy & Security</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Public Profile</Label>

                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Two-Factor Auth</Label>

                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* DANGER ZONE */}
        <Card className="border-rose-100 bg-rose-50/10">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
              <Database size={20} />
            </div>

            <div>
              <CardTitle className="text-lg text-rose-900">
                Danger Zone
              </CardTitle>

              <CardDescription className="text-rose-600/70">
                Irreversible actions for your application data.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Reset Local Storage
                </p>

                <p className="text-xs text-slate-500">
                  Wipe all tasks, columns, and custom projects from this
                  browser.
                </p>
              </div>

              <Button
                variant="destructive"
                onClick={handleReset}
                className="flex gap-2 shrink-0"
              >
                <Trash2 size={16} />
                Delete All Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
