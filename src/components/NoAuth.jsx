function NoAuthPage() {
	return (
		<div className='container'>
			<h1 style={{ marginTop: "100px" }}>You are not registered. Please <a href="/login">LogIn</a></h1>
		</div>
	);
}

export default NoAuthPage;