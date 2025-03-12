import {getUsers} from './fetchData.js';

let main = document.getElementsByTagName('main')[0];

const addUsers = (users) => {

	setLocalStorage(users);

	for (let user of users) {

		let block = document.createElement("div");
		let name = document.createElement('h2')
		let link = document.createElement('a')

		name.textContent = user.name;
		link.textContent = 'details'
		link.href = `user-details.html?id=${user.id}`

		block.append( name, link);
		main.appendChild(block);
	}
}

const setLocalStorage = (users) => {
	localStorage.setItem('users', JSON.stringify(users));
}

const renderUsers = async () => {
	let users = await getUsers();

	if (!users) {
		document.body.innerHTML = '<p style="color: red;">Не вдалося завантажити юзерів. Спробуйте ще раз.</p>';
		return;
	}
	addUsers(users);
}

renderUsers()