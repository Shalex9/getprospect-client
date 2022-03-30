import { useContext, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import './Login.css';


function Login() {
	const [input, setInput] = useState({ email: "", password: "" });
	const navigate = useNavigate();
	const { isAuth, setIsAuth } = useContext(AuthContext);

	function handleChange(event) {
		const { name, value } = event.target;
		setInput(inputValue => {
			return {
				...inputValue,
				[name]: value
			}
		})
	}

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			const res = await axios.post('users/login', {
				email: input.email,
				password: input.password
			})
				.then(response => {
					if (response?.data?._id) {
						setIsAuth(true);
						localStorage.setItem('auth', 'true')
						return navigate("/repositories")
					}
				})
		} catch (e) {
			return navigate("/")
		}
	}

	return (
		<div className='container'>
			<h2 style={{ marginTop: "100px" }}>Login for continue...</h2>
			<form className='login-form'>
				<div className='form-group'>
					<input onChange={handleChange} name='email' className='form-control input' placeholder='email'></input>
				</div>
				<div className='form-group'>
					<input onChange={handleChange} name='password' className='form-control input' placeholder='password'></input>
				</div>
				<button onClick={handleSubmit} className='btn btn-lg btn-info input'>Login</button>
			</form>

			<h3>Need an Account? <span><a href="/singup">Sing Up</a></span></h3>
		</div>
	);
}

export default Login;