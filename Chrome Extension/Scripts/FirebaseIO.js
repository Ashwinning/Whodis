/*
    handles Firebase IO.
    Because firebase context lives in background, this file lives in the background too.
    The API for the folliwing function require the use of the Chrome Message passing API.
*/

/*
    HOW TO PASS MESSAGES

    To run IO ops from the `content scripts`, you need to a pass a message
    Messages are passed between the sandboxed `background` and `content scripts` like so:

        chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
            console.log(response);
        });

    REQUEST FORMAT

    The JSON payload sent in the message should be of the following formats:

        TO PERFORM A SET OPERATION:

            {
                operation: "SET",
                path: "/the/path/where/you/want/to/put/this/stuff",
                value: {theJSONpayload: "Or string which you'd like to set here"}
            }

        TO PERFORM A ONCE OPERATION: (To get stuff)
            {
                operation: "ONCE",
                path: "/the/path/where/you/want/to/put/this/stuff"
            }
*/

// Reference to the current user's User ID
var userId;

/*
    Listens to the incoming messages and processes the requests.
    Set all the hooks for operations here.
*/
chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse)
{
    if (request.operation.toUpperCase() == "SET")
    {
        DatabaseSet(request.path, request.value);
    }

    if (request.operation.toUpperCase() == "ONCE")
    {
        DatabaseOnce(request.path, sendResponse);
    }
});

/*
    Calls `set()` on the database.
    Can only set data for the current user (under `'/users/' + userId`).
    Accepts a `path`, and a value which will be set there.
*/
function DatabaseSet(path, value)
{
    console.log('DatabaseSet \nSetting note : ' + value + '\nat : ' + '/users/' + userId + path);
    firebase.database().ref('/users/' + userId + path).set(value);
}

/*
    Calls `once()` on the database.
    Gets and returns contents from the database.
    Can only get data for the current user (under `'/users/' + userId`).
    Accepts a `path`, and a value which will be retrieved from there.
*/
function DatabaseOnce(path, sendResponse)
{
    console.log('DatabaseOnce \nGetting note at : ' + '/users/' + userId + path);
    return firebase.database().ref('/users/' + userId + path).once('value').then(function(snapshot)
    {
        console.log('DatabaseOnce value recieved : ' + snapshot.val());
        sendResponse(snapshot.val());
    });
}
