import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {UserContext} from '../UserContext'

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext)
  const [error, setError] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'post',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        response.json()
        .then(userInfo =>{
          setRedirect(true);
        })
        
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(true);
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form className="login">
      <h1>Login Page</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      {error && <div>Invalid username or password</div>}
    </form>
  );
}