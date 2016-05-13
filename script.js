$(document).ready(function()
{   
    InitializeMutationObserver();
});

function InjectWhoDisDiv()
{
    //console.log($('#profile_popup').data());
    //$('.profile-card').append('<span class="spinner-bigger"></span>');
    //$('.profile-card').append($('#profile_popup').attr('data-screen-name'));
    $('.profile-card').append(addNoteForm);

}

$('#add-note-button').click(AddNote());

function AddNote()
{
    //ADD JSONP CALLBACK TO REQUEST TO CIRCUMVENT CROSS-ORIGIN SHIT
    
    //upload text from box   
    $.ajax
    ({
        type: "POST",
        url: 'http://api.whodis.xyz/note/add',
        dataType: 'json',
        data: JSON.stringify('{"note": "' +  $('#add-note-text-input').val() + '", "user_id" : "' + $('#profile_popup').attr('data-user-id') + '"}')
    })
    //clear form
}

var addNoteForm = '<div style="margin-bottom:3px;"><center><input type="text" id="add-note-text-input"><button id="add-note-button" style="background-color:#4099FF;text:#fff;">Add</button></center></div>';


