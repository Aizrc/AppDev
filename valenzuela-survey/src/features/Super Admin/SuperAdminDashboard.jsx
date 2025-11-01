import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard,
  Users,
  Activity,
  Settings,
  LogOut,
  Bell,
  User,
  RefreshCw,
  Wrench,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import Card from '../../components/ui/Card';
import ActivityLogs from './ActivityLogs';
import AdminManagement from './AdminManagement';
import logo from '../../assets/logo.png';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);


const colors = {
  primary: '#003D5B',      
  secondary: '#005F8C',    
  accent: '#0081C9',       
  light: '#E8F4F8',        
  dark: '#001F2D',         
  hover: '#004D73',        
};

const DashboardContent = ({ maintenanceMode, setMaintenanceMode }) => {
  const [latestActivities, setLatestActivities] = useState([
    { id: 1, user: 'Admin User', action: 'Signed In', time: '2 mins ago', type: 'signin' },
    { id: 2, user: 'John Doe', action: 'Submitted Survey', time: '5 mins ago', type: 'survey' },
    { id: 3, user: 'Admin User', action: 'Updated Profile', time: '10 mins ago', type: 'update' },
    { id: 4, user: 'Jane Smith', action: 'Signed Out', time: '15 mins ago', type: 'signout' },
    { id: 5, user: 'Super Admin', action: 'Enabled Maintenance', time: '20 mins ago', type: 'maintenance' },
  ]);

  const [customerFeedback] = useState([
    { id: 1, name: 'John Doe', message: 'Excellent service! Very satisfied.', rating: 5, time: '1 hour ago' },
    { id: 2, name: 'Jane Smith', message: 'Good experience, fast processing.', rating: 4, time: '2 hours ago' },
    { id: 3, name: 'Bob Wilson', message: 'Could be better, long waiting time.', rating: 3, time: '3 hours ago' },
    { id: 4, name: 'Alice Brown', message: 'Amazing! Will recommend to others.', rating: 5, time: '4 hours ago' },
  ]);


  const surveyTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Surveys Completed',
        data: [65, 78, 90, 81, 96, 115],
        borderColor: colors.accent,
        backgroundColor: `${colors.accent}20`,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const satisfactionData = {
    labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
    datasets: [
      {
        data: [520, 312, 89, 45, 24],
        backgroundColor: [
          colors.accent,
          colors.secondary,
          '#FFB800',
          '#FF8042',
          '#FF4842',
        ],
      },
    ],
  };

  const activityData = {
    labels: ['Sign In', 'Sign Out', 'Surveys', 'Updates', 'Admin Actions'],
    datasets: [
      {
        label: 'Activity Count',
        data: [245, 198, 167, 89, 56],
        backgroundColor: colors.primary,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const handleMaintenanceToggle = () => {
    setMaintenanceMode(!maintenanceMode);
    const newActivity = {
      id: Date.now(),
      user: 'Super Admin',
      action: maintenanceMode ? 'Disabled Maintenance' : 'Enabled Maintenance',
      time: 'Just now',
      type: 'maintenance'
    };
    setLatestActivities([newActivity, ...latestActivities.slice(0, 4)]);
  };

  useEffect(() => {

    const interval = setInterval(() => {

      const actions = ['Signed In', 'Signed Out', 'Submitted Survey', 'Updated Profile'];
      const users = ['Admin User', 'John Doe', 'Jane Smith', 'Bob Wilson'];
      const types = ['signin', 'signout', 'survey', 'update'];
      
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      const newActivity = {
        id: Date.now(),
        user: randomUser,
        action: randomAction,
        time: 'Just now',
        type: randomType
      };
      
      setLatestActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type) => {
    switch(type) {
      case 'signin': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'signout': return <Clock className="w-4 h-4 text-gray-500" />;
      case 'survey': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'update': return <Settings className="w-4 h-4 text-yellow-500" />;
      case 'maintenance': return <Wrench className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">

      {maintenanceMode && (
        <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="w-8 h-8 animate-pulse" />
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-1">ARTA CSS Have Maintenance</h2>
              <p className="text-lg">Please Come Back Later</p>
            </div>
          </div>
        </div>
      )}


      <Card className="shadow-lg border-2" style={{ borderColor: colors.primary }}>
        <Card.Content className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wrench className="w-6 h-6" style={{ color: colors.primary }} />
              <div>
                <h3 className="font-bold text-lg" style={{ color: colors.dark }}>System Maintenance Mode</h3>
                <p className="text-sm text-gray-600">
                  {maintenanceMode 
                    ? 'System is currently in maintenance mode. Users cannot login or submit surveys.' 
                    : 'System is operational. Users can login and submit surveys.'}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={handleMaintenanceToggle}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-600" 
              style={{ boxShadow: maintenanceMode ? `0 0 10px ${colors.accent}` : 'none' }}></div>
            </label>
          </div>
        </Card.Content>
      </Card>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-1">
          <Card className="shadow-lg" style={{ borderTop: `4px solid ${colors.primary}` }}>
            <Card.Header>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5" style={{ color: colors.primary }} />
                  <Card.Title style={{ color: colors.dark }}>Latest Activity Logs</Card.Title>
                </div>
                <button 
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setLatestActivities([...latestActivities])}
                >
                  <RefreshCw className="w-4 h-4" style={{ color: colors.primary }} />
                </button>
              </div>
            </Card.Header>
            <Card.Content className="p-4">
              <div className="space-y-3">
                {latestActivities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="p-3 rounded-lg hover:shadow-md transition-all"
                    style={{ backgroundColor: colors.light }}
                  >
                    <div className="flex items-start gap-3">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {activity.user}
                        </p>
                        <p className="text-xs text-gray-600">{activity.action}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        </div>


        <div className="lg:col-span-2 space-y-6">

          <Card className="shadow-lg" style={{ borderTop: `4px solid ${colors.accent}` }}>
            <Card.Header>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" style={{ color: colors.accent }} />
                <Card.Title style={{ color: colors.dark }}>Survey Trends</Card.Title>
              </div>
            </Card.Header>
            <Card.Content className="p-6">
              <div style={{ height: '250px' }}>
                <Line data={surveyTrendsData} options={chartOptions} />
              </div>
            </Card.Content>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-lg" style={{ borderTop: `4px solid ${colors.secondary}` }}>
              <Card.Header>
                <Card.Title style={{ color: colors.dark }}>Activity Distribution</Card.Title>
              </Card.Header>
              <Card.Content className="p-6">
                <div style={{ height: '200px' }}>
                  <Bar data={activityData} options={chartOptions} />
                </div>
              </Card.Content>
            </Card>

            <Card className="shadow-lg" style={{ borderTop: `4px solid ${colors.secondary}` }}>
              <Card.Header>
                <Card.Title style={{ color: colors.dark }}>Satisfaction Breakdown</Card.Title>
              </Card.Header>
              <Card.Content className="p-6">
                <div style={{ height: '200px' }}>
                  <Doughnut data={satisfactionData} options={chartOptions} />
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>

      <div className="fixed right-0 top-20 w-[30%] max-w-md z-40 hidden xl:block">
        <div 
          className="rounded-l-2xl shadow-2xl p-6"
          style={{ 
            backgroundColor: colors.primary,
            boxShadow: `-5px 5px 20px rgba(0, 61, 91, 0.3)`
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-white" />
            <h3 className="text-lg font-bold text-white">Customer Feedback</h3>
          </div>
          <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
            {customerFeedback.map((feedback) => (
              <div 
                key={feedback.id} 
                className="p-4 rounded-lg shadow"
                style={{ backgroundColor: colors.light }}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-sm" style={{ color: colors.dark }}>
                    {feedback.name}
                  </p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-700 mb-2">{feedback.message}</p>
                <p className="text-xs text-gray-500">{feedback.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [maintenanceMode, setMaintenanceMode] = useState(false);


  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('superAdminAuth');
    if (!isAuthenticated) {
      navigate('/super-admin-login');
    }
  }, [navigate]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: DashboardContent },
    { id: 'admins', label: 'Admin Management', icon: Users, component: AdminManagement },
    { id: 'logs', label: 'Activity Logs', icon: Activity, component: ActivityLogs },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {

      sessionStorage.removeItem('superAdminAuth');
      sessionStorage.removeItem('superAdminEmail');
 
      navigate('/super-admin-login');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.light }}>

      <header 
        className="sticky top-0 z-50 shadow-lg"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-white">Super Admin Panel</h1>
                <p className="text-sm" style={{ color: colors.light }}>
                  City Government of Valenzuela
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">

              <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Bell className="w-6 h-6 text-white" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg" style={{ backgroundColor: colors.secondary }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">Super Admin</p>
                  <p className="text-xs" style={{ color: colors.light }}>Administrator</p>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div 
        className="sticky top-[88px] z-40 shadow-md"
        style={{ backgroundColor: colors.secondary }}
      >
        <div className="px-6">
          <nav className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 border-b-4 ${
                    isActive 
                      ? 'text-white border-white'
                      : 'text-white/70 border-transparent hover:text-white hover:border-white/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-[1600px] mx-auto">
          {ActiveComponent && (
            <ActiveComponent 
              maintenanceMode={maintenanceMode} 
              setMaintenanceMode={setMaintenanceMode}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer 
        className="mt-12 shadow-inner"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between text-sm text-white">
            <p>© 2025 City Government of Valenzuela. All rights reserved.</p>
            <p>Super Admin Dashboard v1.0</p>
          </div>
        </div>
      </footer>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${colors.light};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${colors.accent};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${colors.secondary};
        }
      `}</style>
    </div>
  );
};

export default SuperAdminDashboard;
