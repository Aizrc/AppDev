import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  Activity,
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User
} from 'lucide-react';
import Card from '../../components/ui/Card';
import AdminSettings from './AdminSettings';
import UserManagement from './UserManagement';


const DashboardContent = () => {
  const stats = [
    {
      title: 'Total Surveys',
      value: '1,234',
      change: '+12.5%',
      trend: 'up',
      icon: FileText,
      color: 'bg-[#15803E]',
      lightColor: 'bg-[#DCFCE7]',
    },
    {
      title: 'Active Users',
      value: '856',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'bg-[#16A34A]',
      lightColor: 'bg-[#86EFAC]',
    },
    {
      title: 'Completed',
      value: '1,089',
      change: '+18.3%',
      trend: 'up',
      icon: CheckCircle,
      color: 'bg-[#15803E]',
      lightColor: 'bg-[#DCFCE7]',
    },
    {
      title: 'Pending',
      value: '145',
      change: '-5.1%',
      trend: 'down',
      icon: Clock,
      color: 'bg-yellow-600',
      lightColor: 'bg-yellow-100',
    },
  ];

  const recentSurveys = [
    { id: 1, name: 'John Doe', service: 'Business Permit', status: 'Completed', date: '2025-10-20', rating: 5 },
    { id: 2, name: 'Jane Smith', service: 'Civil Registry', status: 'Completed', date: '2025-10-20', rating: 4 },
    { id: 3, name: 'Bob Johnson', service: 'Health Services', status: 'Pending', date: '2025-10-19', rating: null },
    { id: 4, name: 'Alice Brown', service: 'Building Permit', status: 'Completed', date: '2025-10-19', rating: 5 },
    { id: 5, name: 'Charlie Wilson', service: 'Social Welfare', status: 'Completed', date: '2025-10-18', rating: 3 },
  ];

  const satisfactionData = [
    { rating: 5, count: 523, percentage: 48 },
    { rating: 4, count: 312, percentage: 29 },
    { rating: 3, count: 154, percentage: 14 },
    { rating: 2, count: 67, percentage: 6 },
    { rating: 1, count: 33, percentage: 3 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <Card.Content className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-[#15803E]">{stat.value}</p>
              </Card.Content>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Satisfaction Breakdown */}
        <Card>
          <Card.Header>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#15803E]" />
              <Card.Title>Satisfaction Breakdown</Card.Title>
            </div>
          </Card.Header>
          <Card.Content className="p-6">
            <div className="space-y-4">
              {satisfactionData.map((item) => (
                <div key={item.rating}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        {item.rating} Star{item.rating !== 1 ? 's' : ''}
                      </span>
                      <span className="text-xs text-gray-500">({item.count})</span>
                    </div>
                    <span className="text-sm font-medium text-[#15803E]">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#15803E] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        {/* Quick Stats */}
        <Card>
          <Card.Header>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#15803E]" />
              <Card.Title>Performance Metrics</Card.Title>
            </div>
          </Card.Header>
          <Card.Content className="p-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Average Rating</span>
                  <span className="text-2xl font-bold text-[#15803E]">4.2</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#15803E] h-2 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Response Rate</span>
                  <span className="text-2xl font-bold text-[#15803E]">88%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#16A34A] h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                  <span className="text-2xl font-bold text-[#15803E]">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#15803E] h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Recent Surveys Table */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#15803E]" />
              <Card.Title>Recent Survey Submissions</Card.Title>
            </div>
            <button className="text-sm text-[#15803E] hover:text-[#16A34A] font-medium">
              View All
            </button>
          </div>
        </Card.Header>
        <Card.Content className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F0FDF4] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#15803E] uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#15803E] uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#15803E] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#15803E] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#15803E] uppercase tracking-wider">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentSurveys.map((survey) => (
                  <tr key={survey.id} className="hover:bg-[#F0FDF4] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{survey.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{survey.service}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        survey.status === 'Completed'
                          ? 'bg-[#DCFCE7] text-[#15803E]'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {survey.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {survey.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {survey.rating ? (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={i < survey.rating ? 'text-yellow-400' : 'text-gray-300'}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

// Main Admin Dashboard Layout Component
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: DashboardContent },
    { id: 'users', label: 'User Management', icon: Users, component: UserManagement },
    { id: 'settings', label: 'Settings', icon: Settings, component: AdminSettings },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] flex">
      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-[#15803E] text-white transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isSidebarOpen ? 'w-64' : 'lg:w-20'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Toggle */}
          <div className="p-6 border-b border-[#16A34A]">
            <div className="flex items-center justify-between">
              {isSidebarOpen && (
                <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
              )}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-[#16A34A] transition-colors lg:block hidden"
                aria-label="Toggle sidebar"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#16A34A] shadow-lg text-white' 
                      : 'hover:bg-[#16A34A]/50 text-[#DCFCE7]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isSidebarOpen && (
                    <span className="font-medium">{tab.label}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-[#16A34A]">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors text-[#DCFCE7] hover:text-white"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {isSidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
                  aria-label="Toggle menu"
                >
                  <Menu className="w-6 h-6 text-[#15803E]" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-[#15803E]">
                    {tabs.find(tab => tab.id === activeTab)?.label}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Welcome back, Administrator
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Bell className="w-6 h-6 text-[#15803E]" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile */}
                <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#F0FDF4]">
                  <div className="w-8 h-8 rounded-full bg-[#15803E] flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-[#15803E]">Admin User</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {ActiveComponent && <ActiveComponent />}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>© 2025 City Government of Valenzuela. All rights reserved.</p>
            <p>Admin Dashboard v1.0</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
