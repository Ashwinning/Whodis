/*
    Controls everything User related.
*/

// Track if the user is logged in.
var isLoggedIn = false;

/*
    IsUserLoggedIn
    Sets `isLoggedIn` value to track authentication

    Parameters:
        value : BOOL.
*/
function IsUserLoggedIn(value)
{
    isLoggedIn = value;
    //console.log('Logged in : ' + value );
}


function CheckUserAuth(callback)
{
    //Define the operation
    var operation = {
        operation: "AUTH"
    }
    //Execute the operation
    chrome.runtime.sendMessage(operation, function(response)
    {
        callback(response);
    });
}
