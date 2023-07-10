document.addEventListener("DOMContentLoaded", function() {});
document.addEventListener("DOMContentLoaded", function() {});
document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/books').then(resp=>resp.json())
    .then(displayBooks)
    .catch(error=>console.error(error))
});

function displayBooks(data){
    const list = document.querySelector('#list')
    data.forEach(element => {
        const title = document.createElement('li')
        title.textContent = element.title
        title.dataset.bookId = element.id
        title.addEventListener('click', queryBookInfo)
        list.append(title)
    });
}   

function  queryBookInfo (event) {
    console.log(event.target)

    fetch('http://localhost:3000/books/'+`${event.target.dataset.bookId}`).then(resp=>resp.json())
    .then(displayBookInfo)
    .catch(error=>console.error(error))


}

function displayBookInfo(data) {
    console.log('display book info',data)
    const showPanel = document.querySelector('#show-panel')
    showPanel.innerHTML = `<img src=${data.img_url}>` + 
    `<h1>${data.title}</h1>`+
     `<h2>${data.subtitle}</h2>`+
     `<p>${data.description}</p>` +
     `<h2>${data.author}</h2>`
    const usersList = document.createElement('ul')
    showPanel.appendChild(usersList)
    data.users.forEach(user => {
        const usersItem = document.createElement('li')
        usersItem.textContent = user.username
        usersList.append(usersItem)
    })
    const likeButton = document.createElement('button')
    likeButton.innerText = "Like"
    likeButton.addEventListener('click',updateLiks)
    showPanel.appendChild(likeButton)

    function updateLiks(event){
        console.log(event.target)
        const usersItem = document.createElement('li')
        usersItem.textContent = "noname user"
        usersList.appendChild(usersItem)
    }
}