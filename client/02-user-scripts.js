// || POST - /createuser ||
function userSignUp(){
    let userName = document.getElementById('userSignUp').value; //Grab the value of the user/pass data from the ./createuser input field in the index.html file
    let userPass = document.getElementById('passSignUp').value;
    console.log(userName, userPass);

    let newUserData = {user: { username: userName, password: userPass }}; //The variables used to store the sign up info from the DOM get passed into the values of the username and password properties. We package everything up in the user object.
    fetch('http://localhost:3000/api/user/createuser', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserData) // In the request object in our fetch() call, we pass in the newUSerData variable to be sent off in the body of our request 2 server.
    })
    .then(response => response.json())
    .then(function (response) {
        console.log(response.sessionToken);
        let token = response.sessionToken; //We get the sessionToken fro the response and store it in a token variable.
        localStorage.setItem('SessionToken', token); //in our localStorage, we call the setItem function and store the token in localStorage. This will keep our token safely stored in our local window.
    });
}
function userSignIn(){
    let userName = document.getElementById('userSignUp').value; 
    let userPass = document.getElementById('passSignUp').value;
    console.log(userName, userPass);

    let userData = {user: { username: userName, password: userPass }};
    fetch('http://localhost:3000/api/user/signin', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(function (response) {
        console.log(response.sessionToken);
        let token = response.sessionToken;
        localStorage.setItem('SessionToken', token)
    });
}

// || HELPER FUNCTION FOR TOKEN ||
function getSessionToken(){
    var data = localStorage.getItem('SessionToken');
    console.log(data);
    return data;
}