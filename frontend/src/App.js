import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Layout from './components/common/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Layout>
        <ToastContainer />
        <Home  />
      </Layout>
    </div>
  );
}

export default App;
