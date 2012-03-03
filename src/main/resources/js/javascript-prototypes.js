String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

// Only add setZeroTimeout to the window object, and hide everything
// else in a closure.
(function() {
    var timeouts = [];
    var messageName = "zero-timeout-message";

    // Like setTimeout, but only takes a function argument.  There's
    // no time argument (always zero) and no arguments (you have to
    // use a closure).
    function setZeroTimeout(fn) {
        timeouts.push(fn);
        window.postMessage(messageName, "*");
    }

    function handleMessage(event) {
        if (event.source == window && event.data == messageName) {
            event.stopPropagation();
            if (timeouts.length > 0) {
                var fn = timeouts.shift();
                fn();
            }
        }
    }

    window.addEventListener("message", handleMessage, true);

    // Add the one thing we want added to the window object.
    window.setZeroTimeout = setZeroTimeout;
})();
	
// error handling
window.onerror = function(msg, url, linenumber) {
	var error = document.createAttribute("javaScriptErrorMessage");
	error.nodeValue = msg + "\n  at line number " + linenumber + " (URL: " + url + ")";
	document.getElementsByTagName("body")[0].setAttributeNode(error);
}