export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    isVerified?: boolean;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    user: User;
}