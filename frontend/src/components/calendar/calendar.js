import React, {useEffect, useState} from 'react';
import firebase from '../../config/firebase';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);
const hoursFromNow = (n) => new Date(Date.now()+n*1000*60*60).toISOString();

const MyCalendar = () => {

  const[userLoggedIn, setUserLoggedIn] = useState(false);
  const[photoUrl, setphotoUrl] = useState('');
  const[events, setEvents] = useState([]);

  useEffect(() => {
    console.log(events);
  }, [events]);

  var gapi = window.gapi;
  
  const handlerClick = () => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: 'AIzaSyAdJqME8opmLh5yQD6z5RtGm8ReBY4H1ws',
        clientId: '699451301641-24pjg3nu7hkd174lbs44p628750t7052.apps.googleusercontent.com',
        discoveryDocs:['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar',
      })
  
      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));
      gapi.auth2.getAuthInstance().signIn()
        .then((res) => {
          console.log(res);
          setUserLoggedIn(true);
          setphotoUrl(res.tt.jK);
          gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
          })
            .then(res => {
              if (res.result.items === []) {
                setEvents([''])
              } else {
                let tratada = [];
                res.result.items.map(item => {
                  console.log(item);
                  tratada.push({
                    'title': item.summary,
                    'start': item.start.date || item.start.dateTime,
                    'end': item.end.date || item.start.dateTime,
                  })
                });
                setEvents(tratada);
              }
              console.log('Events => ', events);
            })
        })
    })
  }


  const signOut = () => {
    firebase.auth().signOut().then(console.log)
    setUserLoggedIn(false);
    setphotoUrl('');
  }

  return(
    <div className="row">
      <div className="col-md-12" style={{ height: '500pt'}}>
        <h1 className="text-center">Calendar</h1>
        {
          !userLoggedIn? <button onClick={handlerClick}>sign-in</button> : <div><img src={photoUrl}/><button onClick={signOut}>sign-out</button></div>
        }
        {/* <button onClick={signIn}>sign-in</button>
        <button onClick={signOut}>sign-out</button> */}
        <Calendar
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment().toDate()}
        localizer={localizer}
        />
      </div>
    </div>
  )
}

export default MyCalendar;