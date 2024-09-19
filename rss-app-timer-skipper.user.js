// ==UserScript==
// @name         RSS.app Timer Skipper
// @namespace    https://github.com/rzagreb/rss-app-timer-skipper-userscript
// @version      v0.0.1
// @description  Bypasses timers on RSS.app, redirecting immediately to content
// @author       Roman Zagrebnev
// @match        https://rss.app/articles/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rss.app
// @grant        none
// @updateURL    https://github.com/rzagreb/rss-app-timer-skipper-userscript/raw/main/rss-app-timer-skipper.user.js
// @downloadURL  https://github.com/rzagreb/rss-app-timer-skipper-userscript/raw/main/rss-app-timer-skipper.user.js
// ==/UserScript==

(function () {
    'use strict';

    function modifyTimerScript() {
        const scripts = document.getElementsByTagName('script');

        for (let i = 0; i < scripts.length; i++) {
            let script = scripts[i];

            if (script.textContent.includes('var counter =') || script.textContent.includes('let counter =')) {

                let modifiedScriptContent = script.textContent
                    // Replace 'var counter = [number];' or 'let counter = [number];' with 'var counter = 1;'
                    // setting the counter to 1 to avoid negative values
                    .replace(/(var|let)\s+counter\s*=\s*\d+;/, 'var counter = 1;')
                    // Remove 'let interval =' declaration to avoid redeclaration error
                    .replace(/let\s+interval\s*=\s*/, 'interval = ');

                // Create a new script element with the modified content
                let newScript = document.createElement('script');
                newScript.textContent = modifiedScriptContent;

                // Replace the old script with the new one
                script.parentNode.replaceChild(newScript, script);

                break;
            }
        }
    }

    window.addEventListener('load', modifyTimerScript);

})();