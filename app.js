/* ============================================================
   STRANGE LOOP — hero slideshow, register, reveals
   ============================================================ */

(function () {
  "use strict";

  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- hero slideshow: famous American architecture ---------- */

  /* focus: object-position — keeps each clip's subject centered in the
     right-hand panel, which crops landscape frames horizontally and
     portrait frames vertically */
  var CLIPS = [
    { src: "assets/video/wrigley.mp4",     focus: "50% 40%", caption: "Wrigley Building, est. 1924 — Chicago, IL",     coords: "41.8893° N, 87.6245° W" },
    { src: "assets/video/tribune.mp4",     focus: "50% 30%", caption: "Tribune Tower, est. 1925 — Chicago, IL",        coords: "41.8903° N, 87.6235° W" },
    { src: "assets/video/rockefeller.mp4", focus: "50% 45%", caption: "30 Rockefeller Plaza — New York, NY",           coords: "40.7587° N, 73.9787° W" }
  ];

  var HOLD_MS = 9000;

  var videos   = document.querySelectorAll(".hero-video");
  var caption  = document.getElementById("regCaption");
  var coords   = document.getElementById("regCoords");
  var num      = document.getElementById("regNum");

  if (videos.length === 2 && !REDUCED) {
    var front = videos[0];
    var back  = videos[1];
    var idx = 0;

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
      v.style.objectPosition = CLIPS[i].focus;
    }

    // boot: first clip on the front layer, preload second on the back
    stage(front, 0);
    play(front);
    stage(back, 1);
    back.load();
    setRegister(0);

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
    }

    setInterval(advance, HOLD_MS);
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
