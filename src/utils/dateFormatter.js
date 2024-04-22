export default function (date) {
	const hour = Array.from(date.split('T')[1]).splice(0, 5).join('');
	const day = new Date(date).toLocaleDateString('en-us', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	});
	return `${day} - ${hour}`;
}
