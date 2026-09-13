/* ==========================================================================
   Panabo City — script.js
   Plain vanilla JS. No build step, no external libraries.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Mobile navigation toggle ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const menuIconUse = document.querySelector("#menuIcon use");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      if (menuIconUse) {
        menuIconUse.setAttribute("href", isOpen ? "#icon-close" : "#icon-menu");
      }
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        if (menuIconUse) menuIconUse.setAttribute("href", "#icon-menu");
      });
    });
  }

  /* ---------- News filter ---------- */
  const filterButtons = document.querySelectorAll(".filter-button");
  const newsCards = document.querySelectorAll(".news-card");
  const newsEmpty = document.getElementById("newsEmpty");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));

      let visibleCount = 0;
      newsCards.forEach((card) => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.style.display = matches ? "" : "none";
        if (matches) visibleCount++;
      });

      if (newsEmpty) newsEmpty.hidden = visibleCount !== 0;
    });
  });

  /* ---------- Scroll reveal ---------- */
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
  }

});