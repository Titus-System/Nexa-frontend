import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import MainRouter from './routers/mainRouter'
import Footer from './components/Footer'

import Notifications from './components/Notifications'

function App() {
  return (
    <BrowserRouter>
  {/* <Toaster position="bottom-right" reverseOrder={false} /> */}
  <Notifications />
      <Navbar></Navbar>
      <main className="main-container bg-background text-text">
        <MainRouter />
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
