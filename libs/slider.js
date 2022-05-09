$(document).ready(function() {
    $('.slider').slick({
        adaptiveHeight: true,
        speed: 450,
        autoplay: true,
        autoplaySpeed: 4000,
        prevArrow: ".arrow-left",
        nextArrow: ".arrow-right",
    })
})

/* 
prevArrow
string (html|jQuery selector) | object (DOM node|jQuery object)
<button type="button" class="slick-prev">Previous</button>
Allows you to select a node or customize the HTML for the "Previous" arrow.
nextArrow
string (html|jQuery selector) | object (DOM node|jQuery object)
<button type="button" class="slick-next">Next</button>
Allows you to select a node or customize the HTML for the "Next" arrow. */

