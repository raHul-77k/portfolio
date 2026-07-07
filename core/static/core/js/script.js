let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
let navBar = document.querySelector(".navbar");
let Menu = document.querySelectorAll(".N");

menuBtn.onclick = function () {
    menuBtn.style.opacity = "0";
    menuBtn.style.pointerEvents = "none";
    navBar.classList.add("active");
};

for (let i = 0; i < Menu.length; i++) {
    Menu[i].onclick = function () {
        navBar.classList.remove("active");
        menuBtn.style.opacity = "1";
        menuBtn.style.pointerEvents = "auto";
    };
}

cancelBtn.onclick = function () {
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
    navBar.classList.remove("active");
};

// Sticky nav + scroll-to-top visibility
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-btn");

window.addEventListener("scroll", function () {
    const scrolled = document.documentElement.scrollTop;
    nav.classList.toggle("sticky", scrolled > 20);
    if (scrollBtn) scrollBtn.classList.toggle("show", scrolled > 300);
});

/* ------------------------------------------------------------
   Scroll reveal + animated skill bars (IntersectionObserver)
   ------------------------------------------------------------ */
const revealItems = document.querySelectorAll("[data-reveal]");
const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);
revealItems.forEach((el) => revealObserver.observe(el));

const skillsSection = document.querySelector(".skills");
if (skillsSection) {
    const skillObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                document.querySelectorAll(".skill-item").forEach((item) => {
                    const percent = item.getAttribute("data-percent");
                    const fill = item.querySelector(".skill-fill");
                    if (fill) fill.style.width = percent + "%";
                });
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.35 }
    );
    skillObserver.observe(skillsSection);
}

/* ------------------------------------------------------------
   Active nav link highlighting based on visible section
   ------------------------------------------------------------ */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar .menu li a");
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + id
                );
            });
        });
    },
    { threshold: 0.55 }
);
sections.forEach((section) => sectionObserver.observe(section));

/* ------------------------------------------------------------
   Rotating role typewriter
   ------------------------------------------------------------ */
const typedTarget = document.querySelector("[data-typed]");
if (typedTarget) {
    const roles = [
        "UI/UX Designer",
        "Product Designer",
        "Interaction Designer",
        "Design Thinker",
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
        const current = roles[roleIndex];
        typedTarget.textContent = deleting
            ? current.substring(0, charIndex--)
            : current.substring(0, charIndex++);

        let delay = deleting ? 55 : 110;

        if (!deleting && charIndex === current.length + 1) {
            deleting = true;
            delay = 1600;
        } else if (deleting && charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 400;
        }
        setTimeout(typeLoop, delay);
    }
    typeLoop();
}

/* ------------------------------------------------------------
   Subtle 3D tilt on service cards
   ------------------------------------------------------------ */
document.querySelectorAll(".services .box").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = ((x - rect.width / 2) / rect.width) * 10;
        const rotateX = ((rect.height / 2 - y) / rect.height) * 10;
        card.style.transform = `translateY(-12px) perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});
