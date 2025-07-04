
import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import api from '../api';
import { io, Socket } from 'socket.io-client';

interface Notification {
    _id: string;
    message: string;
    link: string;
    read: boolean;
    createdAt: string;
}

interface User {
  _id: string;
  email: string;
  roles?: string[];
  isDiscoverable?: boolean;
  motivationCompass?: {
      scores: Record<string, number>;
      profile: string;
  };
  prepKit?: {
      journeyWhy?: string;
      hopes?: string;
      fears?: string;
      desiredFeelings?: string;
      medicalSnapshot?: string;
      supportSystem?: string;
      customQuestions?: string;
  };
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  register: (email:string, password:string) => Promise<any>;
  updateUser: (user: User) => void;
  notifications: Notification[];
  unreadCount: number;
  markNotificationAsRead: (id: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const fetchUserAndNotifications = async () => {
      if (token) {
        try {
          const userResponse = await api.get('/api/users/me');
          setUser(userResponse.data);
          setIsAuthenticated(true);
          const notificationsResponse = await api.get('/api/notifications');
          setNotifications(notificationsResponse.data);
          setUnreadCount(notificationsResponse.data.filter((n: Notification) => !n.read).length);
        } catch (error) {
          console.error('Failed to fetch user or notifications', error);
          logout();
        }
      } else {
          setUser(null);
          setIsAuthenticated(false);
          setNotifications([]);
          setUnreadCount(0);
      }
    };
    fetchUserAndNotifications();
  }, [token]);

  useEffect(() => {
    if (isAuthenticated && user?._id && process.env.REACT_APP_API_URL) {
        if(socketRef.current) socketRef.current.disconnect();

        socketRef.current = io(process.env.REACT_APP_API_URL);

        socketRef.current.on('connect', () => {
            console.log("Socket connected, joining user room:", user._id);
            socketRef.current?.emit('join_user_room', { userId: user._id });
        });
        
        socketRef.current.on('new_notification', (newNotification: Notification) => {
            setNotifications(prev => [newNotification, ...prev]);
            setUnreadCount(prev => prev + 1);
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }
  }, [isAuthenticated, user?._id]);


  const login = async (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };
  
  const register = async (email: string, password: string):Promise<any> => {
     const response = await api.post('/api/auth/register', {email, password});
     return response.data;
  }

  const logout = () => {
    socketRef.current?.disconnect();
    localStorage.removeItem('token');
    setToken(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const markNotificationAsRead = async (id: string) => {
      const notification = notifications.find(n => n._id === id);
      if(notification && !notification.read) {
          try {
              await api.put(`/api/notifications/${id}/read`);
              setNotifications(prev => prev.map(n => n._id === id ? {...n, read: true} : n));
              setUnreadCount(prev => prev - 1);
          } catch (error) {
              console.error("Failed to mark notification as read", error);
          }
      }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, register, updateUser, notifications, unreadCount, markNotificationAsRead }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};