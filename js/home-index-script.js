

"use strict";
// Page Loader
$(window).load(function () {
    $('#loader').fadeOut();
    });

/*hidden header*/
/*var headerEle = function () {
    var $headerHeight = $('header').height();
    $('.hidden-header').css({ 'height' : 110  + "px" });
};
$(window).load(function () {
    headerEle();
    });

$(window).resize(function () {
    headerEle();
});*/

/*Scroll*/
$(document).ready(function() {
    $('body').niceScroll({
        zindex: 10000,
        cursorcolor: "#424242",
        cursorwidth: "8px",
        cursorborder: "1px solid #424242",
        cursorborderradius: 0
    });  // The document page (body)
});
