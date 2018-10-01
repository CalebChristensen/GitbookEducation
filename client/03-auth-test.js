function fetchAllFromAuthRoute() {
    const fetch_url = 'http://localhost:3000/authtest/getall'
    const accessToken = localStorage.getItem('SessionToken') //Since we stores our token in localStorage, we can access it by using the getItem method to get it back from localStorage and put it in a variable. Note that we could also use our getSessionToken() method for this task.

    const response = fetch(fetch_url, {
        method:'GET', //by default, fetch runs a GET request. We can use the method property to send other requests. In this case, were still sending a GET
        headers: {
            'Content-Type': 'application/json', //The Content-Type header tells the server what kind of data is being sent in our PreFlight request, if any.
            'Authorization': accessToken //The Authorization header provides some sort of encrypted data allowing access to the server, in this case our token.
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
    })
}

// || FETCH/POST to Auth/Create ||
function postToAuthRouteCreate() {
    const fetch_url = 'http://localhost:3000/authtest/create'
    const accessToken = localStorage.getItem('SessionToken')

    let authTestDataInput = document.getElementById('authTestData').value; //We will be using an input field in the DOM for this exercise, so we will grab whatever string that a user passes into that field.

    let authInputData = { authtestdata: { item: authTestDataInput } }; // We package that value up into an object. Notice that this object is similar in syntax to what we did with Postman when posting data.

    const response = fetch(fetch_url, {
        method: 'POST', //Note that we are identifying this method as a POST request. If you are struggling with request problems, its a good idea to take a look at your HTTP verb and make sure you are using the right one. Since the server endpoint requires a POST request, we have to send the data as a POST request. Get would not work because we did not write our server endpoint as a GET request.
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        body: JSON.stringify(authInputData) //We package up the object as a JSON string and add it to the body of our request. The JSON.stringify() method will take a JS object and convert it into JSON.
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
    })
}

// || GET ITEM BY USER ||
function getOneByUser() {
    let postIdNumber = document.getElementById("getNumber").value; //We get the postIdNumber provided in the getNumber field. Because we are making an authenticated request, this id has to exist in the database, as well as atch the user.id from the database for the user that you are currently logged in as.

    const fetch_url = `http://localhost:3000/authtest/${postIdNumber}` //We pass the postIdNumber into the url with a template literal
    const accessToken = localStorage.getItem('SessionToken')

    const response = fetch(fetch_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
    .then(response => {
        return response.json();
    })
    .then(function (response) {
        console.log(response);
        var myItem = document.getElementById('getItemValue'); //We target an element called getItemValue. It's a label tag.
        myItem.innerHTML = response.authtestdata; //We set the value of the label to the value of response.authtestdata. This means that the data will be populated in the label when the DOM loads.
    })
}

// || PUT to authtest/update/:id ||
function updateItem() {
    let postIdNumber = document.getElementById("updateNumber").value;
    let authTestDataInput = document.getElementById('updateValue').value;

    const fetch_url = `http://localhost:3000/authtest/update/${postIdNumber}`
    const accessToken = localStorage.getItem('SessionToken')

    let authInputData = { authtestdata: { item: authTestDataInput } };
    const response = fetch(fetch_url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        body: JSON.stringify(authInputData)
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
        varmyItem = document.getElementById("newItemValue")
        myItem.innerHTML = data.authtestdata;
        fetchAllFromAuthRoute();
    })
}

// || PUT to authtest/update/:id ||
function updateItem() {
    let postIdNumber = document.getElementById("updateNumber").value;
    let authTestDataInput = document.getElementById('updateValue').value; //We get the value of the input provdied from the user for both the updateNumber and updateValue fields and assign each to a variable.

    const fetch_url = `http://localhost:3000/authtest/update/${postIdNumber}` //Like before, we pass in the input from the user to the url with a template literal
    const accessToken = localStorage.getItem('SessionToken')

    let authInputData = { authtestdata: { item: authTestDataInput } }; //We create an object that packages up our request. We capture the value of authTestDataInput and store it in the variable authInputData variable.
    const response = fetch(fetch_url, {
        method: 'PUT', //We are doing an update method, so this will be a PUT request.
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        body: JSON.stringify(authInputData) //Just like we did in past POST methods, we use the stringify method to convert the objecat to  a JSON object.
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data) //We print the response to our fetch to the console.
        var myItem = document.getElementById('newItemValue') //We make a reference to the <label> in step 12 (Update Single Item) , then set its value to the data we put in DB.
        myItem.innerHTML = data.authtestdata;
        fetchAllFromAuthRoute(); //We run the getall function again and print the new contents of the database to the console.
    })
}

function showCurrentData(e) { //e is the default variable name for an Event Listenser. Here, e represents the input field updateNumber, which was passed as a parameter using this on the HTML page.
    const fetch_url = `http://localhost:3000/authtest/${e.value}`//We pass the value of the input field supplied by the user directly into the URL with a template literal. Because e is already defined as the input field, we dont need to use a function to get another reference to it.
    const accessToken = localStorage.getItem('SessionToken')

    fetch(fetch_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
    .then(response => {
        return response.json();
    })
    .then(function (response) {
        console.log(response);
        var myItem = document.getElementById('updateValue'); //We call the DOM element we want to modify and set it to the variable to be accessed later.
        if (!response) return; //If no item in the database matches the id we've supplied, the repsonse comes back undefined. A blank return statment tells the program not to return anything and just to move on. Remember that not only does the id have to match what's in the database, but user.id also has to match the owner property, signifying that the current user is the one who entered it.
        else myItem.value = response.authtestdata; //We could use innerHTML to set the value, but that method doesnt work with <input> elements. Instead, we use value to insert our data into the field.
    })
}