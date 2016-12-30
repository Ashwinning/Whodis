/*
    The Profile Card Controller
    Handles template injection for profile hover cards,
    and relevant logic.
*/

// The current card
var currentCard = {dataUserId: "", dataAssociatedTweetId: ""};

// The profile-hover element
var profileCardObject = $('#profile-hover-container');

// Current state of the card
var cardIsVisible;

// Track the state of the card
var cardWasVisible;

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

    var cardStyle = profileCardObject.attr('style');
    var cardDisplay = ReadDisplay(cardStyle);

    /*
        Set cardIsVisible state.
    */
    if (cardDisplay == "block")
    {
        cardIsVisible = true;
        console.log('isVisible');
    }
    else if (cardDisplay == "none")
    {
        cardIsVisible = false;
        cardWasVisible = false; //Set the state so we know the card had been made invisible.
        console.log('isNotVisible');
    }

    /*

    */
    if (cardIsVisible && !cardWasVisible) //Card is now visible but wasn't before
    {
        //Set the tracker so we know the card was visible this time around.
        cardWasVisible = true;
        //Set this new card as the currentCard
        currentCard = {dataUserId: dataUserId, dataAssociatedTweetId: dataAssociatedTweetId};
        //Send card data to App's lifecycle
        OnProfileShown(profileCardObject, dataUserId, dataAssociatedTweetId, mutations);
    }

}

/*
    Reads the `display` property from a given css string.
*/
function ReadDisplay(css)
{
    if(typeof css == undefined)
    {
        return;
    }

    var propertyToRead = 'display:' //What are we trying to find?
    var indexOfDisplay = css.indexOf(propertyToRead); //Where does the property start?
    var indexOfValue = indexOfDisplay + propertyToRead.length; //Where does the value start? (at the end of )
    var indexOfNextSemiColon =  css.indexOf(';', indexOfValue); //Value ends at the semicolon (exclusive) Second arg is start index.
    var value = css.substring(indexOfValue, indexOfNextSemiColon); //Ze value.

    return value.trim();

}

/*
// OLD code from the ProfileMutationReciever
// Was chacking for a change in cards
// This approach doesn't work because twitter erases all content inside the card.

    if (currentCard.dataUserId != dataUserId || currentCard.dataAssociatedTweetId != dataAssociatedTweetId)
    {
        //This is not the same card
        //Set this new card as the currentCard
        currentCard = {dataUserId: dataUserId, dataAssociatedTweetId: dataAssociatedTweetId};
        //console.log(currentCard);
        //Send card data to App's lifecycle
        OnProfileShown(profileCardObject, dataUserId, dataAssociatedTweetId, mutations);
    }
*/
