import React, { useState } from 'react';
import './App.scss';
import Dashboard from './components/dashboard/dashboard';
import Signin from './components/singIn/signIn';
import Signup from './components/singUp/signUp';

function App() {

  let view;
  const [login, setLogin] = useState(false);
  const [dashboard, setDashboard] = useState(true);
  
  const loginHandler = () => {
    setLogin(!login);
  }

  const goDashboard = () => {
    setLogin(false);
    setDashboard(true);
    
  }

  const returnLogin = () => {
    setDashboard(false);
    setLogin(true);
  }

  if (dashboard === true) {
    view = <Dashboard returnLogin={returnLogin}></Dashboard>
  } else {
    if (login === true) {
      view = <Signin loginHandler={loginHandler} goDashboard={goDashboard}></Signin>
    } else {
      view = <Signup loginHandler={loginHandler}></Signup>
    }
  }

  return (
    <div>
      {view}
    </div>
  );
}

export default App;
