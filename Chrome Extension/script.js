$(document).ready(function()
{
    InitializeMutationObserver();
    
    //Get active user


});

function InjectWhoDisDiv()
{
    //console.log($('#profile_popup').data());
    //$('.profile-card').append('<span class="spinner-bigger"></span>');
    //$('.profile-card').append($('#profile_popup').attr('data-screen-name'));
    $('.profile-card').append(addNoteForm);

    $('#add-note-button').click(function(){
        console.log('Add');
        //upload text from box
        $.ajax
        ({
            type: "POST",
            url: 'https://api.whodis.xyz/note/add',
            dataType: 'json',
            data: JSON.stringify('{"note": "' +  $('#add-note-text-input').val() + '", "user_id" : "' + $('#profile_popup').attr('data-user-id') + '"}'),
            error: function(data)
            {
                console.log(data);

                //open a new window note:this is a popup so it may be blocked by your browser
                var newWindow = window.open("", "new window", "width=200, height=100");

                //write the data to the document of the newWindow
                newWindow.document.write(data.responseText);

            }
        })

        //clear form
    });
}



function AddNote()
{

}

var addNoteForm = '<div style="margin-bottom:3px;"><center><input type="text" id="add-note-text-input"><button id="add-note-button" style="background-color:#4099FF;text:#fff;">Add</button></center></div>';
