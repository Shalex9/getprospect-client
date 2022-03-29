import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import TableSheet from './TableSheet.tsx';
import { AuthContext } from '../../context/AuthProvider'

function Repository() {
	const [search, setSearch] = useState<string>('');
	const { isAuth, setIsAuth } = useContext(AuthContext);
	const api = axios.create({
		baseURL: `https://api.github.com/repos/`
	})

	useEffect(() => {
		fetch("/api/repositories").then(res => {
			if (res.ok) {
				console.log(res)
				return res.json()
			}
		})
	}, [])

	const submit = () => {
		let data = api.get(search).then(({ data }) => {
			console.log(data)
		})
	}

	return (
		<div className='container'>
			<header >
				<br />
				<p>For add repositories, please paste link to GitHub as <code>owner/repo</code> and submit the form</p>
				<input type="text" value={search} placeholder='only owner/repo' onChange={(e) => setSearch(e.target.value)} />

				<button onClick={submit} >Добавить репозиторий</button>

				<TableSheet />
			</header>
		</div>
	);
}

export default Repository;
