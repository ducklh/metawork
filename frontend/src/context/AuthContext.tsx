import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthState, User } from '../types/auth';
import { authAPI } from '../services/api';

// Auth actions
type AuthAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
    | { type: 'LOGOUT' }
    | { type: 'SET_USER'; payload: User };

// Initial state
const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
};

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        default:
            return state;
    }
};

// Context type
interface AuthContextType {
    state: AuthState;
    login: (user: User, token: string) => void;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Login function
    const login = (user: User, token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
    };

    // Check authentication status
    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch({ type: 'SET_LOADING', payload: false });
                return;
            }

            const response = await authAPI.getCurrentUser();
            dispatch({ type: 'SET_USER', payload: response.user });
        } catch (error) {
            console.error('Auth check failed:', error);
            logout();
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    // Check auth on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const value: AuthContextType = {
        state,
        login,
        logout,
        checkAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};