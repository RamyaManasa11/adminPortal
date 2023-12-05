import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import Home from './screens/Home';
import Campaign from './screens/Campaign';
import Reward from './screens/Reward';
import CreateCampaign from './screens/CreateCampaign';

function App() {
  return (
    <div className='App'>
     <ToastContainer theme="colored"></ToastContainer>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/campaign' element={<Campaign />} />
        <Route path='/reward' element={<Reward />} />
        <Route path='/create-campaign' element={<CreateCampaign/>} />
      </Routes>
      </div>
      );
}

      export default App;
