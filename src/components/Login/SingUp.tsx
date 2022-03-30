import { useState, useContext } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider'

function SingUp() {
	const [input, setInput] = useState({ email: "", password: "" });
	const { isAuth, setIsAuth } = useContext(AuthContext);
	const navigate = useNavigate();

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
		console.log("email", input.email)
		const newUser = {
			email: input.email,
			password: input.password
		}

		try {
			const res = await axios.post('users/singup', newUser)
			setIsAuth(true);
			localStorage.setItem('auth', 'true')
			return navigate("/repositories")
		} catch (e) {
			console.log(e)
			return navigate("/")
		}
	}

	return (
		<div className='container'>
			<h2 style={{ marginTop: "100px" }}>SingUp page</h2>
			<form className='login-form'>
				<div className='form-group'>
					<input onChange={handleChange} name='email' className='form-control input' placeholder='email'></input>
				</div>
				<div className='form-group'>
					<input onChange={handleChange} name='password' className='form-control input' placeholder='password'></input>
				</div>
				<button onClick={handleSubmit} className='btn btn-lg btn-info input'>SingUp</button>
			</form>
		</div>
	);
}

export default SingUp;
