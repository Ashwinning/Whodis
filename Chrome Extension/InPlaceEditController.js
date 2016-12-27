/*
    Everything related to in place editing
*/

/*
    HTML to replace the in place edit text with
*/
var replaceWith = $('<textarea class="whodis-textarea" style="max-height: 300px"></textarea>'),
    connectWith = $('input[name="hiddenField"]');

/*
    To be run after every time a note/form is injected
*/
function MakeInlineEditable()
{
    $('.whodis-note').inlineEdit(replaceWith, connectWith);
}

/*
    The Inline Edit class from http://www.egstudio.biz/tiny-inline-edit-plugin-for-jquery/
*/
$.fn.inlineEdit = function(replaceWith, connectWith)
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
        replaceWith.focus();
        autosize(document.querySelectorAll('textarea'));
        replaceWith.blur(function()
        {
            if ($(this).val() != "")
            {
                connectWith.val($(this).val()).change();
                elem.text($(this).val());
            }

            $(this).remove();
            elem.show();
            //alert(elem.text()); //Call function here
        });
    });
};
