export const jsonError = (status: number, body: any) =>
	new Response(JSON.stringify(body), {
		status: status,
		headers: {
			'Content-Type': 'application/json'
		}
	});
