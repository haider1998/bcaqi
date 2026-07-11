/* BCAQI Labs — shared behaviour: mobile nav, scroll reveal, contact form. */
(function () {
  "use strict";

  // Retire the old community-site service worker + caches so returning
  // visitors are not served stale pages after the relaunch.
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (regs) {
      regs.forEach(function (r) { r.unregister(); });
    }).catch(function () {});
    if (window.caches && caches.keys) {
      caches.keys().then(function (keys) {
        keys.forEach(function (k) { if (/bcaqi/i.test(k)) caches.delete(k); });
      }).catch(function () {});
    }
  }

  // Mobile nav toggle
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Scroll reveal (respects reduced motion)
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  // Contact form — no backend on static hosting; compose a domain email
  // so submissions still reach the team. Clearly no data is sent anywhere else.
  document.querySelectorAll("form[data-contact]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var to = form.getAttribute("data-to") || "contact@bcaqi.com";
      var name = (data.get("name") || "").toString();
      var company = (data.get("company") || "").toString();
      var email = (data.get("email") || "").toString();
      var type = (data.get("type") || "").toString();
      var message = (data.get("message") || "").toString();
      var subjectPrefix = form.getAttribute("data-subject") || "Inquiry";
      var subject = subjectPrefix + (type ? " — " + type : "");
      var body =
        "Name: " + name + "\n" +
        "Company: " + company + "\n" +
        "Email: " + email + "\n" +
        "Inquiry type: " + type + "\n\n" +
        message + "\n";
      window.location.href =
        "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      var note = form.querySelector(".form-status");
      if (note) { note.hidden = false; }
    });
  });

  // Current year in footers
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
