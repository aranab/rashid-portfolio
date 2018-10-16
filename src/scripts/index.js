require('core-js/fn/set');
require('core-js/fn/array/from');
require('core-js/fn/array/find');
require('core-js/fn/array/includes');
require('core-js/fn/object/assign');
window.jQuery = require('jquery');
var lib = require('./lib');
var numberRolling = require('./numberRolling');
var skillAnimation = require('./skillAnimation');
var owlCarousel = require('owl.carousel');
var portfolio = require('./portfolio');
require('lity');

(function ($) {
    $(document).ready(function () {  

        $(this).on("scroll", function() {
            if ( lib.mobileNavClose === false ) {
                lib.mobileMenu(true);
            }

            if ( $('.statistics').length > 0 ) {
                if ( $(this).scrollTop() >= ($('#aboutWorks').position().top - 500) ) {
                    numberRolling.run();
                }
            }
            if ( $('.skill').length > 0 ) {
                if ( $(this).scrollTop() >= ($('#skills').position().top - 500) ) {
                    skillAnimation.run();
                }
            }
        });

        $('.btn-mobile-nav').click(function () {            
            lib.mobileMenu();
        });

        $('.btn-close').click(function () {
            lib.mobileMenu(true);
        });

        $('a[href^="#"]').on('click', function (e) {       
            if (this.hash !== "") {
                e.preventDefault();
                if ( lib.mobileNavClose === false )  {
                    lib.mobileMenu(true);    
                }                   
                var target = $(this.hash);
                $('html, body').stop().animate({
                    'scrollTop': (target.offset().top - 80)
                }, 1000);
            }
        });

        window.portfolio = new portfolio.init(); 

        $('.client-slider').owlCarousel({
            loop:true,
            margin: 30,
            nav: false,
            dots: true,
            autoplay: true,
            smartSpeed: 500,
            autoplayHoverPause: true,
            responsive:{
                0:{
                    items:1
                },
                768:{
                    items:2
                },
                1040:{
                    items:3
                }
            }
        });

        $('.photo-slider').owlCarousel({            
            items: 1,
            animateOut: 'fadeOut',
            loop: true,
            margin: 10,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayHoverPause: true,
            smartSpeed: 450
        });
    });
})(
    jQuery,
    owlCarousel
);