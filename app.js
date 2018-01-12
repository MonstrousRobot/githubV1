const Baseurl = 'https://api.github.com/'
let user

const handleEvents = () => {
	getUser()
	getRepos()
}

//step 2
const renderUser = data => {
	const bio = data.bio ? data.bio : 'No bio info found';
	const email = data.email ? data.email : 'No email available';
	const toAppend = `
	<h1>${data.login}</h1>
	<h2>${bio}</h2>
	<h2>Public Repos: <a class='repos' href='#'>${data.public_repos}</a></h2>
	<h2><a href='${data.html_url}' target='_blank'>Check out github profile</a></h2>
	<img src="${data.avatar_url}" alt="">
	<footer>Contact Info: ${email}</footer>
	`
	$('.results').html(toAppend)
}

//step
const renderRepos = repos => {
	const toAppend = repos.map(repo => {
		return `<h1>${repo.name}</h1>`
	})
	$('.results').html(toAppend);
}

//step 4
const getRepos = () => {
	$('.results').on('click', '.repos', e => {
		e.preventDefault()
		$.get(`${Baseurl}users/${user}/repos`, data => {
			renderRepos(data)
		})
	})
}

//step 1
const getUser = () => {
	$('form').submit(e => {
		e.preventDefault()
		user = $(e.currentTarget).find('.input-field').val()
		console.log(user)
		$.get(`${Baseurl}users/${user}`, data => {
			console.log(data)
			//step 3: renderUser(data)
			renderUser(data) 
		})
	})
}



$(handleEvents);

