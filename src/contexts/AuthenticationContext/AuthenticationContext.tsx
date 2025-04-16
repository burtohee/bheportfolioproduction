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

        // const data = await res.json();
        if (sessionType === 'long') {
            setIfLongSession(true);

            const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3NDQ2NjU5MDQsImV4cCI6MTc3NjIwMTkwNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.2eoTts7vmGhqvZunOr2-9hYsJFmmiTOYrIx1Wil-T8c`;
            setToken(token);
            localStorage.setItem('token', token);
        }
        if (sessionType === 'short') {
            setIfLongSession(false);
            const token = '123';
            setToken(token);
            localStorage.setItem('token', token);
        }
        // setUser(data.user); // Or fetch user profile separately
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
