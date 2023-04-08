async function fetchData() {
	fetch('http://localhost:4280/.auth/me')
		.then((response) => response.json())
		.then((data) => {
			const { clientPrincipal } = data;
			console.log({ userId: clientPrincipal.userId });
			0;
		})
		.catch((error) => console.error(error));
}

console.log(fetchData());
