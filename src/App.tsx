import '@/App.css';
import { BrowserRouter } from 'react-router';
import AppRoutes from '@/routes/AppRoutes.tsx';
import { ThemeProvider } from '@/contexts/ThemeContext/ThemeContext.tsx';

function App() {
    return (
        <>
            <ThemeProvider>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}
export default App;
