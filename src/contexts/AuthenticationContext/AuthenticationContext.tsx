import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    useMemo,
    ReactNode,
} from 'react';
// import {v4 as uuidv4} from 'uuid';
import { jwtDecode } from 'jwt-decode';

import { AuthContextType } from '@/entities/AutheticationDataType.tsx'; // Adjust the import path

interface AuthenticationProviderPros {
    children: ReactNode;
}

const AuthenticationContext = createContext<AuthContextType | undefined>(
    undefined
);
export const AuthenticationProvider = ({
    children,
}: AuthenticationProviderPros) => {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('token');
    });
    const [ifLongSession, setIfLongSession] = useState<boolean>();

    // useEffect(() => {
    //   if (token) {

    //     // // Optional: fetch user profile or decode JWT here
    //     // fetch("/api/profile", {
    //     //   headers: { Authorization: `Bearer ${token}` },
    //     // })
    //     //   .then((res) => res.json())
    //     //   .then((data) => setUser(data))
    //     //   .catch(() => logout());
    //     console.log("fetching data, useeffect")

    //   }
    // }, [token]);

    useEffect(() => {
        if (ifLongSession) {
            if (!token) return;

            let expirationTime = 0;
            const decodedToken = jwtDecode(token);
            // console.log(decodedToken);
            if (decodedToken.exp) {
                expirationTime = decodedToken.exp * 1000 - Date.now(); // ms
            }
            const timeout = setTimeout(() => {
                logout();
            }, expirationTime);

            return () => clearTimeout(timeout); // cleanup
        } else {
            let expirationTime = 0;
            expirationTime = 300000;
            const timeout = setTimeout(() => {
                logout();
            }, expirationTime);

            return () => clearTimeout(timeout); // cleanup
        }
    }, [token, ifLongSession]);

    // 🔁 Listen for token removal in other tabs
    useEffect(() => {
        const handleStorage = (event: StorageEvent) => {
            if (event.key === 'token' && !event.newValue) {
                logout();
            }
        };

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const login = async (sessionType: 'long' | 'short') => {
        // const myuuid = uuidv4();

        // const res = await fetch("/api/login", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ uuid: myuuid }),
        // });

        // if (!res.ok) throw new Error("Login failed");

        // const res = await fetch('http://localhost:5174/api/users/sign-in', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     credentials: 'include', // important if you're setting cookies
        //     body: JSON.stringify({ uuid: '123' }),
        // });

        // const data = await res.json();
        // console.log(data);

        // const data = await res.json();
        if (sessionType === 'long') {
            setIfLongSession(true);

            const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJidXJ0byIsImlhdCI6MTc0Nzg3OTI0MCwiZXhwIjoxNzc5NDE1MzQzLCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiR2l2ZW5OYW1lIjoiSm9obm55IiwiU3VybmFtZSI6IlJvY2tldCIsIkVtYWlsIjoianJvY2tldEBleGFtcGxlLmNvbSIsIlJvbGUiOlsiTWFuYWdlciIsIlByb2plY3QgQWRtaW5pc3RyYXRvciJdfQ.Yjy-PT7-yHHs0sbzzXEoi1VyZxGFYucTlS8-hK9vCr8`;
            setToken(token);
            localStorage.setItem('token', token);
        }
        if (sessionType === 'short') {
            setIfLongSession(false);
            const token = '123';
            setToken(token);
            localStorage.setItem('token', token);
        }
    };

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
    }, []);

    const contextValue = useMemo(
        () => ({
            token,
            ifLongSession,
            login,
            logout,
        }),
        [token, login, logout]
    );

    return (
        <AuthenticationContext.Provider value={contextValue}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export function useAuthenticationContext() {
    const context = useContext(AuthenticationContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
}
