import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import mermaid from 'mermaid'

// Initialize mermaid with global configuration
mermaid.initialize({
  startOnLoad: true,
  theme: 'neutral',
  securityLevel: 'loose',
  fontFamily: 'Helvetica, Arial, sans-serif',
  themeVariables: {
    'background': 'transparent',
    'primaryTextColor': '#275E91',
    'primaryBorderColor': '#275E91',
    'edgeLabelBackground': 'transparent',
    'tertiaryColor': 'transparent'
  }
});

createRoot(document.getElementById("root")!).render(<App />);
