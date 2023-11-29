import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <div className='App'>
     <ToastContainer theme="colored"></ToastContainer>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      </div>
      );
}

      export default App;
