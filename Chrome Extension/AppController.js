/*
    The Primary Controller for the App.
    The App's lifecycle is controlled through this document.
*/

//On Start/Page Load
$(document).ready(function()
{
    //Initialize Mutation Observers
    InitializeMutationObservers();
    //Get all existing tweets loaded on the page
    //$('.stream-item').css('background','red');

    //Get active user

});

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
function OnProfileChange(profileCardObject, dataUserId, dataAssociatedTweetId, mutations)
{
    //console.log("uid: " + dataUserId + "\n atid: " + dataAssociatedTweetId);
    profileCardObject.find('.profile-card').append(addNoteForm);
    MakeInlineEditable();
    console.log('profile');
}
