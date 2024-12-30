import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import LoginContextProvider from './context/LoginContextProvider.jsx'



createRoot(document.getElementById('root')).render(
    <LoginContextProvider>
        <App/>
    </LoginContextProvider>
)
