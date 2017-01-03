/*
    Message reciever from background.js
    Set relevant event/delegates here.
*/

/*
    API

        To pass messages from background.js or other background files,
        to content scripts, call

            SendMessageToActiveTab(request)

        (defined in background.js).

        //TODO : Create a standard spec for this like FirebaseIO.
*/

/*
    The listener
*/
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    //console.log("MessageReceiver received a request. function: " + request.function);

    /*
    //IDK why this refused to work.
    if (request.function == "OnAuthStateChange")
    {
        console.log(request);
        IsUserLoggedIn(request.args.state);
        return true;
    }
    */

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
        return true;
    }
  });
