/*
    Everything note UI related.
*/


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
        if (response === undefined)
        {
            textValue = "Add a note!";
        }
        else
        {
            textValue = response;
        }
        console.log ('Injecting note \ntextValue = ' + textValue);
        var noteTextAreaTemplate = '<form><input type="hidden" name="hiddenField" /></form><pre><p class="whodis-note">' + textValue + '</p></pre>';
        callback(noteTextAreaTemplate);
    });

}
