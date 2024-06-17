import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiURL } from '../../apiURL';
import { useUserContext } from '../../userContext';
import './Signup.Style.css';
import { Button } from '../../components/Button/Button.component';

export const Signup = () => {
  const { user, loading, registerWithEmailAndPassword } = useUserContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const addUserToDb = useCallback(async (userCreated) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userCreated.email,
        uid: userCreated?.uid,
      }),
    };
    await fetch(`${apiURL()}/users`, requestOptions);
  }, []);
  const register = () => {
    /* if (!name) alert('Please enter name'); add error handling */
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) {
      addUserToDb(user);
      navigate('/');
    }
  }, [user, name, loading, addUserToDb, navigate]);
  return (
    <div className="form-container signup-container">
      <div className="form-box signup-box">
        <h1>Create your free account</h1>
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button
          primary
          onClick={register}
          backgroundColor="#000"
          label="Sign up"
        />

        <div className="form-additional-text">
          Already have an account?{' '}
          <Link className="form-additional-link" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
