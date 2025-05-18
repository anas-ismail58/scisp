(function () {
    window.addEventListener("scroll", function () {
        const header = document.querySelector(".scisp-nav");
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });


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
    const heroSwiper = new Swiper(".hero-swiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".hero-swiper-pagination",
            type: "bullets",
            clickable: true,
        },
        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true,
            hide: false,
        },
        breakpoints: {
            0: {
                scrollbar: {
                    enabled: false, // Disable scrollbar below 992px
                },
                pagination: {
                    enabled: true, // Enable pagination dots below 992px
                },
                navigation: {
                    enabled: false, // Enable pagination dots below 992px
                },
            },
            992: {
                scrollbar: {
                    enabled: true, // Enable scrollbar at 992px and above
                },
                pagination: {
                    enabled: false, // Disable pagination dots at 992px and above
                },
            },
        },
        // Accessibility settings
        a11y: {
            enabled: true,
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            paginationBulletMessage: "Go to slide {{index}}",
        },
    });
    const roleSwiper = new Swiper(".spcisp-role-slider", {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 10,
        centeredSlides: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.2,
                spaceBetween: 24,
            },
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

    // news swiper
    const newsSwiper = new Swiper(".spcisp-news-slider", {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 24,
            },
            576: {
                slidesPerView: 1,
                spaceBetween: 24,
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 24,
            },
            992: {
                slidesPerView: 1,
                spaceBetween: 24,
            },
        },
    });

    const yesForm = document.getElementById("yes-form-rating");
    const noForm = document.getElementById("no-form-rating");
    const closeYesBtn = document.getElementById("close-btn-yes-form-rating");
    const closeNoBtn = document.getElementById("close-btn-no-form-rating");

    // Show Yes Form
    document.getElementById("incrementYesRateCounter").addEventListener("click", function (event) {
        event.preventDefault();
        noForm.classList.add("d-none");
        closeNoBtn.classList.add("d-none");

        yesForm.classList.remove("d-none", "fade-out");
        void yesForm.offsetWidth;
        yesForm.classList.add("fade-in");

        closeYesBtn.classList.remove("d-none");
    });

    // Show No Form
    document.getElementById("incrementNoRateCounter").addEventListener("click", function (event) {
        event.preventDefault();
        yesForm.classList.add("d-none");
        closeYesBtn.classList.add("d-none");

        noForm.classList.remove("d-none", "fade-out");
        void noForm.offsetWidth;
        noForm.classList.add("fade-in");

        closeNoBtn.classList.remove("d-none");
    });

    // Close Yes Form with animation
    closeYesBtn.addEventListener("click", function () {
        yesForm.classList.remove("fade-in");
        yesForm.classList.add("fade-out");
        closeYesBtn.classList.add("d-none");

        yesForm.addEventListener("animationend", function handler() {
            yesForm.classList.add("d-none");
            yesForm.classList.remove("fade-out");
            yesForm.removeEventListener("animationend", handler);
        });
    });

    // Close No Form with animation
    closeNoBtn.addEventListener("click", function () {
        noForm.classList.remove("fade-in");
        noForm.classList.add("fade-out");
        closeNoBtn.classList.add("d-none");

        noForm.addEventListener("animationend", function handler() {
            noForm.classList.add("d-none");
            noForm.classList.remove("fade-out");
            noForm.removeEventListener("animationend", handler);
        });
    });
    
    // On link click
    $('.scisp-list__item-link').on('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior

        // Remove 'active' class from all links and add to the clicked one
        $('.scisp-list__item-link').removeClass('active');
        $(this).addClass('active');

        // Optional: Smooth scroll to target
        var targetId = $(this).attr('href');
        var $target = $(targetId);
        if ($target.length) {
            $('html, body').animate({
                scrollTop: $target.offset().top
            }, 500);
        }
    });

    // On scroll
    $(window).on('scroll', function () {
        var scrollPosition = $(this).scrollTop();

        $('.scisp-list__item-link').each(function () {
            var $link = $(this);
            var targetId = $link.attr('href');
            var $target = $(targetId);

            if ($target.length) {
                var targetOffset = $target.offset().top - 190;
                var targetHeight = $target.outerHeight();

                if (scrollPosition >= targetOffset && scrollPosition < targetOffset + targetHeight) {
                    // Update active link
                    $('.scisp-list__item-link').removeClass('active');
                    $link.addClass('active');

                    // Update active section
                    $('.scisp-section').removeClass('active-section');
                    $target.addClass('active-section');
                } else {
                    $target.removeClass('active-section');
                }
            }
        });
    });




    // fancy video
    Fancybox.bind('[data-fancybox="gallery"]', {
        // Your custom options for a specific gallery
    });



})();
