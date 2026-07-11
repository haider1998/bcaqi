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

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll reveal with light stagger among siblings (respects reduced motion)
  var items = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var sibs = el.parentNode ? el.parentNode.querySelectorAll(":scope > .reveal") : [el];
        var idx = Array.prototype.indexOf.call(sibs, el);
        el.style.transitionDelay = Math.min(idx, 5) * 70 + "ms";
        el.classList.add("in");
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  // Scroll progress bar + header elevation (rAF-throttled, passive)
  if (!reduce) {
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (st / h) * 100 : 0) + "%";
        if (header) header.classList.toggle("scrolled", st > 8);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  } else if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("scrolled", (window.pageYOffset || 0) > 8);
    }, { passive: true });
  }

  // Interactive tilt on the hero demo card (pointer-driven, subtle)
  var tilt = document.querySelector(".hero-demo");
  if (tilt && !reduce && window.matchMedia("(pointer:fine)").matches) {
    var maxDeg = 6;
    tilt.addEventListener("mousemove", function (ev) {
      var r = tilt.getBoundingClientRect();
      var px = (ev.clientX - r.left) / r.width - 0.5;
      var py = (ev.clientY - r.top) / r.height - 0.5;
      tilt.classList.add("tilting");
      tilt.style.setProperty("--rx", (px * maxDeg).toFixed(2) + "deg");
      tilt.style.setProperty("--ry", (-py * maxDeg).toFixed(2) + "deg");
    });
    tilt.addEventListener("mouseleave", function () {
      tilt.classList.remove("tilting");
      tilt.style.setProperty("--rx", "0deg");
      tilt.style.setProperty("--ry", "0deg");
    });
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
