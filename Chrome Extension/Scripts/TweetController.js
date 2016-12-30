/*
    Takes in all the tweets that are shown on the page.
    Parses them for data, and injects desired stuff.
*/

//Holds the tweet elements to be processed
var tweetQueue = [];

// Can you start parsing tweets and inject icon yet?
var canParse = false;

/*
    Adds a tweet, or string of tweets to the tweet queue, and triggers the processing.
    Params:
    twitterElements  : Single or Array of twitter elements.
*/
function Firehose(twitterElements)
{
    twitterElements.each(function(index, twitterElement)
    {
        if (typeof twitterElements == undefined)
        {
            //Don't add
            return;
        }
        tweetQueue.push(twitterElement);
        console.log ('Adding a tweet, Queue length is ' + tweetQueue.length);
        console.log(twitterElement);
        if(canParse)
        {
            StartParsing();
        }
    });
}

function StartParsing()
{
    canParse = true;
    console.log('Starting tweet parsing.');
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
    //Mine data
    var userID = $(twitterElement).find('div').first().attr('data-user-id');
    console.log('Parsed : ' + userID);
    //Remove from array
    RemoveFromArray(twitterElement, tweetQueue);
    return {userID: userID};
}

/*
    Runs the process of injecting whodis logo on the given tweet if it has a note.
*/
function RunInjection(twitterElement)
{
    if ($(twitterElement).attr('data-whodis-exists') == 'true')
    {
        //Don't inject, return
        return;
    }

    var thisTweetUserID = ParseTweet(twitterElement).userID;
    //console.log('This tweet ID : ' + thisTweetUserID);
    //$(twitterElement).css('background-color', 'grey');
    if (typeof thisTweetUserID !== undefined && $.inArray(thisTweetUserID, noteList) !== -1) //Item is confirmed to exist in notes already
    {
        //Add our icon
        $(twitterElement).find('.fullname').first().append('<img class="whodis-icon-16" src='+chrome.extension.getURL("/Images/whodis-icon-16.png")+'>');
        $(twitterElement).attr('data-whodis-exists', 'true');
        return;
    }
}

/*
    Removes the first matching element in the array
    Params:
    element : The element to be matched
    arr : The array this element is to be removed from.
*/
function RemoveFromArray(element, arr)
{
    var index = arr.indexOf(element);
    if (index >= 0)
    {
        arr.splice( index, 1 );
    }
}
