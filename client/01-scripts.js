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