import { useState, useEffect } from 'react';
import axios from './../../api/axios';
import TableSheet from './TableSheet.tsx';
import './Repository.css'

function Repository() {
	const [search, setSearch] = useState('');
	const [idForDelete, setIdForDelete] = useState('');
	const [data, setData] = useState({});

	useEffect(() => { getData() }, [])

	async function getData() {
		try {
			await axios.get('repositories').then(response => {
				setData(response)
			})
		} catch (e) {
			console.log("oops. something went wront. ", e)
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			await axios.post('repositories', {
				search: search
			}).then(response => {
				getData();
			})
		} catch (e) {
			console.log("error: ", e)
		}
	}

	async function emitClick(type, obj) {
		if (type === "delete") {
			try {
				await axios.delete('repositories', { data: { id: obj._id } })
					.then(response => {
						getData();
					})
			} catch (e) {
				console.log("error: ", e)
			}
		} else if (type === "edit") {
			try {
				axios.put(`repositories/${obj._id}`, {
					owner: obj.owner,
					projectname: obj.projectname,
					projecturl: obj.projecturl,
					stars: obj.stars,
					forks: obj.forks,
					issues: obj.issues,
					created: obj.created
				}).then(response => {
					getData();
				})
			} catch (e) {
				console.log("error: ", e)
			}
		}
	}

	return (
		<div className='container'>
			<header >
				<br />
				<h3>For add repositories, please paste link to GitHub as <code>owner/repo</code> and submit the form</h3>

				<form className='repository-form'>
					<div className='form-group'>
						<input type="text"
							value={search}
							placeholder='only owner/repo'
							onChange={(e) => setSearch(e.target.value)}
							className='form-control input' />
					</div>
					<button onClick={handleSubmit} className='btn btn-lg btn-info input'>Add repository</button>
				</form>

				<TableSheet data={data} onClick={(type, id) => emitClick(type, id)} />
			</header>
		</div>
	);
}

export default Repository;