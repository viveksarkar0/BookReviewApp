import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastProvider } from '@radix-ui/react-toast'
import { Toaster } from './components/ui/toaster.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
    <App />
    <Toaster/>
    </ToastProvider>
   

  </StrictMode>,
)
