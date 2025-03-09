export const getUsers = async () => {
	try {
		const res = await fetch('https://jsonplaceholder.typicode.com/users');
		if (!res.ok) {
			console.error(`Помилка: ${res.status}`);
			return null;
		}
		return await res.json();

	} catch (err) {
		console.error('Помилка при отриманні даних:', err);
		return null;
	}
};

export const getPost = async (id) => {
	try {
		const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
		if (!res.ok) {
			console.error(`Помилка: ${res.status}`);
			return null;
		}

		return await res.json();

	} catch (err) {
		console.error('Помилка при отриманні даних:', err);
		return null;
	}
};

export const getComments = async (id) => {
	try {
		const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
		if (!res.ok) {
			console.error(`Помилка: ${res.status}`);
			return null;
		}
		return await res.json();

	} catch (err) {
		console.error('Помилка при отриманні даних:', err);
		return null;
	}
};