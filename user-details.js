import {getPost} from './fetchData.js';

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

const data = JSON.parse(localStorage.getItem('users'))
const user = data.find((user) => user.id === Number(userId) );

let wrapper = document.getElementById('wrapper');

const renderUser = ({company, address, email, id, name, phone, username, website}) => {
	let div = document.createElement("div");
	let h2 = document.createElement("h2");
	let phoneUser = document.createElement("p");
	let emailUser = document.createElement("p");
	let userName = document.createElement("p");
	let webSiteName = document.createElement("p");
	let listAddress = document.createElement("ul");
	let listCompany = document.createElement("ul");
	let button = document.createElement("button");

	h2.textContent = name;
	phoneUser.textContent = `Telephone: ${phone}`;
	emailUser.textContent = `Email: ${email}`
	userName.textContent = `Username: ${username}`;
	webSiteName.textContent = `Website: ${website}`;
	button.textContent = 'Post of current user';
	button.setAttribute("id", 'getPosts');

	const {city, geo, street, suite, zipcode} = address;

	listAddress.innerHTML = `
		<li>${city}</li>
		<li>${geo.lat}, ${geo.lng}</li>
		<li>${street}</li>
		<li>${suite}</li>
		<li>${zipcode}</li>`;

	const {bs, catchPhrase, name: nameCompany} = company;

	listCompany.innerHTML = `
		<li>${bs}</li>
		<li>${catchPhrase}</li>
		<li>${nameCompany}</li>`;



	div.append(h2, phoneUser, emailUser, userName, webSiteName, listAddress, listCompany, button);
	wrapper.append(div);

}

renderUser(user);

const addPosts = (posts) => {
	let div = document.createElement("div");
	let ul = document.createElement("ul");
	wrapper.append(div);
	div.append(ul);

	for (let post of posts) {
		let li = document.createElement("li");
		let link = document.createElement("a");
		li.textContent = post.title;
		link.textContent = 'link';
		link.href = `post-details.html?id=${post.id}`;
		li.append(link);
		ul.append(li);
	}

}

const renderPosts = async (userId) => {
	let posts = await getPost(userId);

	localStorage.setItem('posts', JSON.stringify(posts));

	if (!posts) {
		document.body.innerHTML = '<p style="color: red;">Не вдалося завантажити пости. Спробуйте ще раз.</p>';
		return;
	}
	addPosts(posts);
	console.log(posts);
}

let button = document.getElementById("getPosts");

button.addEventListener("click", (e) => {
	renderPosts(userId);
},{ once: true })
