let userList = document.getElementById('userList')
let newUser = document.getElementById('newUser')
let saveUserBtn = document.getElementById('saveUserBtn')

fetch('http://localhost:3000/users')
.then(res => res.json())
.then(data => {
/*     console.log(data); */
    printUsers(data);
});

function printUsers(users) {
    console.log(users);

    userList.innerHTML = '';

    users.map(user => {
        let li = document.createElement('li')
        li.id = user.id;
        li.innerText = user.name;
        userList.appendChild(li);
    })
}

saveUserBtn.addEventListener('click', () => {
    let user = {name: newUser.value};
    console.log(user);

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        printUsers(data)});

})