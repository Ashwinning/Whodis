/*
    Everything database IO related for notes.
    Since this interacts with background.js (for firebase's functions)
    It has to interact with the MessageBackgroundController.
*/

// Get a reference to the current logged in user.
var userId;
/*
    dataUserId is the Twitter UID.
*/
function GetNote(dataUserId)
{
    //Define the operation
    var operation = {
        operation: "ONCE",
        path: "/notes/" + dataUserId
    }
    //Execute the operation
    return chrome.runtime.sendMessage(operation, function(response)
    {
        return response;
    });
}

/*
    dataUserId is the Twitter UID.
*/
function SetNote(dataUserId, note)
{
    firebase.database().ref('/users/' + userId + '/notes/' + dataUserId).set(note);
    //Define the operation
    var operation = {
        operation: "SET",
        path: "/notes/" + dataUserId,
        value: note
    }
    //Execute the operation
    return chrome.runtime.sendMessage(operation, function(response)
    {
        return response;
    });
}
