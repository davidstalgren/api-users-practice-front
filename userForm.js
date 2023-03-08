let userForm = document.getElementById('userForm');

export function printLoginForm() {
    //Skapa login information vid utloggad användare

    let loginUsername = document.createElement('input');
    loginUsername.placeholder = 'Username';
    let loginUserPassword = document.createElement('input');
    loginUserPassword.placeholder = 'Password';
    let loginUserBtn = document.createElement('button');

    loginUserBtn.innerText = 'Log in';

    loginUserBtn.addEventListener('click', () => {

        //Skapa ett login objekt
        let loginUser = {
            name: loginUsername.value,
            password: loginUserPassword.value
        };
        console.log(loginUser);
    
        //Skicka till servern
        fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.name) {
            userGreeting.innerText = `Good morning ${data.name}!!`;
            localStorage.setItem('loggedInUser', data.name);
            printLogoutBtn();
            } else {
                userGreeting.innerText = `Login failed! Check username or password`
            }
        });
    });

    userForm.innerHTML = '';
    userForm.append(loginUsername, loginUserPassword, loginUserBtn);

}

export function printLogoutBtn() {
    //Skapa loggaut knapp vid inloggad användare
    let logoutBtn = document.createElement('button');
    logoutBtn.innerText  = 'Log out';

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        userGreeting.innerText = `You have successfully logged out!`;
        printLoginForm()
    });

    userForm.innerHTML = '';
    userForm.appendChild(logoutBtn);
}