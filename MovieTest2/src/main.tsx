import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import EditMovie from './pages/EditMovie.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/editmovie" 
                  element={<EditMovie />} />
          <Route path="/editmovie/:id" 
                  element={<EditMovie />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
