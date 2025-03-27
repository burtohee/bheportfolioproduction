import "@/App.css";
import { BrowserRouter } from "react-router";
import AppRoutes from "@/routes/AppRoutes";
import { ThemeProvider } from "@/contexts/ThemeContext/ThemeContext.jsx";

function App() {
  return (
    <>
    <ThemeProvider> <BrowserRouter>
          <AppRoutes />
        </BrowserRouter></ThemeProvider>
    </>
  );
}
export default App;
