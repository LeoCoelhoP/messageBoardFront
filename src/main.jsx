import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/styles.css';
import './assets/css/messageBoard/messageBoard.css';
import './assets/css/messageBoard/messageForm.css';
import './assets/css/messageBoard/usersMessage.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<StrictMode>
		<Router>
			<App />
		</Router>
	</StrictMode>,
);
