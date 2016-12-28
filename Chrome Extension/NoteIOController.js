/*
    Everything database IO related for notes.
*/

// Get a reference to the database service.
var database = firebase.database();

// Get a reference to the current logged in user.
var userId = firebase.auth().currentUser.uid;

/*

*/
function GetNote(twitterID)
{
    return database.ref('/users/' + userId + '/notes/' + twitterID).once('value').then(function(snapshot)
    {
        var note = snapshot.val();
        console.log(note);
    });
}

/*

*/
function SetNote(twitterID, note)
{
    database.ref('/users/' + userId + '/notes/' + twitterID).set(note);
}
