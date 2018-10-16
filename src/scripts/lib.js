var lib = (function() {    

    var mobileNavClose = true;

    var HasClass = function (el, className) {
        return new RegExp(' ' + className + ' ').test(' ' + el.className + ' ');
    };

    var mMenu = function(close) {
        var dom = document.getElementById("mb-menu");
        if (close === true) {
            this.mobileNavClose = true;          
            dom.classList.remove('open');
            return;
        }
        if (HasClass(dom, 'open')) {   
            this.mobileNavClose = true;
            dom.classList.remove('open');
        } else {
            this.mobileNavClose = false;
            dom.classList.add('open');
        }
    };

    return {
        mobileMenu: mMenu,
        mobileNavClose: mobileNavClose
    };
})();

module.exports = lib;