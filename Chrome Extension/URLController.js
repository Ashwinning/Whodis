/*
    The code in here tracks everything URL related
    `chrome.tabs.onUpdated.addListener` sends MULTIPLE events,

    URLController is an abstraction to track those events and call the desired
    function in the App's lifecycle (AppController) only once.

    Also handles the `chrome.runtime.onMessage.addListener` stuff to listen to messages
    sent by background.js using `chrome.tabs.sendMessage`
    since background.js can't directly call functions from content scripts.
*/

/*
    Message reciever from background.js
    Set relevant event/delegates here.
*/
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //console.log("got message");
    if (request.function == "OnURLChange")
    {
        url = request.args.t.url;
        //console.log(url);
        if (CheckIfDifferent(url) && ContainsTwitter(url))
        {
            //new twitter URL found
            //pass on the event to AppController
            OnURLChange(request.args.ti, request.args.ci, request.args.t);
            //set as current URL
            currentURL = url;
        }

    }
    /*
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
    */
  });

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
