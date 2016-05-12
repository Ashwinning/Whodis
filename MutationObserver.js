/*
The ready function accepts a selector string as the first argument and the callback function as the second. Once ready, the callback is invoked, passing the element as the only parameter:

ready('.foo', function(element){
    // do something
});

http://ryanmorr.com/using-mutation-observers-to-watch-for-element-availability/
*/
/*
(function(win){
    'use strict';
    
    var listeners = [], 
    doc = win.document, 
    MutationObserver = win.MutationObserver || win.WebKitMutationObserver,
    observer;
    
    function ready(selector, fn){
        // Store the selector and callback to be monitored
        listeners.push({
            selector: selector,
            fn: fn
        });
        if(!observer){
            // Watch for changes in the document
            observer = new MutationObserver(check);
            observer.observe(doc.documentElement, {
                childList: true,
                subtree: true,
                attributes: true
            });
        }
        // Check if the element is currently in the DOM
        check();
    }
        
    function check(){
        // Check the DOM for elements matching a stored selector
        for(var i = 0, len = listeners.length, listener, elements; i < len; i++){
            listener = listeners[i];
            // Query for elements matching the specified selector
            elements = doc.querySelectorAll(listener.selector);
            for(var j = 0, jLen = elements.length, element; j < jLen; j++){
                element = elements[j];
                // Make sure the callback isn't invoked with the 
                // same element more than once
                if(!element.ready){
                    element.ready = true;
                    // Invoke the callback with the element
                    listener.fn.call(element, element);
                }
            }
        }
    }

    // Expose `ready`
    win.ready = ready;
            
})(this);
*/

/*
Initializes a MutationObserver for the `#profile_popup` element.
*/
function InitializeMutationObserver()
{
    //Mutation Observer
    var target = $('#profile_popup')[0]; //A jQuery object is an array-like wrapper around one or more DOM elements. To get a reference to the actual DOM element (instead of the jQuery object), access the corresponding array element.

    var config = {
      attributes: true,
      childList: false,
      subtree: false
    };

    var observer = new MutationObserver(debounce(function()
    {
        console.log('debounced');
        InjectWhoDisDiv();
    }, 1000));

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
