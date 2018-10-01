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

// || DELETE and item ||
function deleteItem(){
    let postIdNumber = document.getElementById("deleteNumber").value;

    const fetch_url = `http://localhost:3000/authtest/delete/${postIdNumber}` //Again we get the id number submitted by the user and pass it into the url vai a template literal.
    const accessToken = localStorage.getItem('SessionToken')

    const response = fetch(fetch_url, {
        method: 'DELETE', //Our HTTP verb is DELETE in this case, so we use the DELETE method.
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
    .then(response => { //We print the response to the console and also run the fetchALlFromAuthRoute function again, which will print all remaining items for our user to the console.
        console.log(response);
        fetchAllFromAuthRoute()
    })
}
 
function deleteItemById(paraNum) { // The id of the <li> is passed into this function as a parameter, which is then added to the url via the template literal.
    const fetch_url = `http://localhost:3000/authtest/delete/${paraNum}`
    const accessToken = localStorage.getItem('SessionToken')

    const response = fetch(fetch_url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
    .then(response => {
        console.log(response); //Print the response to the console to verify the delete worked.
        fetchAllFromAuthRoute(); //Run the getall function again to print the remaining items in the DB to the console.
    })
}

function fetchFromOneDisplayData() {
    const url = 'http://localhost:3000/authtest/getall';
    const accessToken = localStorage.getItem('SessionToken')

    fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': accessToken
        })
    }).then(
        function (response) {
            return response.json()
        })
        .catch(
            function (error) {
                console.error('Error:', error)
            })
            .then(
                function (response) {
                    let text = '';
                    var myList = document.querySelector('ul#fourteen'); //This is a little different way of making a reference to a DOM element. We're aiming for a <ul> element with an id of fourteen (the # signals the program to look for an id rather than a class)
                    while (myList.firstChild) { //This should look familar to you. This is the same way we cleared  out the <section> elements in the NYT and YouTube API mini-apps.
                        myList.removeChild(myList.firstChild)
                    }
                    console.log(response);
                    for (r of response) { //We use a for of loop to iterate through the values of each key: value object pair.
                        var listItem = document.createElement('li'); //Given that we're working with a <ul> element, each loop will create a different <li>
                        var textData = r.id + ' ' + r.authtestdata; //We create a string with the id and authtestdata properties, then put that string into the <li> element.
                        listItem.innerHTML = textData;
                        listItem.setAttribute('id', r.id); //We add the id property of each object as an id for each <li> this will allow us to call them individually later.
                        myList.appendChild(listItem); //The <li> child element is added to the end of the <ul> parent element.
                        myList.addEventListener('click', removeItem); //We add our custom listner to run whenever an <li> is clicked.
                    }
                })
}

function removeItem(e) {
    console.log(e); //Print e to the console to check which item we're clicking on.
    var target = e.target; //target is a nested object within e. This places that object inside its own variable.
    if (target.tagName !== 'LI') return; //If the item we're clicking on isnt an <li> element, the empty return statment exits the conditional.
    else target.parentNode.removeChild(target); //We remove the <li> child from the <ul> parent.

    let x = target.getAttribute("id") //Earlier we sent an id for the <li>. Now we get it back so we can pass it to the DELETE request.
    //deleteItemById(x); 
    console.log("The id number for this item is " + x);
}