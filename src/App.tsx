import './App.css'
import { BrowserRouter, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import MainRouter from './routers/mainRouter'
import Footer from './components/Footer'

import Notifications from './components/Notifications'
import { NotificationsProvider } from "./context/NotificationContext";
import { WebSocketProvider } from './context/WebSocketProvider'
import { useEffect } from 'react'
import { useTheme } from './context/ThemeContext'

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Executa toda vez que o caminho da URL mudar

  return null; // Este componente não renderiza nada na tela
};

function App() {
  const { darkMode } = useTheme();
  return (
    <div className={`${darkMode ? "bg-[#010A26]" : "bg-[#F2F0E9]"}`}>
      <NotificationsProvider>
        <WebSocketProvider>
          <BrowserRouter>
            <ScrollToTop />
            {/* <Toaster position="bottom-right" reverseOrder={false} /> */}
            <Notifications />
            <Navbar></Navbar>
            <main className="main-container text-text ">
              <MainRouter />
            </main>
            <Footer />
          </BrowserRouter>
        </WebSocketProvider>
      </NotificationsProvider>
    </div>

  )
}

export default App;
