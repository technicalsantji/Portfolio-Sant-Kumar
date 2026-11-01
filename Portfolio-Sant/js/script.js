
/* =========================================================
   PORTFOLIO JAVASCRIPT
   TechnicalSantji
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeLoader();

    initializeNavbar();

    initializeDarkMode();

    initializeScrollSpy();

    initializeSwiper();

    initializeScrollAnimations();

    initializeContactForm();

    initializeSmoothScroll();

});


/* =========================================================
   PAGE LOADER
========================================================= */

function initializeLoader() {

    const loader =
        document.querySelector(".page-loader");

    if (!loader) {
        return;
    }

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 500);

    });

}


/* =========================================================
   NAVBAR
========================================================= */

function initializeNavbar() {

    const menuIcon =
        document.querySelector("#menu-icon");

    const menuIconElement =
        menuIcon?.querySelector("i");

    const navbar =
        document.querySelector(".navbar");

    if (!menuIcon || !navbar) {
        return;
    }


    menuIcon.addEventListener("click", () => {

        const isOpen =
            navbar.classList.toggle("active");

        menuIcon.classList.toggle(
            "active",
            isOpen
        );


        if (menuIconElement) {

            menuIconElement.classList.toggle(
                "bx-menu",
                !isOpen
            );

            menuIconElement.classList.toggle(
                "bx-x",
                isOpen
            );

        }


        menuIcon.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    /* Close menu after navigation */

    const navLinks =
        navbar.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMobileMenu(
                navbar,
                menuIcon,
                menuIconElement
            );

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener(
        "click",
        event => {

            const clickedInsideMenu =
                navbar.contains(event.target);

            const clickedMenuButton =
                menuIcon.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedMenuButton &&
                navbar.classList.contains("active")
            ) {

                closeMobileMenu(
                    navbar,
                    menuIcon,
                    menuIconElement
                );

            }

        }
    );


    /* Close menu with Escape */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navbar.classList.contains("active")
            ) {

                closeMobileMenu(
                    navbar,
                    menuIcon,
                    menuIconElement
                );

            }

        }
    );


    /* Close menu when resizing */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 768) {

                closeMobileMenu(
                    navbar,
                    menuIcon,
                    menuIconElement
                );

            }

        }
    );

}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

function closeMobileMenu(
    navbar,
    menuIcon,
    menuIconElement
) {

    navbar.classList.remove("active");

    menuIcon.classList.remove("active");

    menuIcon.setAttribute(
        "aria-expanded",
        "false"
    );


    if (menuIconElement) {

        menuIconElement.classList.remove(
            "bx-x"
        );

        menuIconElement.classList.add(
            "bx-menu"
        );

    }

}


/* =========================================================
   STICKY HEADER
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        const header =
            document.querySelector(".header");

        if (!header) {
            return;
        }

        header.classList.toggle(
            "sticky",
            window.scrollY > 40
        );

    },
    {
        passive: true
    }
);


/* =========================================================
   SCROLL SPY
========================================================= */

function initializeScrollSpy() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".navbar a"
        );

    if (!sections.length || !navLinks.length) {
        return;
    }


    const updateActiveLink = () => {

        const scrollPosition =
            window.scrollY +
            window.innerHeight * 0.35;


        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveLink,
        {
            passive: true
        }
    );


    updateActiveLink();

}


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

function initializeDarkMode() {

    const darkModeButton =
        document.querySelector(
            "#darkMode-icon"
        );

    const icon =
        darkModeButton?.querySelector("i");


    if (!darkModeButton) {
        return;
    }


    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

        updateThemeIcon(icon, true);

    }


    darkModeButton.addEventListener(
        "click",
        () => {

            const isDark =
                document.body.classList.toggle(
                    "dark-mode"
                );


            localStorage.setItem(
                "portfolio-theme",
                isDark ? "dark" : "light"
            );


            updateThemeIcon(
                icon,
                isDark
            );

        }
    );

}


/* =========================================================
   THEME ICON
========================================================= */

function updateThemeIcon(
    icon,
    isDark
) {

    if (!icon) {
        return;
    }


    icon.classList.toggle(
        "bx-moon",
        !isDark
    );

    icon.classList.toggle(
        "bx-sun",
        isDark
    );

}


/* =========================================================
   SWIPER
========================================================= */

function initializeSwiper() {

    if (
        typeof Swiper ===
        "undefined"
    ) {
        return;
    }


    const swiperElement =
        document.querySelector(
            ".mySwiper"
        );


    if (!swiperElement) {
        return;
    }


    new Swiper(
        ".mySwiper",
        {

            slidesPerView: 1,

            spaceBetween: 25,

            loop: true,

            grabCursor: true,

            speed: 800,

            autoplay: {

                delay: 4500,

                disableOnInteraction: false

            },

            pagination: {

                el: ".swiper-pagination",

                clickable: true

            },

            navigation: {

                nextEl:
                    ".swiper-button-next",

                prevEl:
                    ".swiper-button-prev"

            },

            effect: "slide",

            keyboard: {

                enabled: true

            },

            breakpoints: {

                768: {

                    slidesPerView: 1

                }

            }

        }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initializeScrollAnimations() {

    /*
     * Use ScrollReveal when available.
     */

    if (
        typeof ScrollReveal !==
        "undefined"
    ) {

        const reveal =
            ScrollReveal({

                distance: "60px",

                duration: 1000,

                delay: 100,

                easing:
                    "cubic-bezier(0.2, 0.8, 0.2, 1)",

                reset: false

            });


        reveal.reveal(
            ".home-content",
            {
                origin: "left"
            }
        );


        reveal.reveal(
            ".home-visual",
            {
                origin: "right",
                delay: 250
            }
        );


        reveal.reveal(
            ".section-heading",
            {
                origin: "top"
            }
        );


        reveal.reveal(
            ".service-box",
            {
                origin: "bottom",
                interval: 100
            }
        );


        reveal.reveal(
            ".portfolio-box",
            {
                origin: "bottom",
                interval: 100
            }
        );


        reveal.reveal(
            ".contact-form",
            {
                origin: "right"
            }
        );


        reveal.reveal(
            ".contact-info",
            {
                origin: "left"
            }
        );

    }


    /*
     * Custom IntersectionObserver
     * for elements using reveal-left,
     * reveal-right and reveal-up.
     */

    const revealElements =
        document.querySelectorAll(
            ".reveal-left, .reveal-right, .reveal-up"
        );


    if (!revealElements.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {

                threshold: 0.15

            }
        );


    revealElements.forEach(
        element => {

            observer.observe(element);

        }
    );

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initializeContactForm() {

    const form =
        document.querySelector(
            "#contactForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const submitButton =
                form.querySelector(
                    ".submit-btn"
                );


            const requiredFields =
                form.querySelectorAll(
                    "[required]"
                );


            let isValid = true;


            /* Validate required fields */

            requiredFields.forEach(
                field => {

                    const value =
                        field.value.trim();


                    if (!value) {

                        isValid = false;

                        field.classList.add(
                            "input-error"
                        );

                    } else {

                        field.classList.remove(
                            "input-error"
                        );

                    }

                }
            );


            /* Validate email */

            const email =
                form.querySelector(
                    "#email"
                );


            if (
                email &&
                email.value.trim() &&
                !isValidEmail(
                    email.value.trim()
                )
            ) {

                isValid = false;

                email.classList.add(
                    "input-error"
                );

            }


            if (!isValid) {

                showAlert(
                    "error",
                    "Please check your form",
                    "Please fill in all required fields correctly."
                );

                return;

            }


            /* Loading state */

            const originalButtonHTML =
                submitButton
                    ? submitButton.innerHTML
                    : "";


            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.innerHTML = `
                    <i class="bx bx-loader-alt bx-spin"></i>
                    <span>Sending...</span>
                `;

            }


            try {

                const formData =
                    new FormData(form);


                const response =
                    await fetch(
                        form.action,
                        {

                            method: "POST",

                            body: formData,

                            headers: {

                                Accept:
                                    "application/json"

                            }

                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "Form submission failed"
                    );

                }


                form.reset();


                showAlert(
                    "success",
                    "Message Sent!",
                    "Thank you for contacting me. I will get back to you soon."
                );


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                showAlert(
                    "error",
                    "Something went wrong",
                    "Your message could not be sent. Please try again."
                );


            } finally {

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML =
                        originalButtonHTML;

                }

            }

        }
    );


    /* Remove error when user starts typing */

    form.querySelectorAll(
        "input, textarea"
    ).forEach(field => {

        field.addEventListener(
            "input",
            () => {

                field.classList.remove(
                    "input-error"
                );

            }
        );

    });

}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}


/* =========================================================
   SWEET ALERT
========================================================= */

function showAlert(
    icon,
    title,
    text
) {

    if (
        typeof Swal ===
        "undefined"
    ) {

        alert(
            `${title}\n\n${text}`
        );

        return;

    }


    Swal.fire({

        icon,

        title,

        text,

        confirmButtonText:
            "Okay",

        confirmButtonColor:
            "#6c4df6",

        background:
            document.body.classList.contains(
                "dark-mode"
            )
                ? "#111426"
                : "#ffffff",

        color:
            document.body.classList.contains(
                "dark-mode"
            )
                ? "#ffffff"
                : "#172033",

        showClass: {

            popup:
                "animate__animated animate__fadeInDown"

        },

        hideClass: {

            popup:
                "animate__animated animate__fadeOutUp"

        }

    });

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function initializeSmoothScroll() {

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    const header =
                        document.querySelector(
                            ".header"
                        );


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        });

}


/* =========================================================
   PARALLAX EFFECT
========================================================= */

const homeVisual =
    document.querySelector(
        ".home-visual"
    );


if (
    homeVisual &&
    window.matchMedia(
        "(min-width: 992px)"
    ).matches &&
    !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {

    window.addEventListener(
        "mousemove",
        event => {

            const x =
                (window.innerWidth / 2 -
                    event.clientX) /
                60;

            const y =
                (window.innerHeight / 2 -
                    event.clientY) /
                60;


            homeVisual.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );

}


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c TechnicalSantji Portfolio ",
    "background:#6c4df6;color:white;padding:8px 14px;border-radius:6px;font-weight:bold;"
);

console.log(
    "Java Full Stack Developer | Sant Kumar"
);
