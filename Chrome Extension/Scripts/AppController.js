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
    $('.stream-item').css('background','red');

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
    console.log('Is user profile : ' + IsUserProfile(tab.url));
    //If this is a user profile.
    if(IsUserProfile(tab.url))
    {
        //get the twitter ID for the page (currently taking the data-user-id from `.ProfileNav`)
        var dataUserId = $('.ProfileNav').attr('data-user-id');
        console.log("Got uid : " + dataUserId + ", injecting widget.");
        InjectWidget('.ProfileHeaderCard', dataUserId, '30px');
    }
    $('.stream-item').css('background','red');

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
    InjectWidget(profileCardObject.find('.profile-card'), dataUserId);
}
