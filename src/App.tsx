import '@/App.css';
import AppRoutes from '@/routes/AppRoutes.tsx';
import { ThemeProvider } from '@/contexts/ThemeContext/ThemeContext.tsx';
import { AuthenticationProvider } from '@/contexts/AuthenticationContext/AuthenticationContext.tsx';
function App() {
    return (
        <>
            <AuthenticationProvider>
                <ThemeProvider>
                    <AppRoutes />
                </ThemeProvider>
            </AuthenticationProvider>
        </>
    );
}
export default App;
