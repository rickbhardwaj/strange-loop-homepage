/* ============================================================
   STRANGE LOOP — hero slideshow, register, reveals
   ============================================================ */

(function () {
  "use strict";

  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- hero slideshow: famous American architecture ---------- */

  /* focus: object-position x — keeps each clip's subject centered in the
     right-hand panel, which crops the 16:9 frame horizontally */
  var CLIPS = [
    { src: "assets/video/towers.mp4",     focus: "4%",  caption: "Empire State Building — New York, NY",          coords: "40.7484° N, 73.9857° W" },
    { src: "assets/video/capitol.mp4",    focus: "0%",  caption: "United States Capitol — Washington, D.C.",      coords: "38.8899° N, 77.0091° W" },
    { src: "assets/video/brooklyn.mp4",   focus: "12%", caption: "Brooklyn Bridge, est. 1883 — New York, NY",     coords: "40.7061° N, 73.9969° W" },
    { src: "assets/video/chicago.mp4",    focus: "50%", caption: "Near North Side — Chicago, IL",                 coords: "41.8989° N, 87.6229° W" },
    { src: "assets/video/goldengate.mp4", focus: "50%", caption: "Golden Gate Bridge, est. 1937 — San Francisco, CA", coords: "37.8199° N, 122.4783° W" },
    { src: "assets/video/nyc_drone.mp4",  focus: "10%", caption: "Hudson Yards — New York, NY",                   coords: "40.7540° N, 74.0014° W" }
  ];

  var HOLD_MS = 9000;

  var videos   = document.querySelectorAll(".hero-video");
  var caption  = document.getElementById("regCaption");
  var coords   = document.getElementById("regCoords");
  var num      = document.getElementById("regNum");
  var progress = document.getElementById("regProgress");

  if (videos.length === 2 && !REDUCED) {
    var front = videos[0];
    var back  = videos[1];
    var idx = 0;
    var holdStart = null;

    function pad(n) { return n < 10 ? "0" + n : "" + n; }

    function setRegister(i) {
      if (caption) {
        caption.style.opacity = "0";
        setTimeout(function () {
          caption.textContent = CLIPS[i].caption;
          if (coords) coords.textContent = CLIPS[i].coords;
          if (num) num.textContent = pad(i + 1);
          caption.style.opacity = "1";
        }, 400);
      }
    }

    function play(v) {
      var p = v.play();
      if (p && p.catch) p.catch(function () { /* autoplay blocked; poster remains */ });
    }

    function stage(v, i) {
      v.src = CLIPS[i].src;
      v.style.objectPosition = CLIPS[i].focus + " 50%";
    }

    // boot: first clip on the front layer, preload second on the back
    stage(front, 0);
    play(front);
    stage(back, 1);
    back.load();
    setRegister(0);
    holdStart = performance.now();

    function advance() {
      idx = (idx + 1) % CLIPS.length;

      // back layer already holds the next clip — start it, fade it in
      play(back);
      back.classList.add("is-active");
      front.classList.remove("is-active");
      setRegister(idx);

      // swap roles, then stage the following clip on the (now hidden) layer
      var t = front; front = back; back = t;
      setTimeout(function () {
        back.pause();
        stage(back, (idx + 1) % CLIPS.length);
        back.load();
      }, 1700);

      holdStart = performance.now();
    }

    setInterval(advance, HOLD_MS);

    // hairline progress across the register
    if (progress) {
      (function tick() {
        var pct = Math.min(100, ((performance.now() - holdStart) / HOLD_MS) * 100);
        progress.style.width = pct + "%";
        requestAnimationFrame(tick);
      })();
    }
  } else if (REDUCED && caption) {
    caption.textContent = CLIPS[0].caption;
  }

  /* ---------- top bar: ink-on-paper once past the hero ---------- */

  var topbar = document.getElementById("topbar");
  var hero = document.querySelector(".hero");

  if (topbar && hero && "IntersectionObserver" in window) {
    new IntersectionObserver(
      function (entries) {
        topbar.classList.toggle("is-solid", !entries[0].isIntersecting);
      },
      { rootMargin: "-68px 0px 0px 0px", threshold: 0 }
    ).observe(hero);
  }

  /* ---------- reveals ---------- */

  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !REDUCED) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }
})();
