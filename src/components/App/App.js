import logo from '../../logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Login from './../Login/Login.tsx';
import Main from './../Main/Main.tsx';
import SingUp from './../Login/SingUp.tsx';
import Repository from './../Repository/Repository.tsx';
import { AuthContext } from './../../context/AuthProvider';
import NoAuthPage from './../NoAuth';

function App() {
	const [isAuth, setIsAuth] = useState(false);
	useEffect(() => {
		if (localStorage.getItem('auth')) {
			setIsAuth(true)
		}
	}, [])

	function logout() {
		setIsAuth(false);
		localStorage.removeItem('auth')
	}

	return (
		<div className="App">
			<AuthContext.Provider value={{
				isAuth,
				setIsAuth
			}}>
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>Full-stack developer test</p>
					{isAuth ?
						<a href="/" onClick={logout} className='btn btn-lg btn-info'>LogOut</a>
						:
						<a href="/login" className='btn btn-lg btn-info'>LogIn</a>}
				</header>

				<Router>
					<Routes>
						<Route exact path="/" element={<Main />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/singup" element={<SingUp />} />
						<Route exact path="/repositories" element={
							isAuth ?
								<Repository />
								: <NoAuthPage />
						} />
					</Routes>
				</Router>
			</AuthContext.Provider>
		</div >
	);
}

export default App;
