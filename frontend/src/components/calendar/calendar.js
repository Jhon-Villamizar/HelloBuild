import React, {useEffect, useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import momentTz from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.scss'
import Modal from 'react-bootstrap/Modal'

const localizer = momentLocalizer(moment);
var gapi = window.gapi;
gapi.load('client:auth2', () => {
  gapi.client.init({
    apiKey: 'AIzaSyAdJqME8opmLh5yQD6z5RtGm8ReBY4H1ws',
    clientId: '699451301641-24pjg3nu7hkd174lbs44p628750t7052.apps.googleusercontent.com',
    discoveryDocs:['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    scope: 'https://www.googleapis.com/auth/calendar',
  })
  gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));
})


const MyCalendar = () => {
  const[userLoggedIn, setUserLoggedIn] = useState(localStorage.getItem('user'));
  const[photoUrl, setphotoUrl] = useState('');
  const[title, setTitle] = useState('');
  const[start, setStart] = useState('');
  const[end, setEnd] = useState('');
  const[events, setEvents] = useState([]);
  const[modal, setModal] = useState(false);
  const[description, setDescription] = useState('');

  useEffect(() => {
    if(userLoggedIn){
      getData();
    }
  }, [userLoggedIn]);

  const handlerClick = () => {
    gapi.auth2.getAuthInstance().signIn()
      .then((res) => {
        let {access_token} = res.wc
        gapi.client.setToken({access_token});
        localStorage.setItem('user',JSON.stringify({access_token}));
        setUserLoggedIn(localStorage.getItem('user'));
      })
  }

  const getData = () => {
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
          tratada.push({
            'title': item.summary,
            'start': item.start.date || item.start.dateTime,
            'end': item.end.date || item.start.dateTime,
          })
        });
        setEvents(tratada);
      }
    })
  }

  const signOut = () => {
    gapi.auth2.getAuthInstance().signOut();
    localStorage.setItem('user', '');
    setUserLoggedIn(localStorage.getItem('user'));
  }

  const createEvent = (evt) => {
    evt.preventDefault();

    const newEvent = {
      'summary': title,
      'location': '800 Howard St., San Francisco, CA 94103',
      'description': description,
      'start': {
        'dateTime': moment(start).format(),
        'timeZone': momentTz.tz.guess()
      },
      'end': {
        'dateTime': moment(end).format(),
        'timeZone': momentTz.tz.guess()
      },
      'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=1'
      ],
      'attendees': [
        {'email': 'example@example.com'},
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 10}
        ]
      }
    };

    gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: newEvent,
    }).execute();

    setModal(false);
  }

  return(
    <div className="row">
      <div className="col-md-12">
        <h1 className="text-center">Calendar</h1>
        {
          !userLoggedIn? 
          <div className="content">
            <button onClick={handlerClick} className="btn btn-primary my-3">Sign In</button>
          </div> 
          : 
          <div className="content">
            <div>
              <button variant="primary" onClick={() => setModal(true)} className="btn btn-primary">
                New Event
              </button>
            </div>
            <a>
              <svg  onClick={signOut} t="1600446991379" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1931" width="200" height="200"><path d="M512 928.229c-211.616 0-384.211-172.595-384.211-384.211 0-121.567 56.031-233.628 153.584-306.668 28.516-21.512 68.538-16.009 89.549 12.507 21.512 28.016 15.509 68.538-12.507 89.549-65.036 49.027-102.556 123.568-102.556 204.612 0 141.077 115.063 256.141 256.141 256.141 141.077 0 256.141-115.063 256.141-256.141 0-81.044-37.521-155.585-102.557-204.612-28.015-21.012-34.019-61.534-12.507-89.549 21.012-28.516 61.534-34.019 89.55-12.507 97.553 73.04 153.584 185.102 153.584 306.668C896.211 755.634 723.616 928.229 512 928.229zM576.035 479.982c0 35.02-29.016 64.035-64.035 64.035-35.019 0-64.035-29.016-64.035-64.035L447.965 159.807c0-35.019 29.016-64.035 64.035-64.035 35.02 0 64.035 29.016 64.035 64.035L576.035 479.982z" p-id="1932" fill="#000000"></path></svg>
            </a>
          </div>
        }
        {
          !userLoggedIn?
          <h4 className="text-center">
            You need to log in to view your calendar
          </h4>
          :
          <div  style={{ height: '500pt'}}>
            <Calendar
              events={events}
              startAccessor="start"
              endAccessor="end"
              defaultDate={moment().toDate()}
              localizer={localizer}
            />
          </div>
        }
        
        <Modal show={modal} onHide={() => setModal(false)} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Create new event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form >
              <div className="form-group">
                <label htmlFor="name">Title</label>
                <input className="form-control" id="name" value={title} onChange={e => setTitle(e.target.value)} type="text"  placeholder="Enter event title"/>
              </div>
              <div className="form-group">
                <label htmlFor="name">Description</label>
                <input className="form-control" id="name" value={description} onChange={e => setDescription(e.target.value)} type="text"  placeholder="Enter a event description"/>
              </div>
              <div className="form-group">
                <label htmlFor="name">Start</label>
                <input className="form-control" id="name" value={start} onChange={e => setStart(e.target.value)} type="datetime-local" />
              </div>
              <div className="form-group">
                <label htmlFor="name">End</label>
                <input className="form-control" id="name" value={end} onChange={e => setEnd(e.target.value)} type="datetime-local" />
              </div>
              <button onClick={() => setModal(false)}>Close</button>
              <button onClick={createEvent}>Save Changes</button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  )
}

export default MyCalendar;