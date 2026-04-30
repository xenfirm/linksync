console.log('Main.tsx is running');

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ErrorBoundary } from './components/ErrorBoundary'

const container = document.getElementById('root');
if (!container) {
  console.error('Root container not found');
} else {
  console.log('Root container found, rendering...');
  createRoot(container).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  )
}
