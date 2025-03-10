import {getComments} from './fetchData.js';

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
console.log(postId);

let back = document.getElementById('back');

back.href = './index.html';

let data = JSON.parse(localStorage.getItem('posts')) ;
let post = data.find((post) => post.id === Number(postId) );




const renderPost = async (post) => {

	const data = await getComments(postId);

	let wrapPost = document.createElement('div');
	let title = document.createElement('h2');
	let text = document.createElement('p');



	title.textContent = post.title;
	text.textContent = post.body;

	wrapPost.append(title,text);
	document.body.appendChild(wrapPost);

	for (let comment of data) {
		let wrapComments = document.createElement('div');
		let commentTitle = document.createElement('h2');
		let commentText = document.createElement('p');
		let commentAuthor = document.createElement('p');

		commentTitle.textContent = comment.name;
		commentText.textContent = comment.body;
		commentAuthor.textContent = comment.email;

		wrapComments.append(commentTitle, commentText, commentAuthor);
		document.body.appendChild( wrapComments);
	}
}



renderPost(post)

