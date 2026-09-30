/*  HOME PAGE JAVASCRIPT */


/*  DOM ELEMENTS*/

let navbar =
    document.querySelector(".navbar");

let heroItems =
    document.querySelectorAll(".hero-item");

let heroAnimation =
    document.querySelector(".hero-animation");

let sections =
    document.querySelectorAll(
        "section, header"
    );

let navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );

let serviceCards =
    document.querySelectorAll(
        ".service-card"
    );


/* HERO ENTRANCE ANIMATION */

window.addEventListener("load", () => {

    /* Animate Hero text */

    heroItems.forEach((item, index) => {

        setTimeout(() => {

            item.classList.add("show");

        }, 200 + index * 120);

    });


    /* Animate Lottie */

    setTimeout(() => {

        if (heroAnimation) {

            heroAnimation.classList.add("show");

        }

    }, 400);

});


/*  NAVBAR SCROLL EFFECT */

function handleNavbar() {

    if (!navbar) return;


    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    handleNavbar
);

handleNavbar();


/* SCROLL REVEAL */

let revealElements =
    document.querySelectorAll(
        ".about, .workspace, .getting-started"
    );


let revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "reveal"
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* SERVICE CARD REVEAL */

let cardObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    const cards =
                        entry.target.querySelectorAll(
                            ".service-card"
                        );


                    cards.forEach(
                        (card, index) => {

                            setTimeout(() => {

                                card.classList.add(
                                    "reveal-card"
                                );

                            }, index * 120);

                        }
                    );


                    cardObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


let serviceGrid =
    document.querySelector(
        ".service-grid"
    );


if (serviceGrid) {

    cardObserver.observe(
        serviceGrid
    );

}


/* ACTIVE NAVIGATION LINK */

let navSections = [
    {
        id: "home",
        link: document.querySelector(
            '.nav-links a[href="#home"]'
        )
    },

    {
        id: "about",
        link: document.querySelector(
            '.nav-links a[href="#about"]'
        )
    },

    {
        id: "services",
        link: document.querySelector(
            '.nav-links a[href="#services"]'
        )
    },

    {
        id: "contact",
        link: document.querySelector(
            '.nav-links a[href="#contact"]'
        )
    }
];


function updateActiveLink() {

    let scrollPosition =
        window.scrollY + 150;


    navSections.forEach(item => {

        let section =
            document.getElementById(
                item.id
            );


        if (!section || !item.link)
            return;


        let sectionTop =
            section.offsetTop;


        let sectionHeight =
            section.offsetHeight;


        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
            sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove(
                    "active"
                );

            });


            item.link.classList.add(
                "active"
            );

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveLink
);

updateActiveLink();


/*  SMOOTH NAVIGATION */

navLinks.forEach(link => {

    link.addEventListener(
        "click",
        function (event) {

            let targetId =
                this.getAttribute(
                    "href"
                );


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            let target =
                document.querySelector(
                    targetId
                );


            if (!target) return;


            event.preventDefault();


            let navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;


            let targetPosition =
                target.offsetTop -
                navbarHeight -
                25;


            window.scrollTo({

                top:
                    targetPosition,

                behavior:
                    "smooth"

            });

        }
    );

});


/*  MOBILE MENU */

let menuButton =
    document.querySelector(
        ".menu-btn"
    );


if (menuButton) {

    menuButton.addEventListener(
        "click",
        toggleMobileMenu
    );

}


function toggleMobileMenu() {

    let mobileMenu =
        document.querySelector(
            ".mobile-menu"
        );


    if (!mobileMenu) {

        mobileMenu =
            createMobileMenu();

    }


    mobileMenu.classList.toggle(
        "open"
    );

}

/*  CREATE MOBILE MENU */

function createMobileMenu() {

    let menu =
        document.createElement(
            "div"
        );


    menu.className =
        "mobile-menu";


    let links = [
        {
            text: "Home",
            href: "#home"
        },

        {
            text: "About",
            href: "#about"
        },

        {
            text: "Services",
            href: "#services"
        },

        {
            text: "Contact Us",
            href: "#contact"
        }
    ];


    links.forEach(item => {

        let link =
            document.createElement(
                "a"
            );


        link.textContent =
            item.text;


        link.href =
            item.href;


        link.addEventListener(
            "click",
            () => {

                menu.classList.remove(
                    "open"
                );

            }
        );


        menu.appendChild(
            link
        );

    });


    document.body.appendChild(
        menu
    );


    return menu;

}


/* HERO PARALLAX EFFECT */

let hero =
    document.querySelector(
        ".hero"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!hero) return;


        let scroll =
            window.scrollY;


        if (scroll <
            hero.offsetHeight
        ) {

            let background =
                hero.querySelector(
                    "::before"
                );

        }

    }
);


/* CARD TILT EFFECT */

serviceCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            let rect =
                card.getBoundingClientRect();


            let x =
                event.clientX -
                rect.left;


            let y =
                event.clientY -
                rect.top;


            let centerX =
                rect.width / 2;


            let centerY =
                rect.height / 2;


            let rotateX =
                ((y - centerY) /
                    centerY) * -2;


            let rotateY =
                ((x - centerX) /
                    centerX) * 2;


            card.style.transform =
                `
                translateY(-7px)
                perspective(600px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.01)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/*   LOGIN BUTTON */

/* =========================================
   NAVBAR AUTH STATE
========================================= */

function updateAuthButton() {
    const authBtn = document.getElementById("authBtn");
    if (!authBtn) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        authBtn.innerHTML = `${currentUser.name} <span>→</span>`;
        authBtn.onclick = () => {
            localStorage.removeItem("currentUser");
            window.location.reload();
        };
    } else {
        authBtn.innerHTML = `Login <span>→</span>`;
        authBtn.onclick = () => {
            window.location.href = "login.html";
        };
    }
}

updateAuthButton();


/*  PRIMARY BUTTON */

let primaryButton =
    document.querySelector(
        ".primary-btn"
    );


if (primaryButton) {

    primaryButton.addEventListener(
        "click",
        () => {

            console.log(
                "Opening HR workspace..."
            );

        }
    );

}


/*  BACKGROUND CONTROL */

let pauseButton =
    document.querySelector(
        ".video-control .pause"
    );


if (pauseButton) {

    let animationPaused =
        false;


    pauseButton.addEventListener(
        "click",
        () => {

            let animation =
                document.querySelector(
                    "#hrAnimation"
                );


            if (!animation)
                return;


            if (!animationPaused) {

                animation.pause();

                pauseButton.textContent =
                    "▶";

                animationPaused =
                    true;

            } else {

                animation.play();

                pauseButton.textContent =
                    "Ⅱ";

                animationPaused =
                    false;

            }

        }
    );

}