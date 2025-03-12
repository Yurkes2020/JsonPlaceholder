import {getComments} from './fetchData.js';

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

let back = document.getElementById('back');
let main = document.getElementsByTagName('main')[0];

back.href = './index.html';

let posts = JSON.parse(localStorage.getItem('posts')) ;
let postCurrent = posts.find((post) => post.id === Number(postId) );

const addComments =  (comments) => {

	let conteiner = document.createElement('div');

	conteiner.className =  'comments-container'

	for (let comment of comments) {
		let wrapComments = document.createElement('div');
		let commentTitle = document.createElement('h2');
		let commentText = document.createElement('p');
		let commentAuthor = document.createElement('p');

		wrapComments.className = 'comment-wrapper'

		commentTitle.textContent = comment.name;
		commentText.textContent = comment.body;
		commentAuthor.textContent = comment.email;

		wrapComments.append(commentTitle, commentText, commentAuthor);
		conteiner.appendChild(wrapComments);
		main.appendChild( conteiner);
	}
}

const addPost = ({title, body}) => {

	let wrapPost = document.createElement('div');
	let titlePost = document.createElement('h2');
	let text = document.createElement('p');

	wrapPost.className = 'post-wrapper';

	titlePost.textContent = title;
	text.textContent = body;

	wrapPost.append(titlePost,text);
	main.appendChild(wrapPost);
}

const renderPost = async (post) => {

	const data = await getComments(postId);

	addPost(postCurrent)

	if (!data) {
		document.body.innerHTML = '<p style="color: red;">Не вдалося завантажити коментарі. Спробуйте ще раз.</p>';
		return;
	}

	addComments(data)
}

renderPost(postCurrent)

