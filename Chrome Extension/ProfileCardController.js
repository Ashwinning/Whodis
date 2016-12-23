/*
    The Profile Card Controller
    Handles template injection for profile hover cards,
    and relevant logic.
*/

// The current card
var currentCard = {dataUserId: "", dataAssociatedTweetId: ""};

// The profile-hover element
var profileCardObject = $('#profile-hover-container');

/*
    Recieves mutations from MutationObserver,
    Since MutationObserver spams events when the atrributes change (anim),
    this function passes a single event to the app's lifecycle (AppController)
    as desired.
*/
function ProfileMutationReciever(mutations)
{
    //get the card's details
    var dataUserId = profileCardObject.attr('data-user-id');
    var dataAssociatedTweetId = profileCardObject.attr('data-associated-tweet-id');

    if (currentCard.dataUserId != dataUserId || currentCard.dataAssociatedTweetId != dataAssociatedTweetId)
    {
        //This is not the same card
        //Set this new card as the currentCard
        currentCard = {dataUserId: dataUserId, dataAssociatedTweetId: dataAssociatedTweetId};
        console.log(currentCard);
        //Send card data to App's lifecycle
        OnProfileChange(profileCardObject, dataUserId, dataAssociatedTweetId, mutations);
    }
}
