$(document).ready(function()
{   
    InitializeMutationObserver();    
});

function InjectWhoDisDiv()
{
    //Add functionality
}

function InitializeMutationObserver()
{
    //Mutation Observer
    var target = $('#profile_popup');

    var config = {
      attributes: true,
      childList: false,
      characterData: false
    };

    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        console.log(mutation.type);
      });
    });

    observer.observe(target, config);
}