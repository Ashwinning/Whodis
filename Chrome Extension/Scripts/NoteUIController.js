/*
    Everything note UI related.
*/


/*
    Returns the HTML to be injected
*/
function GetInjection(twitterID)
{
    console.log('Getting injection FOR : ' + twitterID);
    var note = GetNote(twitterID);
    var textValue;
    if (note === undefined)
    {
        textValue = "Add a note!";
    }
    else
    {
        textValue = note;
    }
    console.log ('Injecting note \ntextValue = ' + textValue);
    var noteTextAreaTemplate = '<form><input type="hidden" name="hiddenField" /></form><pre><p class="whodis-note">' + textValue + '</p></pre>';
    return noteTextAreaTemplate;
}
