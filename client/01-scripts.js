function fetchHelloDataFromAPI() {
    fetch('http://localhost:3000/test/helloclient', { //Test endpoint with fixed value to verify server works.
        method: 'GET',
        headers: new Headers({ //Send our headers to the server witht he Headers() constructor object.
            'Content-Type': 'application/json'
        })
    })
    .then(function (response) {
        console.log("Fetch response:", response)
        return response.text(); //The value received is a string, not a JSON object, so .text() is used instead of .json()
    })
    .then(function (text) {
        console.log(text);
    });
}

function postToOne(){
    var url = 'http://localhost:3000/test/one';

    fetch(url, {
        method: 'POST', //We are fetching the url. The route in the server handles a POST request. Remember that these two must match. If a route takes a POST request then the declared method in the request should POST.
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(
        function(response){ //We pass the response into a promise that retunrs the response as plain text.(We'll use more JSON later)
            return response.text()
        })
        .catch(
            function(error) {
                console.error('Error:', error) //We handle an error, if an error comes back.
    })
        .then(
            function(response){
                console.log('Success:', response) //In the final then(), we simply print the plain text response to the console. This section is where we can do some DOM set up.
            })   
}

function postToOneArrow(){
    var url = 'http://localhost:3000/test/one';

    fetch(url, { //We're reaching out to an endpoint wit a POST request. We add the appropriate headers.
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.text()) //We are asking for a plain text response.
    .catch(error => console.error('Error:', error)) //We handle an error, if there is one.
    .then(response => console.log('Success:', response)); // in the end we simply print the data to the console.
}

function postData(){
    let content = { testdata: {item: 'This was saved!'} }; //We set up an object, just like we would have in Postman. We have a preset string as the value of the item property.
    let testDataAfterFetch = document.getElementById('test-data'); //We target some specific ids in the DOM> These elements will hold the value of the response that comes back.
    let createdAtAfterFetch = document.getElementById('created-at');

    fetch('http://localhost:3000/test/seven', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content) //We pass in our pre-defined object into the fetch call within the body property. Notice that the method property is now POST instead of GET.
    })
    .then(response => response.json())
    .then(function (text) {
        console.log(text); //Our response comes back and is printed to the console, and it is also displayed to the user along with the timestamp. We access the seperate values by calling text.testdata. In the DOM, the innerHTML property allows us to take the plain text that we get back and display it in the targeted element.
        testDataAfterFetch.innerHTML = text.testdata.testdata;
        createdAtAfterFetch.innerHTML = text.testdata.createdAt;
    });
}

function fetchFromOneDisplayData(){
    //We set up our URL in one variable and target the data-one id in the DOM in another one.
    let url = 'http://localhost:3000/test/one';
    let dataView = document.getElementById('display-one');
    //We create a fetch() with Headers and therequest method of GET. There are also chained promises that handle the data when it returns or handle an error if one comes back.
    fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(
        function(response) {
            return response.json()
        })
        .catch(
            function(error){
                console.error('Error:', error)
            })
            .then(
                function(results){
                    let myList = document.querySelector('#getjson'); //Inside the final .then(), we are going to work torwards showing the retunred data in the DOM. We start by targeting the getjson id in the DOM and attaching the value to the myList variable.

                    for (r of results){ //We set up a for of loop.
                        console.log('Response:', r.testdata); //We write a console.log() statement to show how we can access the values that come back in the object inside the response.
                        var listItem = document.createElement('li'); //We create another variable called listItem. The createElement() method will create that type of element in the DOM. In this case, we create a list item, li, every time we iterate.
                        listItem.innerHTML = r.testdata; // Each time we iterate, we store the value of r.testdata in the newly creat li.
                        myList.appendChild(listItem); //We call appendChild on myList, which means that each time we iterate we put the li into the unordered list.
                    }
                })
}