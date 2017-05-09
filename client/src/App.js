import React from 'react';

const API = 'http://localhost:8080'

function login(username, password, onSuccess) {
  fetch(API +'/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  }).then(
    res => res.json().then(({ token: authToken }) => onSuccess(authToken))
  )
}

function ping(authToken, callback) {
  fetch(API, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
  })
  .then(
    res => callback(res.status === 200)
  )
}


class LoginForm extends React.Component {

  state = {
    username: '',
    password: '',
  }

  render(){
    const { onSuccess } = this.props;
    const { username, password } = this.state; 
    return(
      <div>
        <form>
          <div>
            <input type="text" value={username} onChange={e => this.setState({ username: e.target.value })} />
          </div>
          <div>
            <input type="password" value={password} onChange={e => this.setState({ password: e.target.value })} />
          </div>
          <div>
            <button 
              onClick={e => e.preventDefault() || login(username, password, onSuccess)}
              disabled={!username || !password}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }
}

function WelcomeScreen({ authToken, onFailure }) {
  return(
    <div>
      <h1>Welcome</h1>
      <p>Your token is {authToken}</p>
      <button onClick={() => ping(authToken, p => !p && onFailure())}>Ping!</button>
    </div>
  )  
}

class App extends React.Component {

  state = {
    authToken: null,
  }

  render() {
    const { authToken } = this.state; 
    return (
      <div>
        { authToken 
          ?
          <WelcomeScreen authToken={authToken} onFailure={() => this.setState({authToken: null})} />
          :
          <LoginForm onSuccess={(authToken) => this.setState({authToken})} />
        }
      </div>
    );
  }
}

export default App;
