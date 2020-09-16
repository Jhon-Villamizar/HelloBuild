import React, { useState } from 'react';
import Calendar from '../calendar/calendar';
import Github from '../github/github';
import Nav from '../nav/nav';
import Home from '../home/home';

const Dashboard = () => {

  let view;
  const [home, setHome] = useState(true);
  const [github, setGithub] = useState(false);
  const [calendar, setCalendar] = useState(false);

  const goGithub = () => {
    setCalendar(false);
    setHome(false);
    setGithub(true);
  }

  const goCalendar = () => {
    setGithub(false);
    setHome(false);
    setCalendar(true);
  }

  const goHome = () => {
    setCalendar(false);
    setGithub(false);
    setHome(true);
  }

  if (home === true) {
    view = <Home />
  } else if (github === true) {
    view = <Github />
  } else if (calendar === true) {
    view = <Calendar />
  }

  return(
    <div>
      <Nav goHome={goHome} goCalendar={goCalendar} goGithub={goGithub}/>
      <div className="container">
        {view}
      </div>
    </div>
  )
}

export default Dashboard;