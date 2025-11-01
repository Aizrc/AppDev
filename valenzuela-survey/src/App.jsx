import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthContext';
import SuperAdminRoute from './features/auth/Routes/SuperAdminRoute';
import AdminRoute from './features/auth/Routes/AdminRoute';
import CustomerRoute from './features/auth/Routes/CustomerRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './features/Homepage/Homepage';
import About from './features/Homepage/About';
import Services from './features/Homepage/Services';
import ContactUs from './features/Homepage/ContactUs';
import SurveyForm from './features/Customer/SurveyForm';
import AdminDashboard from './features/Admin/AdminDashboard';
import SuperAdminDashboard from './features/Super Admin/SuperAdminDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Super Admin Dashboard - Protected, No Header/Footer */}
          <Route 
            path="/super-admin-dashboard" 
            element={
              <SuperAdminRoute>
                <SuperAdminDashboard />
              </SuperAdminRoute>
            } 
          />
          
          {/* Admin Dashboard - Protected, No Header/Footer */}
          <Route 
            path="/admin-dashboard" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />

          {/* Survey Form - Protected for Customers */}
          <Route 
            path="/survey/form" 
            element={
              <CustomerRoute>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-grow">
                    <SurveyForm />
                  </main>
                  <Footer />
                </div>
              </CustomerRoute>
            } 
          />

          <Route path="/survey" element={<SurveyForm />} />

  
          <Route path="/*" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
