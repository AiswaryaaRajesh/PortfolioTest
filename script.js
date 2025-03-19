//preloader
window.addEventListener('load', () => {
    const preload = document.getElementById("preloader");
    preload.classList.add('preload-finish');
    
});

//Sidepanel
function openNav() {
    document.getElementById("mySidepanel").style.width = "80%";
}

function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
}

//Navbar li bold active
document.querySelectorAll(".nav-link").forEach(item => {
    item.addEventListener("click", function() {
      document.querySelectorAll(".nav-link").forEach(li => li.classList.remove("active"));
      this.classList.add("active");
    });
});

//figma nav-link active on switching webpages DONT CHANGEE
document.addEventListener("DOMContentLoaded", function () {
    const figmaButton = document.getElementById("openFigma");

    if (figmaButton) {
        figmaButton.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default action
            event.stopPropagation(); // Stop other event listeners

            localStorage.setItem("activeNav", "figma"); // Set active nav to 'figma'
            window.open("figma.html", "_blank"); // Open in a new tab
        });
    }
});

//AutoUpdate Nav-links on Scroll
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    // Function to remove 'active' from all nav links
    function removeActiveClasses() {
        navLinks.forEach(link => link.classList.remove("active"));
    }

    // Function to activate a nav-link based on section
    function activateNavLink(sectionId) {
        removeActiveClasses();
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add("active");
            localStorage.setItem("activeNav", sectionId);
        }
    }

    // Intersection Observer API to track sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateNavLink(entry.target.getAttribute("id"));
            }
        });
    }, { rootMargin: "-50% 0px -50% 0px", threshold: 0.3 });

    // Observe all sections
    sections.forEach(section => observer.observe(section));

    // Restore active state from localStorage on page load
    const savedActive = localStorage.getItem("activeNav");
    if (savedActive) {
        activateNavLink(savedActive);
    }

    // Prevent overriding clicks with scroll updates
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            localStorage.setItem("activeNav", this.getAttribute("href").substring(1));
            removeActiveClasses();
            this.classList.add("active");
        });
    });
});
