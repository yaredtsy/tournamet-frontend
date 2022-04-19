import React from 'react';

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  OtpPage
} from 'page';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/otp-confirm' element={<OtpPage/>} />
        <Route path='/' element={<HomePage/>} />
        
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
