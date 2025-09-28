import './App.css'
import { BrowserRouter, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import MainRouter from './routers/mainRouter'
import Footer from './components/Footer'

import Notifications from './components/Notifications'
import { useEffect } from 'react'

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Executa toda vez que o caminho da URL mudar

  return null; // Este componente não renderiza nada na tela
};



function App() {
  return (
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
  )
}

export default App
