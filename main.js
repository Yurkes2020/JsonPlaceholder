// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про
// об'єкт на який клікнули

const getUsers = async () => {
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

const addUsers =  (users) => {

	for (let user of users) {

		let block = document.createElement("div");
		let id = document.createElement('h2')
		let name = document.createElement('p')

		id.textContent = user.id;
		name.textContent = user.name;

		document.body.appendChild(block);
		block.appendChild(id);
		block.appendChild(name);
	}
}

const renderUsers = async () => {
	let users = await getUsers();
	if (!users) {
		document.body.innerHTML = '<p style="color: red;">Не вдалося завантажити кошики. Спробуйте ще раз.</p>';
		return;
	}
	addUsers(users);
	console.log(users);
}

renderUsers()