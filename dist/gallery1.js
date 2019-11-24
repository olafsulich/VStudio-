const galleries = document.querySelectorAll(".gridGallery"),
  macyInstances = [],
  macyOptions = {
    trueOrder: !1,
    debug: !0,
    margin: 0,
    columns: 4,
    breakAt: { 940: 3, 700: 2, 550: 1 },
    margin: { x: 20, y: 20 }
  };
for (let e = 0; e < galleries.length; e++) {
  const o = `galleryinstance-${e}`;
  (galleries[e].id = o),
    (macyOptions.container = `#${o}`),
    macyInstances.push(Macy(macyOptions));
}
const hamburger = document.querySelector(".menu"),
  hamburgerClose = document.querySelector(".menu__close"),
  navOpen = document.querySelector(".navigation__open");
hamburger.addEventListener("click", () => {
  new TimelineMax().to(navOpen, 0.7, { y: 0 });
}),
  hamburgerClose.addEventListener("click", () => {
    new TimelineMax()
      .to(navOpen, 0.7, { y: -1200 })
      .set(navOpen, { clearProps: "all" });
  });
function cursor() {
  let e = -100,
    o = -100;
  const n = document.querySelector(".cursor--small");
  (() => {
    document.addEventListener("mousemove", n => {
      (e = n.clientX), (o = n.clientY);
    });
    const t = () => {
      TweenMax.set(n, { x: e, y: o }), requestAnimationFrame(t);
    };
    requestAnimationFrame(t);
  })();
  let t,
    r = 0,
    a = 0;
  (() => {
    const n = document.querySelector(".cursor--canvas");
    paper.setup(n);
    const c = new paper.Path.RegularPolygon(new paper.Point(0, 0), 8, 15);
    (c.strokeColor = "#ff0000"),
      (c.strokeWidth = 1),
      c.smooth(),
      ((t = new paper.Group([c])).applyMatrix = !1);
    c.segments.map(() => new SimplexNoise());
    const i = (e, o, n) => (1 - n) * e + n * o;
    paper.view.onFrame = n => {
      (r = i(r, e, 0.2)),
        (a = i(a, o, 0.2)),
        (t.position = new paper.Point(r, a));
    };
  })();
}

cursor();

window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
