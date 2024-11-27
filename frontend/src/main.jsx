import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/authContext.jsx'
import { UserProvider } from './contexts/userContext.jsx'
import { LoadingProvider } from './contexts/loadingContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>
    </LoadingProvider>
  </StrictMode>,
)
