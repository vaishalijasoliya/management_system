import '../styles/globals.css'
import configureStore from '../store/configureStore';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const store = configureStore()
  store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
  })
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  )
}

export default MyApp
