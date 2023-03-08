import {printLoginForm, printLogoutBtn} from './userForm.js';

/* let userList = document.getElementById('userList'); */
let root = document.getElementById('root');
let showUserListBtn = document.getElementById('showUserListBtn');
let newUser = document.getElementById('newUser');
let saveUserBtn = document.getElementById('saveUserBtn');
let newUserPassword = document.getElementById('newUserPassword');
/* let loginUsername = document.getElementById('loginUsername');
let loginUserPassword = document.getElementById('loginUserPassword');
let loginUserBtn = document.getElementById('loginUserBtn');
let userGreeting = document.getElementById('userGreeting'); */
let logoutUserBtn = document.getElementById('logoutUserBtn');

if (localStorage.getItem('loggedInUser')) {
    console.log('You are logged in');
    printLogoutBtn();
} else {
    console.log('You are NOT logged in');
    printLoginForm();
};

showUserListBtn.addEventListener('click', printUsers)

let loggedInUser = localStorage.getItem('loggedInUser');
if (loggedInUser) {
    userGreeting.innerText = `Good morning ${loggedInUser}!!`;
};

function printUsers() {

    fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(users => {
        /*     console.log(data); */
/*             printUsers(data); */
        console.log(users);

        let userList = document.createElement('ul');
        userList.classList.add('userList');
        userList.innerHTML = '';

        users.map(user => {
            let li = document.createElement('li')
            li.id = user.id;
            li.innerText = user.name;
            userList.appendChild(li);
        })

        userList.addEventListener('click', (e) => {
            console.log(e.target.id);

            printUserInfo(e.target.id);
        })

        root.appendChild(userList);
        });
};

function printUserInfo(userId) {
/*     console.log('From printUserInfo function', userId); */
    fetch('http://localhost:3000/users/' + userId)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        
        let userInfoDiv = document.createElement('div');

        userInfoDiv.innerHTML = `<p>${data.name}<br>${data.likes}</p>`;
    
        root.append(userInfoDiv);
    })
}

saveUserBtn.addEventListener('click', () => {

    //Skapa en ny användare
    let user = {
        name: newUser.value, 
        password: newUserPassword.value
    };
    console.log(user);


    //Skicka till servern
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        printUsers(data);
    });

    newUser.value = '';
    newUserPassword.value = '';

});



/* logoutUserBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    userGreeting.innerText = `You have successfully logged out!`;
}); */