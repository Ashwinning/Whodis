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
}
