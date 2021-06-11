import React, { useState } from 'react';
import { Redirect } from 'react-router';
import './Signin.css'
import logo from './src/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from "@fortawesome/free-solid-svg-icons";

import axios from 'axios';

function SignIn() {
	const [user, setUser] = useState('');

	const submit = async (event) => {
		event.preventDefault();
		const userJson = JSON.stringify(user);
		await axios
			.post('https://bazaar-server.herokuapp.com/api/users/login', userJson, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => res.data)
			.then((data) => {
				if (data.msg) {
					// use this to create a flash message
					console.log(data.msg);
				} else {
					// use the below to implement sesions
					console.log(data);
				}
			});

      <Redirect to="/" />
	};

	return (
		<div className="Signin">
			
			<div className="form-space">
				<div className="home-icon">
					<a href="/"><FontAwesomeIcon icon={faHome} /></a>
				</div>
				<form onSubmit={submit}>
					<header>
						<h1>Welcome</h1>
						<h2>Sign In</h2>
					</header>
					<span>
						<input
							type='email'
							placeholder='Email'
							onChange={(e) => setUser({ ...user, email: e.target.value })}
						/>
					</span>
					<span>
						<input
							type='password'
							placeholder='Password'
							onChange={(e) => setUser({ ...user, password: e.target.value })}
						/>
					</span>
					<a href="/"><p>Forgotten password?</p></a>
					<span>
						<button type='submit'>Sign In</button>
					</span>
				</form>
			</div>			
			<div className="logo">
        <img src={logo}></img>
      </div>
		</div>
	);
}

export default SignIn;
