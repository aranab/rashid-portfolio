var lib = (function() {
    var mMenu = function(close) {
        var dom = document.getElementById("mb-nav-container");
        if (close === true) {
            dom.style.display = "none";
            return;
        }
        if (dom.style.display === "block") {
            dom.style.display = "none";
        } else {
            dom.style.display = "block";
        }
    };
    return {
        mobileMenu: mMenu
    };
})();

module.exports = lib;