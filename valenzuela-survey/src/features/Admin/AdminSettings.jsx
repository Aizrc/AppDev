import { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  Shield,
  Mail,
  Save,
  Eye,
  EyeOff,
  CheckCircle
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const AdminSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const [profileData, setProfileData] = useState({
    fullName: 'Admin User',
    email: 'admin@valenzuela.gov.ph',
    phone: '09123456789',
    position: 'System Administrator',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    surveyAlerts: true,
    userRegistration: false,
    systemUpdates: true,
  });

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    setSavedMessage('Profile updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setSavedMessage('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleNotificationSave = () => {
    setSavedMessage('Notification settings saved!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleSystemSave = () => {
    setSavedMessage('System settings saved!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {savedMessage && (
        <div className="bg-[#DCFCE7] border border-[#15803E] rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-[#15803E]" />
          <p className="text-[#15803E] font-medium">{savedMessage}</p>
        </div>
      )}

      {/* Profile Settings */}
      <Card>
        <Card.Header>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#15803E]" />
            <Card.Title>Profile Settings</Card.Title>
          </div>
        </Card.Header>
        <Card.Content className="p-6">
          <form onSubmit={handleProfileSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                type="text"
                value={profileData.fullName}
                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                required
              />
              <Input
                label="Position"
                type="text"
                value={profileData.position}
                onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                icon={Save}
                className="bg-[#15803E] hover:bg-[#16A34A]"
              >
                Save Profile
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>

      {/* Password Settings */}
      <Card>
        <Card.Header>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#15803E]" />
            <Card.Title>Change Password</Card.Title>
          </div>
        </Card.Header>
        <Card.Content className="p-6">
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div className="relative">
              <Input
                label="Current Password"
                type={showPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <Input
                  label="New Password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <Input
                label="Confirm New Password"
                type={showNewPassword ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                required
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                icon={Save}
                className="bg-[#15803E] hover:bg-[#16A34A]"
              >
                Change Password
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>

      {/* Notification Settings */}
      <Card>
        <Card.Header>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#15803E]" />
            <Card.Title>Notification Preferences</Card.Title>
          </div>
        </Card.Header>
        <Card.Content className="p-6">
          <div className="space-y-4">
            {Object.entries(notificationSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-[#F0FDF4] rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </p>
                  <p className="text-sm text-gray-600">
                    Receive notifications about {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, [key]: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#86EFAC] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#15803E]"></div>
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <Button
              onClick={handleNotificationSave}
              variant="primary"
              icon={Save}
              className="bg-[#15803E] hover:bg-[#16A34A]"
            >
              Save Notifications
            </Button>
          </div>
        </Card.Content>
      </Card>

      {/* System Settings */}
      <Card>
        <Card.Header>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#15803E]" />
            <Card.Title>System Settings</Card.Title>
          </div>
        </Card.Header>
        <Card.Content className="p-6">
          <div className="space-y-4">
            {Object.entries(systemSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-[#F0FDF4] rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </p>
                  <p className="text-sm text-gray-600">
                    {key === 'maintenanceMode' && 'Put the system in maintenance mode'}
                    {key === 'allowRegistration' && 'Allow new users to register'}
                    {key === 'requireEmailVerification' && 'Require email verification for new accounts'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setSystemSettings({ ...systemSettings, [key]: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#86EFAC] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#15803E]"></div>
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <Button
              onClick={handleSystemSave}
              variant="primary"
              icon={Save}
              className="bg-[#15803E] hover:bg-[#16A34A]"
            >
              Save System Settings
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default AdminSettings;
