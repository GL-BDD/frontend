import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  email: string;
  role: string;
  username?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'https://cors-proxy.fringe.zone/https://backend-yijt.onrender.com/api/auth';

// Function to decode JWT token
const decodeToken = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize auth state from localStorage with safety checks
    const storedToken = localStorage.getItem('token');
    
    if (storedToken) {
      try {
        const decodedToken = decodeToken(storedToken);
        if (decodedToken) {
          setToken(storedToken);
          setUser({
            email: decodedToken.username, // Using username as email since that's what we have
            role: decodedToken.role,
            username: decodedToken.username
          });
        } else {
          // Invalid token, clear it
          localStorage.removeItem('token');
        }
      } catch (e) {
        console.error('Error parsing stored token:', e);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email: string, password: string, role: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const payload = {
        email: email.trim().toLowerCase(),
        password,
        role: role === 'artisan' ? 'artisan' : 'client',
      };

      console.log('Login request payload:', payload);

      const response = await axios.post(`${API_URL}/login`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Login response:', response.data);

      if (!response.data || !response.data.token) {
        throw new Error('No token received from server');
      }

      const newToken = response.data.token;
      const decodedToken = decodeToken(newToken);

      if (!decodedToken) {
        throw new Error('Invalid token received from server');
      }

      // Save token
      setToken(newToken);
      localStorage.setItem('token', newToken);

      // Create user object from decoded token
      const userData: User = {
        email: email, // Use the email from login
        role: decodedToken.role,
        username: decodedToken.username
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
    } catch (err: any) {
      console.error('Login error details:', {
        error: err,
        response: err.response?.data,
        status: err.response?.status,
      });

      let errorMessage = 'Login failed. ';

      if (err.response?.status === 401) {
        errorMessage = 'Invalid credentials. Please check your email and password.';
      } else if (err.response?.data?.message) {
        errorMessage += err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage += err.response.data.error;
      } else if (err.message) {
        errorMessage += err.message;
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
        error,
        isLoading,
      }}
    >
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
