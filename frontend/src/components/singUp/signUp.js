import React, {useEffect, useState} from "react";
// import "./signup.scss";


export default function SignUp(props) {

  const {loginHandler} = props;
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    console.log(data)
  },[data])

  const handlerSubmit = (evt) => {
    evt.preventDefault();
    let localData = JSON.parse(localStorage.getItem('data'));
    if (!localData) {
      localData = []
    }
    localData = [...localData, data];
    localStorage.setItem('data', JSON.stringify(localData));
    loginHandler();
  }
  

    return(
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
          <h1>Sign Up</h1>
            <form onSubmit={handlerSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input className="form-control" id="name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Name"/>
              </div>
              <div className="form-group">
                <label htmlFor="lastName">lastName</label>
                <input className="form-control" id="lastName" type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Enter Last Name"/>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className="form-control" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email"/>
              </div>
              <div>
              <label htmlFor="password">Password</label>
                <input className="form-control" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
              </div>
              <button className="btn btn-primary" onClick={e => setData({name: name,lastName: lastName,email: email,password: password})}>Register</button>
            </form>
            <a onClick={loginHandler}><p>Already have account? Sign In</p></a>
          </div>
        </div>
        
      </div>
    );
}