import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {Input} from '@/components/ui/input' ;
import{ Label } from '@/components/ui/label';
import{Switch} from '@/components/ui/switch'; 
import{Button } from '@/components/ui/button' ;


// Define types for settings
interface ProfileSettings {
  fullName: string;
  email: string;
  profilePicture: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
}

const UserSettingsPage: React.FC = () => {
  // State for profile settings
  const [profileSettings, setProfileSettings] = useState<ProfileSettings>({
    fullName: '',
    email: '',
    profilePicture: ''
  });

  // State for security settings
  const [twoFactorAuth, setTwoFactorAuth] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // State for notification settings
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true
  });

  // State for messages
  const [profileMessage, setProfileMessage] = useState<string>('');
  const [securityMessage, setSecurityMessage] = useState<string>('');
  const [notificationMessage, setNotificationMessage] = useState<string>('');

  // Mock fetching settings from API
  useEffect(() => {
    // Simulate fetching user settings
    setProfileSettings({
      fullName: 'John Doe',
      email: 'john@example.com',
      profilePicture: 'https://example.com/profile.jpg'
    });
    setTwoFactorAuth(false);
    setNotificationSettings({
      emailNotifications: true,
      pushNotifications: false
    });
  }, []);

  // Handlers for updating profile settings
  const handleProfileChange = (key: keyof ProfileSettings, value: string) => {
    setProfileSettings(prev => ({ ...prev, [key]: value }));
  };

  // Handlers for updating notification settings
  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
  };

  // Save handlers
  const saveProfile = () => {
    // Simulate API call to save profile
    setProfileMessage('Profile updated successfully');
    setTimeout(() => setProfileMessage(''), 3000);
  };

  const saveSecurity = () => {
    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        setSecurityMessage('Please fill all password fields to change password');
        return;
      }
      if (newPassword !== confirmPassword) {
        setSecurityMessage('New password and confirm password do not match');
        return;
      }
      // Simulate password change
      console.log('Changing password...');
    }
    // Simulate updating two-factor auth
    console.log('Updating two-factor auth to', twoFactorAuth);
    setSecurityMessage('Security settings updated');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSecurityMessage(''), 3000);
  };

  const saveNotifications = () => {
    // Simulate API call to save notification settings
    setNotificationMessage('Notification settings updated');
    setTimeout(() => setNotificationMessage(''), 3000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profileSettings.fullName}
                    onChange={(e) => handleProfileChange('fullName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={profileSettings.email}
                    disabled
                  />
                  <p className="text-sm text-gray-500">Contact support to change email</p>
                </div>
                <div>
                  <Label htmlFor="profilePicture">Profile Picture URL</Label>
                  <Input
                    id="profilePicture"
                    value={profileSettings.profilePicture}
                    onChange={(e) => handleProfileChange('profilePicture', e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button onClick={saveProfile}>Save Profile</Button>
                {profileMessage && <p className="text-green-500 mt-2">{profileMessage}</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <p className="text-sm text-gray-500">Leave blank to keep current password</p>
                  <div className="space-y-4 mt-2">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={twoFactorAuth}
                    onCheckedChange={setTwoFactorAuth}
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button onClick={saveSecurity}>Save Security Settings</Button>
                {securityMessage && (
                  <p className={securityMessage.includes('updated') ? 'text-green-500' : 'text-red-500'}>
                    {securityMessage}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p className="text-sm text-gray-500">Receive updates via browser notifications</p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button onClick={saveNotifications}>Save Notification Settings</Button>
                {notificationMessage && <p className="text-green-500 mt-2">{notificationMessage}</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserSettingsPage;