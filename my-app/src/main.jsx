import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from '../context/AuthContext.jsx';
import { ChatProvider } from '../context/ChatContext.jsx'; // Import ChatProvider

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <ChatProvider> {/* Add ChatProvider here */}
          <App />
        </ChatProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
)