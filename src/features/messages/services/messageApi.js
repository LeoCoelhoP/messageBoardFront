async function apiGetMessages() {
	const response = await fetch(
		'http://localhost:3000/api/messages/getAllMessages',
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

	return await response.json();
}

async function newMessage(data, username, avatarID) {
	const response = await fetch(
		'http://localhost:3000/api/messages/new-message',
		{
			method: 'post',
			body: JSON.stringify({
				username: username,
				avatarID: avatarID,
				content: data,
			}),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
		},
	);

	return await response.json();
}

export { apiGetMessages, newMessage };
