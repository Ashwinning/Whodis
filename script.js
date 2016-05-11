$(document).ready(function()
{   
    InitializeMutationObserver();    
});

function InjectWhoDisDiv()
{
    $('.profile-card').append('<span class="spinner-bigger"></span>');
}

function InitializeMutationObserver()
{
    //Mutation Observer
    var target = $('#profile_popup')[0]; //A jQuery object is an array-like wrapper around one or more DOM elements. To get a reference to the actual DOM elements (instead of the jQuery object), get the first object.

    var config = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    };

    var observer = new MutationObserver(debounce(InjectWhoDisDiv(), 100));

    observer.observe(target, config);
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};