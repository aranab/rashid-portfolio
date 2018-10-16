var numberRolling = (function($) {

    var process = {        
        start: false,
        finished: false
    };

    var processing = function() {
        if ( process.finished ) {
            return;
        }
        if ( process.start ) {
            return;
        }
        run();
    };

    var run = function() {  
        process.start = true;
        $('.statistics h2').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 4000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
        process.finished = true;
    };

    return {       
        run: processing
    };
})(jQuery);

module.exports = numberRolling;