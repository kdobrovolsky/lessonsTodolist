import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app/App'
import { store } from './app/store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
<Provider store={store}>
<App />
</Provider>
)
