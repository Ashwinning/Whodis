$(document).ready(function()
{   
    InitializeMutationObserver();
});

function InjectWhoDisDiv()
{
    console.log('Injecting');
    $('.profile-card').append('<span class="spinner-bigger"></span>');
}

