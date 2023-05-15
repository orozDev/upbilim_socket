import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {socket, SocketServerProvider} from "./context/SocketServerProvider.js";

ReactDOM.createRoot(document.getElementById('root')).render(
    <SocketServerProvider value={socket}>
        <App />
    </SocketServerProvider>
)
