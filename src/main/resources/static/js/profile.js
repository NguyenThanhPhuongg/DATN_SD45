document.addEventListener("DOMContentLoaded", function () {
    var toggles = document.querySelectorAll(".toggle-submenu");

    toggles.forEach(function (toggle) {
        toggle.addEventListener("click", function (e) {
            e.preventDefault();
            var parentLi = this.parentElement;

            // Close other sub-menus
            toggles.forEach(function (otherToggle) {
                if (otherToggle !== toggle) {
                    var otherParentLi = otherToggle.parentElement;
                    otherParentLi.classList.remove("show");
                    var otherSubmenu = otherParentLi.querySelector(".sub-menu");
                    if (otherSubmenu) {
                        otherSubmenu.style.display = "none";
                    }
                }
            });

            // Toggle show class for the clicked menu item
            parentLi.classList.toggle("show");

            // Toggle sub-menu visibility
            var submenu = parentLi.querySelector(".sub-menu");
            if (submenu) {
                submenu.style.display = submenu.style.display === "block" ? "none" : "block";
            }
        });
    });
});
