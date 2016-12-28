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
    return firebase.database().ref('/users/' + userId + '/notes/' + dataUserId).once('value').then(function(snapshot)
    {
        var note = snapshot.val();
        console.log(note);
    });
}

/*
    dataUserId is the Twitter UID.
*/
function SetNote(dataUserId, note)
{
    firebase.database().ref('/users/' + userId + '/notes/' + dataUserId).set(note);
}
