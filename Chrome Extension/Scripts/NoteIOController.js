/*
    Everything database IO related for notes.
    Since this interacts with background.js (for firebase's functions)
    It has to interact with FirebaseIO.js.
*/

/*
    dataUserId is the Twitter UID.
    Use this as a callback function
*/
function GetNote(dataUserId, callback)
{
    console.log('GETNOTE : Getting note');
    //Define the operation
    var operation = {
        operation: "ONCE",
        path: "/notes/" + dataUserId
    }
    //Execute the operation
    chrome.runtime.sendMessage(operation, function(response)
    {
        console.log('GetNote recieved a response: ' + response.value);
        callback(response.value);
    });
}

/*
    dataUserId is the Twitter UID.
*/
function SetNote(dataUserId, note)
{
    if (note == emptyNotePrompt)
    {
        //Don't do anything.
        return;
    }

    console.log('SetNote \nSetting note : ' + note + '\nfor : ' + dataUserId);
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
