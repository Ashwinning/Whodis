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
    data is json.
    Structure:
        {
            note : 'the note' // the note
        }
*/
function SetNote(dataUserId, data)
{
    if (note == emptyNotePrompt)
    {
        //Don't do anything.
        return;
    }
    console.log('SetNote \nSetting data : ' + data + '\nfor : ' + dataUserId);
    //Define the operation
    var operation = {
        operation: "SET",
        path: "/notes/" + dataUserId,
        value: data
    }
    //Execute the operation
    return chrome.runtime.sendMessage(operation, function(response)
    {
        return response;
    });
}


/*
    dataUserId is the Twitter UID.
    data is json.
    Structure:
        {
            note : 'the note' // the note
        }
*/
function UpdateNote(dataUserId, data)
{
    if (note == emptyNotePrompt)
    {
        //Don't do anything.
        return;
    }
    console.log('UpdateNote \nUpdating data : ' + data + '\nfor : ' + dataUserId);
    //Define the operation
    var operation = {
        operation: "UPDATE",
        path: "/notes/" + dataUserId,
        value: data
    }
    //Execute the operation
    return chrome.runtime.sendMessage(operation, function(response)
    {
        return response;
    });
}


/*
    Gets the twitterID's for every note this user has saved.
    User a REST request since "Shallow" is not supported by any of the Firebase SDKs.
    Accepts a callback to which the information is passed
*/
function GetNoteList(callback)
{
    //Get logged in user's current token
    console.log('Getting current user\'s token.');
    //Define the operation
    var operation = {
        operation: "TOKEN"
    }
    //Execute the operation
    chrome.runtime.sendMessage(operation, function(response)
    {
        //Once we got the token
        console.log('NoteIO got token response:');
        console.log(response);
        var userId = response.uid;
        var token = response.token;
        var url = 'https://whodis-6326a.firebaseio.com/users/'+userId+'/notes.json?shallow=true&auth='+token;
        $.get( url, function( data )
        {
            //store all keys from this JSON data in an array
            var keys = [];
            for(var k in data) //sorry future Ashwin for iterating, but this isn't C++ and I'm not getting into the map polyfill mess right now. That's a job for future Ashwin.
            {
                keys.push(k);
            }
            //Send them back to Mexico (Oh god that's dark).
            callback(keys);
        });

        //callback(response);
    });

}
