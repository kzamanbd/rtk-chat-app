import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'simplebar-react/dist/simplebar.min.css';
import App from './App';
import { store } from './app/store';
import { RoomProvider } from './contexts/RoomContext';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<RoomProvider>
			<App />
		</RoomProvider>
	</Provider>
);
