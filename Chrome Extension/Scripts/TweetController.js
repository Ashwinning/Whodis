/*
    Takes in all the tweets that are shown on the page.
    Parses them for data, and injects desired stuff.
*/

//Holds the tweet elements to be processed
var tweetQueue = [];

/*
    Adds a tweet, or string of tweets to the tweet queue, and triggers the processing.
    Params:
    twitterElements  : Single or Array of twitter elements.
*/
function Firehose(twitterElements)
{
    $.merge(tweetQueue, twitterElements);
    $.each(tweetQueue, function( index, tweet )
    {
        //Do something
        RunInjection(tweet);
    });
}

/*
    Mines data from tweet element.
    Returns data in JSON format.
    Format:
    {
        userID : userID, //The twitter User ID
    }
*/
function ParseTweet(twitterElement)
{
    var userID = twitterElement.find('div').first().attr('data-user-id');
    return {userID: userID};
}

/*
    Runs the process of injecting whodis logo on the given tweet if it has a note.
*/
function RunInjection(twitterElement)
{
    if ($.inArray(ParseTweet(twitterElement).userID, noteList) !== -1) //Item is confirmed to exist in notes already
    {
        //Do something
        twitterElement.find('.fullname').first().append('TEST');
        return;
    }
}
