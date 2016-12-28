/*
    Everything database IO related for notes.
*/

// Get a reference to the database service.
var database = firebase.database();

// Get a reference to the current logged in user.
var userId = firebase.auth().currentUser.uid;

/*
    dataUserId is the Twitter UID.
*/
function GetNote(dataUserId)
{
    return database.ref('/users/' + userId + '/notes/' + dataUserId).once('value').then(function(snapshot)
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
    database.ref('/users/' + userId + '/notes/' + dataUserId).set(note);
}
