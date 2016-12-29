/*
    Everything database IO related for notes.
    Since this interacts with background.js (for firebase's functions)
    It has to interact with FirebaseIO.js.
*/

/*
    dataUserId is the Twitter UID.
*/
function GetNote(dataUserId)
{
    console.log('GETNOTE : Getting note');
    //Define the operation
    var operation = {
        operation: "ONCE",
        path: "/notes/" + dataUserId
    }
    //Execute the operation
    return chrome.runtime.sendMessage(operation, function(response)
    {
        console.log('GetNote recieved a response:');
        console.log(response);
        return response;
    });
}

/*
    dataUserId is the Twitter UID.
*/
function SetNote(dataUserId, note)
{
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
