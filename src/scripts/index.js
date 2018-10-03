var jQuery = require('jquery');
var lib = require('./lib');

(function ($) {
    $(document).ready(function () {        
        $('.btn-mobile-nav').click(function () {            
            lib.mobileMenu();
        });
        $('.btn-close').click(function () {
            lib.mobileMenu(true);
        });
    });
})(jQuery);