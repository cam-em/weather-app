import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Layout from './components/common/Layout'

function App() {
  return (
    <div className="App">
      <Layout>
      <Home  />
      </Layout>
    </div>
  );
}

export default App;
