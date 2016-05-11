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
    var target = $('#profile_popup')[0]; //A jQuery object is an array-like wrapper around one or more DOM elements. To get a reference to the actual DOM elements (instead of the jQuery object), get the first object.

    var config = {
      attributes: true,
      childList: false,
      characterData: false
    };

    var observer = new MutationObserver(function(mutations) 
    {
        //Call function
    });

    observer.observe(target, config);
}