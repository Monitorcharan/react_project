import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USER = {
  id: 'usr_94821',
  name: 'Alex Morgan',
  email: 'alex.morgan@nexusflow.io',
  role: 'Staff Product Engineer',
  avatar: 'AM',
  company: 'Synthetix AI Labs',
  plan: 'Enterprise Pro',
  bio: 'Building next-gen digital infrastructure & high-velocity teams.',
  joinedDate: 'March 2024',
  notifications: {
    emailDigest: true,
    taskAlerts: true,
    weeklyReport: false,
    securityAlerts: true,
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nexusflow_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER; // Start with active session for instant exploration, while letting user logout & test login/signup
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('nexusflow_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nexusflow_user');
    }
  }, [user]);

  const login = (email, password) => {
    // Generate avatar initials from email or username
    const namePart = email.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const initials = formattedName.substring(0, 2).toUpperCase();

    const loggedInUser = {
      id: 'usr_' + Math.floor(Math.random() * 89999 + 10000),
      name: formattedName || 'Nexus User',
      email: email,
      role: 'Project Lead',
      avatar: initials || 'NU',
      company: 'Digital Innovation Hub',
      plan: 'Pro Tier',
      bio: 'Exploring NexusFlow workspace tools.',
      joinedDate: 'Today',
      notifications: {
        emailDigest: true,
        taskAlerts: true,
        weeklyReport: true,
        securityAlerts: true,
      },
    };
    setUser(loggedInUser);
    return loggedInUser;
  };

  const signup = (name, email, password, plan = 'Pro Tier') => {
    const initials = name
      .split(' ')
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'NU';

    const newUser = {
      id: 'usr_' + Math.floor(Math.random() * 89999 + 10000),
      name: name,
      email: email,
      role: 'Product Lead',
      avatar: initials,
      company: 'Apex Technologies',
      plan: plan,
      bio: 'Ready to elevate team velocity with NexusFlow.',
      joinedDate: 'Today',
      notifications: {
        emailDigest: true,
        taskAlerts: true,
        weeklyReport: true,
        securityAlerts: true,
      },
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      return updated;
    });
  };

  const resetToDemoUser = () => {
    setUser(DEFAULT_USER);
    return DEFAULT_USER;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
        resetToDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
