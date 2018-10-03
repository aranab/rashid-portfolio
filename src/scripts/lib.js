var lib = (function() {
    var mMenu = function(close) {
        var dom = document.getElementById("mb-nav-anime");
        if (close === true) {          
            dom.style.transform = "translateX(0)";
            return;
        }
        if (dom.style.transform === "translateX(-300px)") {   
            dom.style.transform = "translateX(0)";
        } else {
            dom.style.transform = "translateX(-300px)";
        }
    };
    return {
        mobileMenu: mMenu
    };
})();

module.exports = lib;