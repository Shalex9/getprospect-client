import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Moment from 'moment';


function TableSheet() {
	const [data, setData] = useState([{
		_id: 1234,
		owner: "shalex9",
		projectname: "krasotka",
		projecturl: "https://github.com/Shalex9/krasotka",
		stars: 1,
		forks: 1,
		issues: 1,
		created: "2016-01-04 10:34:23"
	}]);

	function openRepo() { }
	function editRepo() { }
	function deleteRepo() { }

	// const getData = () => {
	// }

	// useEffect(() => {
	// 	getData();
	// }, [])

	return (
		<div>
			<br />
			<p>Info about repositories:</p>

			{data.length > 0 ?
				(<Table striped bordered hover>
					<thead>
						<tr>
							<th>Owner</th>
							<th>Project Name</th>
							<th>Project Url</th>
							<th>Stars</th>
							<th>Forks</th>
							<th>Issues</th>
							<th>Created</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item) => (
							<tr key={item._id}>
								<td>{item.owner}</td>
								<td>{item.projectname}</td>
								<td>{item.projecturl}</td>
								<td>{item.stars}</td>
								<td>{item.forks}</td>
								<td>{item.issues}</td>
								<td>{Moment(item.created).format('d MMM yyyy')}</td>
								<td>
									<Button onClick={openRepo} size='sm' variant='primary'>Show</Button>
									<Button onClick={editRepo} size='sm' variant='warning'>Edit</Button>
									<Button onClick={deleteRepo} size='sm' variant='danger'>Delete</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>) : (
					<p>No data...</p>
				)}
		</div>
	);
}

export default TableSheet;