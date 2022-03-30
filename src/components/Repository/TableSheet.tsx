import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Moment from 'moment';

function TableSheet(props) {
	const [data, setData] = useState([]);
	const [editId, setEditId] = useState("");
	const [owner, setOwner] = useState("");
	const [projectname, setProjectname] = useState("");
	const [projecturl, setProjecturl] = useState("");
	const [stars, setStars] = useState(0);
	const [forks, setForks] = useState(0);
	const [issues, setIssues] = useState(0);
	const [created, setCreated] = useState("");
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	useEffect(() => { setData(props.data.data) }, [props])
	useEffect(() => { changeEditObj() }, [editId])

	function changeEditObj() {
		let obj = data?.find(e => e._id === editId);
		setOwner(obj?.owner);
		setProjectname(obj?.projectname);
		setProjecturl(obj?.projecturl);
		setStars(obj?.stars);
		setForks(obj?.forks);
		setIssues(obj?.issues);
		setCreated(obj?.created);
	}

	return (
		<div>
			<br />
			<h3>Table saved repositories:</h3>

			{data && data.length > 0 ?
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
								<td>{Moment(item.created).format('DD.MM.YYYY')}</td>
								<td>
									<Button onClick={() => { setEditId(item._id); setShow(true); }}
										className="button-margin"
										size='sm'
										variant='warning'>
										Edit
									</Button>
									<Button onClick={() => props.onClick("delete", { _id: item._id })}
										className="button-margin"
										size='sm'
										variant='danger'>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>

					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Edit repository data</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<form className='login-form'>
								<div className='form-group'>
									<input onChange={(e) => { setOwner(e.target.value) }} name='owner' defaultValue={owner} className='form-control input' placeholder='owner'></input>
								</div>
								<div className='form-group'>
									<input onChange={(e) => { setProjectname(e.target.value) }} name='projectname' defaultValue={projectname} className='form-control input' placeholder='projectname'></input>
								</div>
								<div className='form-group'>
									<input onChange={(e) => { setProjecturl(e.target.value) }} name='projecturl' defaultValue={projecturl} className='form-control input' placeholder='projecturl'></input>
								</div>
								<div className='form-group'>
									<input onChange={(e) => { setStars(Number(e.target.value)) }} name='stars' defaultValue={stars} className='form-control input' placeholder='stars'></input>
								</div>
								<div className='form-group'>
									<input onChange={(e) => { setForks(Number(e.target.value)) }} name='forks' defaultValue={forks} className='form-control input' placeholder='forks'></input>
								</div>
								<div className='form-group'>
									<input onChange={(e) => { setIssues(Number(e.target.value)) }} name='issues' defaultValue={issues} className='form-control input' placeholder='issues'></input>
								</div>
								<div className='form-group'>
									<input onChange={(e) => { setCreated(e.target.value) }} name='created' defaultValue={Moment(created).format('d MMM yyyy')} className='form-control input' placeholder='created'></input>
								</div>
							</form>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button variant="primary" onClick={() => {
								handleClose();
								props.onClick("edit", {
									_id: editId,
									owner: owner,
									projectname: projectname,
									projecturl: projecturl,
									stars: stars,
									forks: forks,
									issues: issues,
									created: created
								})
							}}>
								Save Changes
							</Button>
						</Modal.Footer>
					</Modal>
				</Table>) : (
					<p>No data...</p>
				)}
		</div>
	);
}

export default TableSheet;