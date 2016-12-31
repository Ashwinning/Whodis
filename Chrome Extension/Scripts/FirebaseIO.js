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

        TO PERFORM AN UPDATE OPERATION:

            {
                operation: "UPDATE",
                path: "/the/path/where/you/want/to/put/this/stuff",
                value: {theJSONpayload: "Or string which you'd like to set here"}
            }

        TO PERFORM A ONCE OPERATION: (To get stuff)
            {
                operation: "ONCE",
                path: "/the/path/where/you/want/to/put/this/stuff"
            }

        TO GET THE AUTHENTICATED USER'S TOKEN
            {
                operation: "TOKEN"
            }


*/

// Reference to the current user's User ID
// Set in background.js
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

    if (request.operation.toUpperCase() == "UPDATE")
    {
        DatabaseUpdate(request.path, request.value);
    }

    if (request.operation.toUpperCase() == "ONCE")
    {
        DatabaseOnce(request.path, sendResponse);
        return true; //Indicates that we'll call sendResponse() asynchronously.
    }

    if (request.operation.toUpperCase() == "TOKEN")
    {
        GetToken(sendResponse);
        return true; //Indicates that we'll call sendResponse() asynchronously.
    }
});

/*
    Calls `set()` on the database.
    Can only set data for the current user (under `'/users/' + userId`).
    Accepts a `path`, and a value which will be set there.
    appends createdAt to the JSON value.
*/
function DatabaseSet(path, value)
{
    console.log('DatabaseSet \nSetting note : ' + value + '\nat : ' + '/users/' + userId + path);
    var dataRef = firebase.database().ref('/users/' + userId + path);
    //Entry does not exist, set both `createdAt` & `updatedAt`
    value['createdAt'] = firebase.database.ServerValue.TIMESTAMP;
    value['updatedAt'] = firebase.database.ServerValue.TIMESTAMP;
    dataRef.set(value);
}

function DatabaseUpdate(path, value)
{
    console.log('DatabaseSet \nUpdating note : ' + value + '\nat : ' + '/users/' + userId + path);
    var dataRef = firebase.database().ref('/users/' + userId + path);
    //Entry exists, set the `updatedAt`
    value['updatedAt'] = firebase.database.ServerValue.TIMESTAMP;
    dataRef.update(value);
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
    firebase.database().ref('/users/' + userId + path).once('value').then(function(snapshot)
    {
        console.log('DatabaseOnce recieved response : ' + snapshot.val());
        sendResponse(snapshot.val()); //TODO : pass val instead of json.
    });
}

/*
    Returns the user's (firebase)UID and Token.
*/
function GetToken(sendResponse)
{
    firebase.auth().currentUser.getToken().then(function(data)
    {
        console.log('FirebaseIO got data \nUID: ' + userId + '\nToken: ' + data );
        sendResponse({uid: userId, token: data});
    });
}
