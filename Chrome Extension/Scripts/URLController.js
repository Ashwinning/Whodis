/*
    The code in here tracks everything URL related
    `chrome.tabs.onUpdated.addListener` sends MULTIPLE events,

    URLController is an abstraction to track those events and call the desired
    function in the App's lifecycle (AppController) only once.

    Also handles the `chrome.runtime.onMessage.addListener` stuff to listen to messages
    sent by background.js using `chrome.tabs.sendMessage`
    since background.js can't directly call functions from content scripts.
*/

// The current URL
var currentURL = "twitter.com";

/*
    Tests if the new recieved URL is different from the current URL
    If differet, returns true
*/
function CheckIfDifferent(urlstring)
{
    if (urlstring == currentURL)
    {
        return false;
    }
    else
    {
        return true;
    }
}

/*
    Checks if the URL is a twitter tab.
*/
function ContainsTwitter(urlstring)
{
    if (urlstring.indexOf('twitter.com') !== -1)
    {
        return true;
    }
    else
    {
        return false;
    }
}

/*
Checks is the given page is a user's profile
*/
function IsUserProfile(urlstring)
{
    /*
        Checks if URL has twitter in it.
        If it does, make sure the forward slash after the domain
        is the last one.
        If there is still another one, make sure there's no text after it.
    */
    //console.log("URL recieved = " + urlstring);
    var checkString = 'https://twitter.com/';
    var indexOfCheck = urlstring.indexOf(checkString);
    if (indexOfCheck != -1) //Is twitter URL
    {
        //Get string after checkString
        var remainder = urlstring.substring(checkString.length, urlstring.length);
        //console.log('remainder = ' + remainder);
        if (remainder.indexOf('/') == -1 && remainder.length > 0) //if there are no slashes but some text is there
        {
            return true;
        }
        else if (remainder.indexOf('/') > -1 && remainder.indexOf('/') == remainder.length - 1) // if there is a slash, but it's the last character
        {                                                                                       // if there's a slash before, the second condition
            return true;                                                                        // will eval to false.
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}
