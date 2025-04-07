
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from 'react-router';
const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<BrowserRouter>
  <App />
  </BrowserRouter>
  );
} else {
  console.error("Failed to find the root element.");
}