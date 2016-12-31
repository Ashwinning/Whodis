/*
    Everything related to in place editing
*/

/*
    HTML to replace the in place edit text with
*/
var replaceWith = $('<textarea class="whodis-textarea" style="max-height: 300px; box-shadow:none;"></textarea>'),
    connectWith = $('input[name="hiddenField"]');

/*
    To be run after every time a note/form is injected
    Accepts a twitterID/dataUserId which uniquely identifies the user this note is being set for.
    When changes are made, they're automatically saved.
    Params:
    twitterID   : The twitterID for which this this being made editable.
    elem        : The widget (jQuery object) inside which the note has to be made editable.
*/
function MakeInlineEditable(twitterID, widget)
{
    widget.find('.whodis-note').inlineEdit(replaceWith, connectWith, twitterID);
}

/*
    The Inline Edit class from http://www.egstudio.biz/tiny-inline-edit-plugin-for-jquery/
*/
$.fn.inlineEdit = function(replaceWith, connectWith, twitterID)
{
    $(this).hover(function()
    {
        $(this).addClass('hover');
    }, function()
    {
        $(this).removeClass('hover');
    });

    $(this).click(function()
    {
        var elem = $(this);

        elem.hide();
        elem.after(replaceWith);
        if (elem.text() != emptyNotePrompt)
        {
            $('.whodis-textarea').val(elem.text());
        }
        replaceWith.focus();
        autosize(document.querySelectorAll('.whodis-textarea')); //Make textarea autosizable
        replaceWith.blur(function()
        {
            if ($(this).val() != "")
            {
                //connectWith.val($(this).val()).change();
                elem.text($(this).val());
            }
            $('.whodis-textarea').val(''); //Clear textarea
            $(this).remove();
            elem.show();
            //alert(elem.text()); //Call function here
            //Set note in database
            SetNote(twitterID, {note: elem.text()});
            //console.log("Note for " + twitterID + " was set to " + elem.text());

        });
    });
};
