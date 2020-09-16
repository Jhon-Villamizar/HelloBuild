import React, {useState} from "react";


const SignIn = (props) => {

  const {goDashboard, loginHandler} = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlerSubmit = (evt) => {
    evt.preventDefault();
    let data = JSON.parse(localStorage.getItem('data'));
    let pass = data.filter(item => item.email === email && item.password === password)[0];
    if (pass) {
      goDashboard();
    }else{
        alert('Datos no registrados')
    }
  }

    return(
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1>Sign In</h1>
            <form onSubmit={handlerSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className="form-control" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email"/>
              </div>
              <div>
              <label htmlFor="password">Password</label>
                <input className="form-control" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
              </div>
              <button className="btn btn-primary">Sign In</button>
            </form>
            <a onClick={loginHandler}><p>Don't have an account? SignUp</p></a>
          </div>
        </div>
      </div>
    
    );
}

export default SignIn;