/*
    The Primary Controller for the App.
    The App's lifecycle is controlled through this document.
*/

/*
    Public/Global variables
*/

//On Start/Page Load
$(document).ready(function()
{
    //Initialize Mutation Observers
    InitializeMutationObservers();
    //Get all existing tweets loaded on the page
    //$('.stream-item').css('background','red');

    console.log('Started plugin');

    GetNoteList(function(keys)
    {
        console.log(keys);
    });

});




/*
    Called when firebase is initialized.
    Sets all the references from the
*/
function OnFirebaseInit()
{

}

/*
    Triggered every time a change is registered in the active tab's URL.
    Optionally, the passed parameters can also be used.
*/
function OnURLChange(tabId, changeInfo, tab)
{
    //console.log(tab.url)
}

/*
    Triggered every time a change is registered in the active profile hover card.
    Parameters:
    The `profileCardObject` is a jQuery object containing the relevant div.
    'dataUserId' is the twitter numeric user id of the user.
    'dataAssociatedTweetId' is the tweet id.
    The Mutations parameter contains a `MutationRecord`.
*/
function OnProfileShown(profileCardObject, dataUserId, dataAssociatedTweetId, mutations)
{
    //console.log("Profile Shown! \n uid: " + dataUserId + "\n atid: " + dataAssociatedTweetId);
    //Inject The Loading Indicator
    var loader = '<div id="whodis-loading-spinner"><center><img src="https://abs.twimg.com/a/1482872295/img/t1/spinner-rosetta-blue-26x26.gif"></center></div>';
    var loaderObject = profileCardObject.find('.profile-card').append(loader);
    console.log(loaderObject);
    //Use the GetInjection callback
    GetInjection(dataUserId, function(response)
    {
        //Remove spinner
        $('#whodis-loading-spinner').remove();
        //Add the WhoDis HTML
        profileCardObject.find('.profile-card').append(response);
        MakeInlineEditable(dataUserId);
    });
}
