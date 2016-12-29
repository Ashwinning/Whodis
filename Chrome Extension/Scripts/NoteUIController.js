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

function NoteTextTemplate(textToBeInserted)
{
    return '<form><input type="hidden" name="hiddenField" /></form><pre><p class="whodis-note">' + textToBeInserted + '</p></pre>';
}

function WhodisTemplate(textToBeInserted)
{
    var borderColorForNoteWrapper = $('.tweet-btn').css("background-color");
    //console.log("background-color is " + borderColorForNoteWrapper);
    return '<div class="whodis-holder"><img src="'+ chrome.extension.getURL("/Images/whodis-tiny-logo.png") +'"><div class="note-wrapper" style="border-color:'+ borderColorForNoteWrapper +'">'+ textToBeInserted +'</div></div>';
}
