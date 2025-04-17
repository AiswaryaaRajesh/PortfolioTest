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


//scroll for circle and date timeline
document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline_item");

  if (!timelineItems.length) return;

  const isSmallScreen = window.innerWidth < 768;

  function updateScrollAnimations() {
    const centerY = window.innerHeight / 2;

    timelineItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemHeight = rect.height;
      const itemTop = rect.top;

      const circle = item.querySelector(".timeline_circle");
      const dateText = item.querySelector(".timeline_date-text");

      if (!circle) return;

      let progress = (centerY - itemTop) / (itemHeight - 100);
      progress = Math.max(0, Math.min(progress, 1));
      const translateY = progress * (itemHeight - 60);

      circle.style.transform = `translateY(${translateY}px)`;

      if (dateText) {
        dateText.style.transform = isSmallScreen ? "none" : `translateY(${translateY}px)`;
      }
    });

    requestAnimationFrame(updateScrollAnimations);
  }

  console.log("Scroll animation script loaded");
  requestAnimationFrame(updateScrollAnimations);
});
