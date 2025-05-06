(function () {
    // Run when DOM is ready
    document.addEventListener("DOMContentLoaded", initNavbar);

    function initNavbar() {

        // Mega menu and navbar logic (runs for all users)
        let navLinks = document.querySelectorAll(".scisp-navbar .nav-link[data-target]");
        let menuToggleContent = document.querySelector(".scisp-navbar .navbar-collapse");
        const overlay = document.getElementById('overlay');
        let body = document.body;
        let activeMenu = null;
        let firstInteraction = true;

        const toggler = document.querySelector(".scisp-navbar .navbar-toggler");
        const menu = document.querySelector("#navbarNavDropdown");

        if (toggler && menu) {
            toggler.addEventListener("click", function (e) {
                e.stopPropagation();
                menu.classList.toggle("show");

                if (menu.classList.contains("show")) {
                    body.classList.add("no-scroll");
                } else {
                    body.classList.remove("no-scroll");
                }
            });

            document.addEventListener("click", function (e) {
                const clickedInside = menu.contains(e.target) || toggler.contains(e.target);
                if (!clickedInside) {
                    menu.classList.remove("show");
                    body.classList.remove("no-scroll");
                }
            });
        }

        let searchOnMobile = document.querySelector("#searchOnMobile");
        if (searchOnMobile && menuToggleContent) {
            searchOnMobile.addEventListener("click", function () {
                if (menuToggleContent.classList.contains("show")) {
                    menuToggleContent.classList.remove("show");
                }
            });
        }

        navLinks.forEach(function (link) {
            link.addEventListener("click", function (event) {
                event.preventDefault();

                let targetMenu = document.querySelector(this.getAttribute("data-target"));
                if (!targetMenu) return;

                if (firstInteraction) {
                    enableTransition();
                    firstInteraction = false;
                }

                if (activeMenu === targetMenu) {
                    closeMenu(targetMenu);
                    this.classList.remove("active");
                    activeMenu = null;
                } else {
                    if (activeMenu) {
                        closeMenu(activeMenu);
                        let activeLink = document.querySelector(".scisp-navbar .nav-link.active");
                        if (activeLink) activeLink.classList.remove("active");
                    }
                    openMenu(targetMenu);
                    this.classList.add("active");
                    activeMenu = targetMenu;
                }
            });
        });

        document.addEventListener("click", function (event) {
            if (
                activeMenu &&
                !activeMenu.contains(event.target) &&
                !event.target.matches(".nav-link")
            ) {
                closeMenu(activeMenu);
                let activeLink = document.querySelector(".scisp-navbar .nav-link.active");
                if (activeLink) activeLink.classList.remove("active");
                activeMenu = null;
            }
        });

        function enableTransition() {
            document.querySelectorAll(".mega-menu-content").forEach(function (menu) {
                menu.classList.add("transition-enabled");
            });
        }

        function openMenu(menu) {
            menu.classList.add("active");
            if (overlay) overlay.style.display = 'flex';
            body.classList.add("no-scroll");
            menu.style.height = menu.scrollHeight + "px";
            menu.style.opacity = 1;
        }

        function closeMenu(menu) {
            menu.style.height = menu.scrollHeight + "px";
            menu.style.opacity = 0;
            if (overlay) overlay.style.display = 'none';
            body.classList.remove("no-scroll");
            requestAnimationFrame(() => {
                menu.style.height = "0";
            });

            menu.addEventListener(
                "transitionend",
                function () {
                    menu.classList.remove("active");
                },
                { once: true }
            );
        }
    }
    const swiper = new Swiper(".hero-swiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true,
        },
    });
})();
// role swiper
var swiper = new Swiper(".spcisp-role-slider", {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 10,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        576: {
            slidesPerView: 1.6,
            spaceBetween: 24,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 24,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 24,
        },
    },
});

console.log('branch21');

console.log('branch name : sayed')