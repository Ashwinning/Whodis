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
    Initialized the Mutation Observer (listeners) to report changes to the DOM.
*/
function InitializeMutationObserver()
{
    var target = document.body;
    var config = {
        attributes: false,
        childList: true,
        subtree: true
    };
    var observer = new MutationObserver(function(mutations)
    {
        mutations.forEach(function(mutation)
        {
            if (mutation.addedNodes && mutation.addedNodes.length > 0)
            {
            // element added to DOM
                mutation.addedNodes.forEach(function(node)
                {
                    if (typeof node != 'undefined' && node.classList.contains('stream-item'))
                    {
                        node.setAttribute("style", "background:blue");
                    }
                    else //check if one of the child classes contains 'stream-item'
                    {
                        var listsInNode = $(node).find('li');
                        //If there are 1 or more lists in this node (incl. parent)
                        if (listsInNode.length != 0)
                        {
                            //If any of the lists contain the 'stream-item' class
                            listsInNode.each(function(index, liElement)
                            {
                                if (typeof liElement != 'undefined' && liElement.classList.contains('stream-item'))
                                {
                                    liElement.setAttribute("style", "background:blue");
                                }
                            });
                        }
                    }
                });

            }
	    });
    });
    observer.observe(target, config);
}


/*
Initializes a MutationObserver for the `#profile_popup` element.
*/
function OldMutationObserver()
{
    //Mutation Observer for profile-hover-containers
    var hoverContainerTarget = $('#profile-hover-container')[0]; //A jQuery object is an array-like wrapper around one or more DOM elements. To get a reference to the actual DOM element (instead of the jQuery object), access the corresponding array element.

    var hoverContainerConfig = {
      attributes: true,
      childList: false,
      subtree: false
    };

    var hoverContainerObserver = new MutationObserver(debounce(function()
    {
        console.log('debounced');
        InjectWhoDisDiv();
    }, 1000));

    hoverContainerObserver.observe(hoverContainerTarget, hoverContainerConfig);

    //Mutation observer for individual tweets
    var tweetListTarget = $('#stream-items-id')[0];

    var tweetListConfig = {
        attributes: false,
        childList: true,
        subtree: false
    };

    var tweetListObserver = new MutationObserver(function(mutations)
    {
        mutations.forEach(function(mutation)
        {
		    console.log(mutation);
        });
    });

    tweetListObserver.observe(tweetListTarget, tweetListConfig);

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
