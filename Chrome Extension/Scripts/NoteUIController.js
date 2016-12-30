/*
    Everything note UI related.
*/


var emptyNotePrompt = "➕ Add a note!";

/*
    Returns the HTML to be injected
*/
function GetInjection(twitterID, callback)
{
    console.log('Getting injection FOR : ' + twitterID);
    GetNote(twitterID, function(response)
    {
        console.log('NoteUI GetNote response : ' + response);
        var textValue;
        if (response === undefined || response == null)
        {
            textValue = emptyNotePrompt;
        }
        else
        {
            textValue = response;
        }
        console.log ('Injecting note \ntextValue = ' + textValue);
        callback(WhodisTemplate(NoteTextTemplate(textValue)));
    });

}

/*
    Inner template which makes the note in-place-replaceable.
*/
function NoteTextTemplate(textToBeInserted)
{
    return '<form><input type="hidden" name="hiddenField" /></form><pre><p class="whodis-note">' + textToBeInserted + '</p></pre>';
}

/*
    The outer template which controls the appearance/theme of the whodis widget
*/
function WhodisTemplate(textToBeInserted)
{
    var borderColorForNoteWrapper = $('.tweet-btn').css("background-color");
    //console.log("background-color is " + borderColorForNoteWrapper);
    return '<div class="whodis-holder"><img src="'+ chrome.extension.getURL("/Images/whodis-tiny-logo.png") +'"><div class="note-wrapper" style="border-color:'+ borderColorForNoteWrapper +'">'+ textToBeInserted +'</div></div>';
}


/*
    THE PUBLIC FUNCTION OF THIS API
    Injects the actual widget. (incl. loader)
    Params:
    `injectInto`: a class, id etc. which the widget is appended to
    `twitterID` : the Twitter UID to inject the note for.
*/
function InjectWidget(injectInto, twitterID)
{
    var loader = '<div id="whodis-loading-spinner"><center><img src="https://abs.twimg.com/a/1482872295/img/t1/spinner-rosetta-blue-26x26.gif"></center></div>';
    profileCardObject.find(injectInto).append(loader);
    //Use the GetInjection callback
    GetInjection(dataUserId, function(response)
    {
        //Remove spinner
        $('#whodis-loading-spinner').remove();
        //Add the WhoDis HTML
        profileCardObject.find(injectInto).append(response);
        MakeInlineEditable(twitterID);
    });
}
