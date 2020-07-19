# filemakerwrapper.js

The filemakerwrapper.js extends the FileMaker.PerformScript with a number of functionalities:

1. When a call to FileMaker is done from the web viewer , the filemakerwrapper checks if the FileMaker JavaScript object is already loaded - it is unavailable for a very short time after the page intially loads. This avoids having a call to FileMaker fail after page load.

2. The filemakerwrapper also performs all FileMaker script call through the module script "_fmBridgit.webhook", which returns results from the called FileMaker scripts back to the JavaScript function that made the FileMaker script call.

2. The filemakerwrapper talks back to FileMaker through the fmBridgit module using the  _fmBridgit.returnResult script. This allows someone in FileMaker to call a script in the web viewer and have a result returned, something which is not possible with the standard "Perform Script in Web Viewer" script step.
