// ==UserScript==
// @name         share point script
// @namespace    https://github.com/YatsushiroMasato/TamperScript
// @version      0.1
// @description  利便性向上させちゃう
// @match        https://medibasys.sharepoint.com/org/syslog/Lists/Posts/EditPost.aspx?*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @author       Yatsushiro
// @grant        none
// ==/UserScript==

(function($) {
  $('.ms-formtable .ms-formbody').css({
    'width': '100%'
  });
  $('.ms-rtestate-field ms-rtefield ms-inputBox').css({
    'width': '100%'
  });
})(jQuery.noConflict(true));
