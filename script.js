$(document).ready(function()
{   
    InitializeMutationObserver();
});

function InjectWhoDisDiv()
{
    //console.log($('#profile_popup').data());
    //$('.profile-card').append('<span class="spinner-bigger"></span>');
    $('.profile-card').append($('#profile_popup').attr('data-screen-name'));

}

