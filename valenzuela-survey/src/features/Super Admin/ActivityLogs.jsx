import { useState } from 'react';
import { 
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Activity,
  CheckCircle,
  Clock,
  Settings,
  MessageSquare,
  Wrench,
  UserPlus,
  UserMinus,
  Lock,
  Unlock,
  Edit,
  AlertTriangle
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const colors = {
  primary: '#003D5B',
  secondary: '#005F8C',
  accent: '#0081C9',
  light: '#E8F4F8',
  dark: '#001F2D',
};

const ActivityLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Sample activity logs data
  const [logs] = useState([
    { id: 1, timestamp: '2025-10-21 09:15:23', user: 'Super Admin', action: 'Enabled Maintenance Mode', type: 'maintenance', details: 'System maintenance activated' },
    { id: 2, timestamp: '2025-10-21 09:10:45', user: 'Admin User', action: 'Signed In', type: 'signin', details: 'Logged in from 192.168.1.100' },
    { id: 3, timestamp: '2025-10-21 09:05:12', user: 'John Doe', action: 'Submitted Survey', type: 'survey', details: 'Survey ID: #1234 - Business Permit Service' },
    { id: 4, timestamp: '2025-10-21 09:00:34', user: 'Jane Smith', action: 'Changed Password', type: 'password', details: 'Password updated successfully' },
    { id: 5, timestamp: '2025-10-21 08:55:56', user: 'Admin User', action: 'Disabled Account', type: 'disable', details: 'Account: user@example.com disabled' },
    { id: 6, timestamp: '2025-10-21 08:50:23', user: 'Bob Wilson', action: 'Updated Profile', type: 'update', details: 'Changed phone number' },
    { id: 7, timestamp: '2025-10-21 08:45:18', user: 'Alice Brown', action: 'Signed Out', type: 'signout', details: 'Logged out successfully' },
    { id: 8, timestamp: '2025-10-21 08:40:45', user: 'Admin User', action: 'Enabled Account', type: 'enable', details: 'Account: user2@example.com enabled' },
    { id: 9, timestamp: '2025-10-21 08:35:12', user: 'Charlie Davis', action: 'Updated Contact Info', type: 'update', details: 'Changed email address' },
    { id: 10, timestamp: '2025-10-21 08:30:34', user: 'Super Admin', action: 'Disabled Maintenance Mode', type: 'maintenance', details: 'System maintenance deactivated' },
    { id: 11, timestamp: '2025-10-21 08:25:56', user: 'David Evans', action: 'Submitted Survey', type: 'survey', details: 'Survey ID: #1233 - Health Services' },
    { id: 12, timestamp: '2025-10-21 08:20:23', user: 'Emma Foster', action: 'Changed Name', type: 'update', details: 'Updated full name in profile' },
    { id: 13, timestamp: '2025-10-21 08:15:18', user: 'Admin User', action: 'Created New Admin', type: 'create', details: 'New admin account: newadmin@gov.ph' },
    { id: 14, timestamp: '2025-10-21 08:10:45', user: 'Frank Green', action: 'Signed In', type: 'signin', details: 'Logged in from 192.168.1.101' },
    { id: 15, timestamp: '2025-10-21 08:05:12', user: 'Grace Hill', action: 'Submitted Survey', type: 'survey', details: 'Survey ID: #1232 - Civil Registry' },
    { id: 16, timestamp: '2025-10-21 08:00:34', user: 'Admin User', action: 'Updated Admin Rights', type: 'update', details: 'Modified permissions for admin@gov.ph' },
    { id: 17, timestamp: '2025-10-21 07:55:56', user: 'Henry Irving', action: 'Changed Password', type: 'password', details: 'Password reset completed' },
    { id: 18, timestamp: '2025-10-21 07:50:23', user: 'Ivy Johnson', action: 'Signed Out', type: 'signout', details: 'Session ended' },
    { id: 19, timestamp: '2025-10-21 07:45:18', user: 'Jack Kelly', action: 'Updated Phone Number', type: 'update', details: 'Changed contact: +639123456789' },
    { id: 20, timestamp: '2025-10-21 07:40:45', user: 'Super Admin', action: 'System Backup', type: 'system', details: 'Database backup completed' },
  ]);

  const getActivityIcon = (type) => {
    switch(type) {
      case 'signin': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'signout': return <Clock className="w-5 h-5 text-gray-500" />;
      case 'survey': return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'update': return <Edit className="w-5 h-5 text-yellow-500" />;
      case 'password': return <Lock className="w-5 h-5 text-purple-500" />;
      case 'maintenance': return <Wrench className="w-5 h-5 text-red-500" />;
      case 'enable': return <Unlock className="w-5 h-5 text-green-500" />;
      case 'disable': return <UserMinus className="w-5 h-5 text-red-500" />;
      case 'create': return <UserPlus className="w-5 h-5 text-blue-500" />;
      case 'system': return <Settings className="w-5 h-5 text-indigo-500" />;
      default: return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getActivityBadgeColor = (type) => {
    switch(type) {
      case 'signin': return 'bg-green-100 text-green-800';
      case 'signout': return 'bg-gray-100 text-gray-800';
      case 'survey': return 'bg-blue-100 text-blue-800';
      case 'update': return 'bg-yellow-100 text-yellow-800';
      case 'password': return 'bg-purple-100 text-purple-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      case 'enable': return 'bg-green-100 text-green-800';
      case 'disable': return 'bg-red-100 text-red-800';
      case 'create': return 'bg-blue-100 text-blue-800';
      case 'system': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || log.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Timestamp,User,Action,Type,Details\n"
      + filteredLogs.map(log => 
          `${log.timestamp},"${log.user}","${log.action}","${log.type}","${log.details}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `activity_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-lg" style={{ borderTop: `4px solid ${colors.accent}` }}>
          <Card.Content className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Activities</p>
                <p className="text-3xl font-bold" style={{ color: colors.primary }}>{logs.length}</p>
              </div>
              <Activity className="w-10 h-10" style={{ color: colors.accent }} />
            </div>
          </Card.Content>
        </Card>

        <Card className="shadow-lg" style={{ borderTop: `4px solid #10B981` }}>
          <Card.Content className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Sign Ins Today</p>
                <p className="text-3xl font-bold text-green-600">
                  {logs.filter(l => l.type === 'signin').length}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </Card.Content>
        </Card>

        <Card className="shadow-lg" style={{ borderTop: `4px solid #3B82F6` }}>
          <Card.Content className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Surveys Submitted</p>
                <p className="text-3xl font-bold text-blue-600">
                  {logs.filter(l => l.type === 'survey').length}
                </p>
              </div>
              <MessageSquare className="w-10 h-10 text-blue-500" />
            </div>
          </Card.Content>
        </Card>

        <Card className="shadow-lg" style={{ borderTop: `4px solid #EF4444` }}>
          <Card.Content className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">System Actions</p>
                <p className="text-3xl font-bold text-red-600">
                  {logs.filter(l => l.type === 'maintenance' || l.type === 'system').length}
                </p>
              </div>
              <Wrench className="w-10 h-10 text-red-500" />
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-lg" style={{ borderTop: `4px solid ${colors.primary}` }}>
        <Card.Content className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by user, action, or details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ focusRing: colors.accent }}
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 appearance-none bg-white"
                style={{ minWidth: '180px' }}
              >
                <option value="all">All Activities</option>
                <option value="signin">Sign In</option>
                <option value="signout">Sign Out</option>
                <option value="survey">Surveys</option>
                <option value="update">Updates</option>
                <option value="password">Password Changes</option>
                <option value="enable">Account Enable</option>
                <option value="disable">Account Disable</option>
                <option value="maintenance">Maintenance</option>
                <option value="create">Account Creation</option>
                <option value="system">System Actions</option>
              </select>
            </div>

            {/* Export Button */}
            <Button
              onClick={handleExport}
              className="flex items-center gap-2"
              style={{ backgroundColor: colors.primary }}
            >
              <Download className="w-5 h-5" />
              Export CSV
            </Button>
          </div>
        </Card.Content>
      </Card>

      {/* Activity Logs Table */}
      <Card className="shadow-lg" style={{ borderTop: `4px solid ${colors.secondary}` }}>
        <Card.Header>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5" style={{ color: colors.primary }} />
              <Card.Title style={{ color: colors.dark }}>System Activity Logs</Card.Title>
            </div>
            <p className="text-sm text-gray-600">
              Showing {filteredLogs.length} of {logs.length} activities
            </p>
          </div>
        </Card.Header>
        <Card.Content className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: colors.light }}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.primary }}>
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.primary }}>
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.primary }}>
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.primary }}>
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.primary }}>
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p>No activity logs found matching your criteria</p>
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr 
                      key={log.id} 
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {log.timestamp}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{log.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getActivityIcon(log.type)}
                          <span className="text-sm text-gray-900">{log.action}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getActivityBadgeColor(log.type)}`}>
                          {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {log.details}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ActivityLogs;
