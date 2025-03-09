const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

const data = JSON.parse(localStorage.getItem('users'))
const user = data.find((user) => user.id === Number(userId) );

console.log(user);
const renderUser = ({company, address, email, id, name, phone, username, website}) => {
	let div = document.createElement("div");
	let h2 = document.createElement("h2");
	let phoneUser = document.createElement("p");
	let emailUser = document.createElement("p");
	let userName = document.createElement("p");
	let webSiteName = document.createElement("p");
	let listAddress = document.createElement("ul");
	let listCompany = document.createElement("ul");
	let link = document.createElement("a");


	h2.textContent = name;
	phoneUser.textContent = `Telephone: ${phone}`;
	emailUser.textContent = `Email: ${email}`
	userName.textContent = `Username: ${username}`;
	webSiteName.textContent = `Website: ${website}`;
	link.textContent = 'Post of current user';
	link.setAttribute('href', '#');

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


	div.append(h2, phoneUser, emailUser, userName, webSiteName, listAddress, listCompany, link);
	document.body.append(div);

}

renderUser(user);