import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase';
import {Tabs, Tab} from 'react-bootstrap'
import './github.scss';

const Github = () => {

  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState(null);
  const [listRepos, setListRepos] = useState([]);

  const singIn = () => {
    var provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    provider.setCustomParameters({
      'allow_signup': 'false'
    });
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        let token = res.credential.accessToken;
        let user = res.user;
        console.log(res);
      })
      .catch(error => {
        console.log('ERROR => ', error);
      })
  }

  const singOut = () => {
    firebase.auth().signOut()
      .then(() => console.log('out'))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetch(`https://api.github.com/search/users?q=${localStorage.email}`)
      .then(res => res.json())
      .then(data => {
          if (data.total_count == 0) {
            setError("Don't exist a GitHub account with this email");
          } else {
            setData(data.items[0]);
            setError(null);
            fetch(data.items[0].repos_url)
              .then(res => res.json())
              .then(obj => {
                setData2(obj);
              });
            }
          })
    }, []);

  useEffect(() => {    
  }, [listRepos])

  const handlerFavs = (repo) => {
    let data = listRepos.map(item => {
      if (item.id === repo.id) {
        item.favorite = true;
        return item;
      } else {
        return item;
      }
    });
    setListRepos(data);
  }

  const setData = ({ login, avatar_url }) => {
    setUserName(login);
    setAvatar(avatar_url);
  };

  const setData2 = (obj) => {
    let data = [...obj, obj.favorite = false];
    setListRepos(data);
  };


  return(
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h1 className="text-center">GitHub</h1>
        {
          error ? (<h1>{error}</h1>) : (
            <div className="card">
              <div className="content-img">
                <img src={avatar} alt=""/>
              </div>
              <div className="card-body">
                <p className="text-center"><b><u>User</u></b></p>
                <h3 className="card-title text-center">{userName}</h3>
                <hr/>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                  <Tab eventKey="repositories" title="All Repositories">
                  <ul className="list-group">
                    {
                      listRepos.map((repo) =>
                        !repo.favorite? <li className="list-group-item repoList" key={repo.full_name} onClick={() => handlerFavs(repo)}>{repo.name}</li> : ''
                      )
                    }
                  </ul>
                  </Tab>
                  <Tab eventKey="favorites" title="Favorites">
                    <ul className="list-group">
                      {
                        listRepos.map((repo) =>
                          repo.favorite? <li className="list-group-item" key={repo.full_name} >{repo.name}</li> : ''
                        )
                      }
                    </ul>
                  </Tab>
                </Tabs>
                
              </div>
            </div>
          )
        }
        
      </div>
    </div>
  )
}

export default Github;