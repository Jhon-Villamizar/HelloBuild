import React, { useState, useEffect } from 'react';

const Github = () => {

  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState(null);
  const [listRepos, setListRepos] = useState([]);

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
              .then(y => {
                setData2(y);
              });
            }
          })
    }, []);

  const setData = ({ login, avatar_url }) => {
    setUserName(login);
    setAvatar(avatar_url);
  };

  const setData2 = (y) => {
    setListRepos(y);
  };

  const items = listRepos.map((repo) =>
    <li className="list-group-item" key={repo.full_name}>{repo.name}</li>
  );
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
                <p className="text-center"><b><u>Repositories</u></b></p>
                <ul class="list-group">
                  {items}
                </ul>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Github;