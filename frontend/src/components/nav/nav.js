import React from 'react';

const Nav = (props) => {
  const { goHome, goCalendar, goGithub } = props

  return(
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="navbar-brand" onClick={goHome}>HelloBuid <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={goGithub}>GitHub</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={goCalendar}>Calendar</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav;