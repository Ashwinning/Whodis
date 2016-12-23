/*
    The Primary Controller for the App.
    The App's lifecycle is controlled through this document.
*/

//On Start/Page Load
$(document).ready(function()
{
    //Initialize Mutation Observers
    InitializeMutationObserver();
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
