import React from 'react';
import ApiCalendar from 'react-google-calendar-api';
import firebase from '../../config/firebase';

const Calendar = () => {

  const signIn = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/calendar.readonly');
    firebase.auth().signInWithPopup(provider)
      .then(res => console.log(res))
  }
  const signOut = () => {
    ApiCalendar.handleSignoutClick();
  }

  return(
    <div className="row">
      <div className="col-md-12">
        <h1 className="text-center">Calendar</h1>
        <button onClick={signIn}>sign-in</button>
        <button onClick={signOut}>sign-out</button>
      </div>
    </div>
  )
}

export default Calendar;