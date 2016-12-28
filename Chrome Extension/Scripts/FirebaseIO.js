/*
    handles Firebase IO.
    Because firebase context lives in background, this file lives in the background too.
    The API for the folliwing function require the use of the Chrome Message passing API.
*/

/*

*/


/*
    Listens to the incoming messages and processes the requests.
*/
chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse)
{
  if (request.greeting == "hello")
  sendResponse({farewell: "goodbye"});
});

/*
    Calls `set()` on the database.
    Can only set data for the current user (under `'/users/' + userId`).
    Accepts a `path`, and a value which will be set there.
*/
function DatabaseSet(path, value)
{
    firebase.database().ref('/users/' + userId + path).set(value);
}

/*
    Calls `once()` on the database.
    Gets and returns contents from the database.
    Can only get data for the current user (under `'/users/' + userId`).
    Accepts a `path`, and a value which will be retrieved from there.
*/
function DatabaseOnce()
{
    return firebase.database().ref('/users/' + userId + path).once('value').then(function(snapshot)
    {
        var username = snapshot.val().username;
        // ...
    });
}
