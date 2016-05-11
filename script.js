$(document).ready(function()
{   
    ready('#profile_popup', function(element)
    {
        InjectWhoDisDiv();
    });  
});

function InjectWhoDisDiv()
{
    $('.profile-card').append('<span class="spinner-bigger"></span>');
}
