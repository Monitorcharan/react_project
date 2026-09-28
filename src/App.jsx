import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Components
import Sidebar from './components/Sidebar';
import AppHeader from './components/AppHeader';
import TaskModal from './components/TaskModal';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Analytics from './pages/Analytics';
import Team from './pages/Team';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

import './App.css';

// Authenticated Workspace Layout
function WorkspaceLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [globalTaskModal, setGlobalTaskModal] = useState(false);
  const { user } = useAuth();

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="app-main">
        <AppHeader 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          onOpenNewTask={() => setGlobalTaskModal(true)}
        />
        
        <main className="app-content">
          <Outlet />
        </main>
      </div>

      {/* Quick Task Creation from anywhere in the workspace */}
      <TaskModal
        isOpen={globalTaskModal}
        onClose={() => setGlobalTaskModal(false)}
        onAddTask={(task) => {
          // Task added message
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <Routes>
              {/* Public Marketing & Auth Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Authenticated Workspace App Routes */}
              <Route element={<WorkspaceLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/team" element={<Team />} />
                <Route path="/settings" element={<Settings />} />
              </Route>

              {/* 404 Fallback Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
