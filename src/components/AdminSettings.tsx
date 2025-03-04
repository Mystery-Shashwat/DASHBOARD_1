import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save} from "lucide-react";

// Define types for our settings
interface SystemSettings {
  maintenance: boolean;
  debugMode: boolean;
  userRegistration: boolean;
  backupFrequency: string;
  sessionTimeout: number;
  emailNotifications: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  passwordExpiry: number;
  loginAttempts: number;
  ipWhitelist: string[];
  auditLogs: boolean;
}

interface NotificationSettings {
  emailAlerts: boolean;
  userSignups: boolean;
  failedLogins: boolean;
  systemErrors: boolean;
  dailyReports: boolean;
  weeklyReports: boolean;
}

const AdminSettingsPage: React.FC = () => {
  // State for different settings categories
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    maintenance: false,
    debugMode: false,
    userRegistration: true,
    backupFrequency: "daily",
    sessionTimeout: 30,
    emailNotifications: true,
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: true,
    passwordExpiry: 90,
    loginAttempts: 5,
    ipWhitelist: [],
    auditLogs: true,
  });

  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      emailAlerts: true,
      userSignups: true,
      failedLogins: true,
      systemErrors: true,
      dailyReports: false,
      weeklyReports: true,
    });

  const [ipInput, setIpInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string>("");

  // Mock loading settings from API
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        // In a real app, fetch settings from backend here
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    };
    fetchSettings();
  }, []);

  // Handlers for updating settings
  const handleSystemSettingChange = (key: keyof SystemSettings, value: any) => {
    setSystemSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSecuritySettingChange = (
    key: keyof SecuritySettings,
    value: any
  ) => {
    setSecuritySettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleNotificationSettingChange = (
    key: keyof NotificationSettings,
    value: any
  ) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: value }));
  };

  const addIpToWhitelist = () => {
    if (ipInput && !securitySettings.ipWhitelist.includes(ipInput)) {
      setSecuritySettings((prev) => ({
        ...prev,
        ipWhitelist: [...prev.ipWhitelist, ipInput],
      }));
      setIpInput("");
    }
  };

  const removeIpFromWhitelist = (ip: string) => {
    setSecuritySettings((prev) => ({
      ...prev,
      ipWhitelist: prev.ipWhitelist.filter((item) => item !== ip),
    }));
  };

  const saveSettings = async () => {
    setLoading(true);
    setSaveMessage("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In a real app, send settings to backend here
      setSaveMessage("Settings saved successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
      setSaveMessage("Error saving settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>

      <Tabs defaultValue="system" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* System Settings Tab */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance" className="font-medium">
                      Maintenance Mode
                    </Label>
                    <p className="text-sm text-gray-500">
                      Makes site unavailable to regular users
                    </p>
                  </div>
                  <Switch
                    id="maintenance"
                    checked={systemSettings.maintenance}
                    onCheckedChange={(checked) =>
                      handleSystemSettingChange("maintenance", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="debugMode" className="font-medium">
                      Debug Mode
                    </Label>
                    <p className="text-sm text-gray-500">
                      Show detailed error messages
                    </p>
                  </div>
                  <Switch
                    id="debugMode"
                    checked={systemSettings.debugMode}
                    onCheckedChange={(checked) =>
                      handleSystemSettingChange("debugMode", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="userRegistration" className="font-medium">
                      User Registration
                    </Label>
                    <p className="text-sm text-gray-500">
                      Allow new users to register
                    </p>
                  </div>
                  <Switch
                    id="userRegistration"
                    checked={systemSettings.userRegistration}
                    onCheckedChange={(checked) =>
                      handleSystemSettingChange("userRegistration", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications" className="font-medium">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-gray-500">
                      Send system notifications via email
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={systemSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      handleSystemSettingChange("emailNotifications", checked)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <Label htmlFor="backupFrequency" className="font-medium">
                    Backup Frequency
                  </Label>
                  <Select
                    value={systemSettings.backupFrequency}
                    onValueChange={(value) =>
                      handleSystemSettingChange("backupFrequency", value)
                    }
                  >
                    <SelectTrigger id="backupFrequency" className="mt-2">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sessionTimeout" className="font-medium">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min={1}
                    max={240}
                    value={systemSettings.sessionTimeout}
                    onChange={(e) =>
                      handleSystemSettingChange(
                        "sessionTimeout",
                        parseInt(e.target.value) || 30
                      )
                    }
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactorAuth" className="font-medium">
                      Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-gray-500">
                      Require 2FA for admin accounts
                    </p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) =>
                      handleSecuritySettingChange("twoFactorAuth", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auditLogs" className="font-medium">
                      Audit Logs
                    </Label>
                    <p className="text-sm text-gray-500">
                      Track all admin actions
                    </p>
                  </div>
                  <Switch
                    id="auditLogs"
                    checked={securitySettings.auditLogs}
                    onCheckedChange={(checked) =>
                      handleSecuritySettingChange("auditLogs", checked)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <Label htmlFor="passwordExpiry" className="font-medium">
                    Password Expiry (days)
                  </Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    min={0}
                    max={365}
                    value={securitySettings.passwordExpiry}
                    onChange={(e) =>
                      handleSecuritySettingChange(
                        "passwordExpiry",
                        parseInt(e.target.value) || 90
                      )
                    }
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">0 = never expire</p>
                </div>

                <div>
                  <Label htmlFor="loginAttempts" className="font-medium">
                    Max Login Attempts
                  </Label>
                  <Input
                    id="loginAttempts"
                    type="number"
                    min={1}
                    max={10}
                    value={securitySettings.loginAttempts}
                    onChange={(e) =>
                      handleSecuritySettingChange(
                        "loginAttempts",
                        parseInt(e.target.value) || 5
                      )
                    }
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor="ipWhitelist" className="font-medium">
                  IP Whitelist
                </Label>
                <p className="text-sm text-gray-500 mb-2">
                  Only these IPs can access admin panel
                </p>

                <div className="flex items-center gap-2">
                  <Input
                    id="ipWhitelist"
                    value={ipInput}
                    onChange={(e) => setIpInput(e.target.value)}
                    placeholder="Enter IP address"
                    className="flex-1"
                  />
                  <Button onClick={addIpToWhitelist} type="button">
                    Add IP
                  </Button>
                </div>

                <div className="mt-4">
                  {securitySettings.ipWhitelist.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No IPs in whitelist (all IPs allowed)
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {securitySettings.ipWhitelist.map((ip) => (
                        <div
                          key={ip}
                          className="bg-gray-100 rounded-md px-3 py-1 flex items-center gap-2"
                        >
                          <span>{ip}</span>
                          <button
                            onClick={() => removeIpFromWhitelist(ip)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailAlerts" className="font-medium">
                      Email Alerts
                    </Label>
                    <p className="text-sm text-gray-500">
                      Receive general system alerts
                    </p>
                  </div>
                  <Switch
                    id="emailAlerts"
                    checked={notificationSettings.emailAlerts}
                    onCheckedChange={(checked) =>
                      handleNotificationSettingChange("emailAlerts", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="userSignups" className="font-medium">
                      New User Signups
                    </Label>
                    <p className="text-sm text-gray-500">
                      Notify when new users register
                    </p>
                  </div>
                  <Switch
                    id="userSignups"
                    checked={notificationSettings.userSignups}
                    onCheckedChange={(checked) =>
                      handleNotificationSettingChange("userSignups", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="failedLogins" className="font-medium">
                      Failed Logins
                    </Label>
                    <p className="text-sm text-gray-500">
                      Notify on failed login attempts
                    </p>
                  </div>
                  <Switch
                    id="failedLogins"
                    checked={notificationSettings.failedLogins}
                    onCheckedChange={(checked) =>
                      handleNotificationSettingChange("failedLogins", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="systemErrors" className="font-medium">
                      System Errors
                    </Label>
                    <p className="text-sm text-gray-500">
                      Notify on system errors
                    </p>
                  </div>
                  <Switch
                    id="systemErrors"
                    checked={notificationSettings.systemErrors}
                    onCheckedChange={(checked) =>
                      handleNotificationSettingChange("systemErrors", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dailyReports" className="font-medium">
                      Daily Reports
                    </Label>
                    <p className="text-sm text-gray-500">
                      Receive daily summary reports
                    </p>
                  </div>
                  <Switch
                    id="dailyReports"
                    checked={notificationSettings.dailyReports}
                    onCheckedChange={(checked) =>
                      handleNotificationSettingChange("dailyReports", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weeklyReports" className="font-medium">
                      Weekly Reports
                    </Label>
                    <p className="text-sm text-gray-500">
                      Receive weekly summary reports
                    </p>
                  </div>
                  <Switch
                    id="weeklyReports"
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(checked) =>
                      handleNotificationSettingChange("weeklyReports", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button and Message */}
      <div className="mt-6 flex items-center gap-4">
        <Button onClick={saveSettings} disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
          <Save className="ml-2 h-4 w-4" />
        </Button>
        {saveMessage && (
          <div
            className={`text-sm ${
              saveMessage.includes("Error") ? "text-red-500" : "text-green-500"
            }`}
          >
            {saveMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettingsPage;
