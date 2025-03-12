import {getPost} from './fetchData.js';

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

const data = JSON.parse(localStorage.getItem('users'))
const user = data.find((user) => user.id === Number(userId) );

let main = document.getElementsByTagName('main')[0];

const renderUser = ({company, address, email, name, phone, username, website}) => {

	let div = document.createElement("div");
	div.className = "user-info";

	div.innerHTML = `
        <h2>${name}</h2>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telephone:</strong> ${phone}</p>
        <p><strong>Website:</strong> ${website}</p>
        
        <h3>Address</h3>
        <ul>
            <li>${address.city}</li>
            <li>${address.geo.lat}, ${address.geo.lng}</li>
            <li>${address.street}</li>
            <li>${address.suite}</li>
            <li>${address.zipcode}</li>
        </ul>
        
        <h3>Company</h3>
        <ul>
            <li>${company.bs}</li>
            <li>${company.catchPhrase}</li>
            <li>${company.name}</li>
        </ul>
        
        <button id="getPosts">Post of current user</button>
    `;

	main.append(div);
}

renderUser(user);

const addPosts = (posts) => {

	let div = document.createElement("div");
	let ul = document.createElement("ul");

	div.className = "posts-container";
	div.append(ul);
	main.append(div);

	const postItems = posts.map(post => {
		let li = document.createElement("li");
		let link = document.createElement("a");

		li.textContent = post.title;
		link.innerText = 'See comments';
		link.href = `post-details.html?id=${post.id}`;

		li.append(link);
		return li;
	});

	ul.append(...postItems);
};

const renderPosts = async (userId) => {

	let posts = await getPost(userId);

	localStorage.setItem('posts', JSON.stringify(posts));

	if (!posts) {
		document.body.innerHTML = '<p style="color: red;">Не вдалося завантажити пости. Спробуйте ще раз.</p>';
		return;
	}
	addPosts(posts);
}

let button = document.getElementById("getPosts");

button.addEventListener("click", (e) => {
	renderPosts(userId);
},{ once: true })
