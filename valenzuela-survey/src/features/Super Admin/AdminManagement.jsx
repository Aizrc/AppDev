import { useState } from 'react';
import { 
  Search,
  UserPlus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  X,
  Save,
  Lock,
  Unlock,
  Mail,
  Phone,
  User,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

// Deep Sea Blue Color Palette
const colors = {
  primary: '#003D5B',
  secondary: '#005F8C',
  accent: '#0081C9',
  light: '#E8F4F8',
  dark: '#001F2D',
};

const AdminManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: 'John Admin',
      email: 'john.admin@valenzuela.gov.ph',
      phone: '09123456789',
      role: 'Admin',
      status: 'active',
      createdAt: '2025-01-15',
      lastLogin: '2025-10-21 08:30:00'
    },
    {
      id: 2,
      name: 'Jane Manager',
      email: 'jane.manager@valenzuela.gov.ph',
      phone: '09187654321',
      role: 'Admin',
      status: 'active',
      createdAt: '2025-02-20',
      lastLogin: '2025-10-21 09:15:00'
    },
    {
      id: 3,
      name: 'Bob Supervisor',
      email: 'bob.supervisor@valenzuela.gov.ph',
      phone: '09198765432',
      role: 'Admin',
      status: 'inactive',
      createdAt: '2025-03-10',
      lastLogin: '2025-10-15 14:20:00'
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'Admin',
  });

  const handleOpenModal = (mode, admin = null) => {
    setModalMode(mode);
    if (admin) {
      setSelectedAdmin(admin);
      setFormData({
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        password: '',
        confirmPassword: '',
        role: admin.role,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'Admin',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAdmin(null);
    setShowPassword(false);
  };

  const handleCreateAdmin = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const newAdmin = {
      id: admins.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: 'Never'
    };

    setAdmins([...admins, newAdmin]);
    setSuccessMessage('Admin account created successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    handleCloseModal();
  };

  const handleUpdateAdmin = () => {
    const updatedAdmins = admins.map(admin => 
      admin.id === selectedAdmin.id 
        ? { ...admin, name: formData.name, email: formData.email, phone: formData.phone }
        : admin
    );
    setAdmins(updatedAdmins);
    setSuccessMessage('Admin account updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    handleCloseModal();
  };

  const handleDeleteAdmin = (adminId) => {
    if (window.confirm('Are you sure you want to delete this admin account? This action cannot be undone.')) {
      setAdmins(admins.filter(admin => admin.id !== adminId));
      setSuccessMessage('Admin account deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleToggleStatus = (adminId) => {
    const updatedAdmins = admins.map(admin => 
      admin.id === adminId 
        ? { ...admin, status: admin.status === 'active' ? 'inactive' : 'active' }
        : admin
    );
    setAdmins(updatedAdmins);
    const admin = admins.find(a => a.id === adminId);
    setSuccessMessage(`Admin account ${admin.status === 'active' ? 'disabled' : 'enabled'} successfully!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div 
          className="rounded-lg p-4 flex items-center gap-3 shadow-lg"
          style={{ backgroundColor: `${colors.accent}20`, borderLeft: `4px solid ${colors.accent}` }}
        >
          <CheckCircle className="w-5 h-5" style={{ color: colors.accent }} />
          <p className="font-medium" style={{ color: colors.primary }}>{successMessage}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg" style={{ borderTop: `4px solid ${colors.accent}` }}>
          <Card.Content className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Admins</p>
                <p className="text-3xl font-bold" style={{ color: colors.primary }}>{admins.length}</p>
              </div>
              <Shield className="w-10 h-10" style={{ color: colors.accent }} />
            </div>
          </Card.Content>
        </Card>

        <Card className="shadow-lg" style={{ borderTop: `4px solid #10B981` }}>
          <Card.Content className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Admins</p>
                <p className="text-3xl font-bold text-green-600">
                  {admins.filter(a => a.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </Card.Content>
        </Card>

        <Card className="shadow-lg" style={{ borderTop: `4px solid #EF4444` }}>
          <Card.Content className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Inactive Admins</p>
                <p className="text-3xl font-bold text-red-600">
                  {admins.filter(a => a.status === 'inactive').length}
                </p>
              </div>
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Search and Create */}
      <Card className="shadow-lg" style={{ borderTop: `4px solid ${colors.primary}` }}>
        <Card.Content className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: colors.light }}
              />
            </div>
            <Button
              onClick={() => handleOpenModal('create')}
              className="flex items-center gap-2 whitespace-nowrap"
              style={{ backgroundColor: colors.primary }}
            >
              <UserPlus className="w-5 h-5" />
              Create New Admin
            </Button>
          </div>
        </Card.Content>
      </Card>

      {/* Admin Table */}
      <Card className="shadow-lg" style={{ borderTop: `4px solid ${colors.secondary}` }}>
        <Card.Header>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" style={{ color: colors.primary }} />
              <Card.Title style={{ color: colors.dark }}>Admin Accounts</Card.Title>
            </div>
            <p className="text-sm text-gray-600">
              Showing {filteredAdmins.length} of {admins.length} admins
            </p>
          </div>
        </Card.Header>
        <Card.Content className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: colors.light }}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.primary }}>
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.primary }}>
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.primary }}>
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.primary }}>
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.primary }}>
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.primary }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAdmins.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p>No admin accounts found</p>
                    </td>
                  </tr>
                ) : (
                  filteredAdmins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.light }}>
                            <User className="w-5 h-5" style={{ color: colors.primary }} />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{admin.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{admin.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{admin.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          admin.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {admin.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {admin.lastLogin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenModal('view', admin)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleOpenModal('edit', admin)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-yellow-600" />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(admin.id)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title={admin.status === 'active' ? 'Disable' : 'Enable'}
                          >
                            {admin.status === 'active' ? (
                              <Lock className="w-4 h-4 text-red-600" />
                            ) : (
                              <Unlock className="w-4 h-4 text-green-600" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDeleteAdmin(admin.id)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card.Content>
      </Card>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 p-6 border-b flex items-center justify-between" style={{ backgroundColor: colors.primary }}>
              <h3 className="text-xl font-bold text-white">
                {modalMode === 'create' && 'Create New Admin'}
                {modalMode === 'edit' && 'Edit Admin Account'}
                {modalMode === 'view' && 'Admin Account Details'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={modalMode === 'view'}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={modalMode === 'view'}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={modalMode === 'view'}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    disabled={modalMode === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  >
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              {(modalMode === 'create' || modalMode === 'edit') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="relative">
                    <Input
                      label={modalMode === 'create' ? 'Password' : 'New Password (leave blank to keep current)'}
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required={modalMode === 'create'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <Input
                    label="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required={modalMode === 'create'}
                  />
                </div>
              )}

              {modalMode === 'view' && selectedAdmin && (
                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Account Created:</span>
                    <span className="text-sm text-gray-900">{selectedAdmin.createdAt}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Last Login:</span>
                    <span className="text-sm text-gray-900">{selectedAdmin.lastLogin}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      selectedAdmin.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedAdmin.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {modalMode !== 'view' && (
              <div className="p-6 border-t flex items-center justify-end gap-3">
                <Button
                  onClick={handleCloseModal}
                  className="bg-gray-500 hover:bg-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  onClick={modalMode === 'create' ? handleCreateAdmin : handleUpdateAdmin}
                  className="flex items-center gap-2"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Save className="w-5 h-5" />
                  {modalMode === 'create' ? 'Create Admin' : 'Update Admin'}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
