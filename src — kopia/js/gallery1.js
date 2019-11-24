const galleries = document.querySelectorAll(".gridGallery");
const macyInstances = [];
const macyOptions = {
  trueOrder: false,
  debug: true,
  margin: 0,
  columns: 4,
  breakAt: {
    940: 3,
    700: 2,
    550: 1
  },
  margin: {
    x: 20,
    y: 20
  }
};

for (let i = 0; i < galleries.length; i++) {
  const newId = `galleryinstance-${i}`;
  galleries[i].id = newId;
  macyOptions.container = `#${newId}`;
  macyInstances.push(Macy(macyOptions));
}
const hamburger = document.querySelector(".menu");
const hamburgerClose = document.querySelector(".menu__close");
const navOpen = document.querySelector(".navigation__open");

hamburger.addEventListener("click", () => {
  const tl1 = new TimelineMax();

  tl1.to(navOpen, 0.7, { y: 0 });
});

hamburgerClose.addEventListener("click", () => {
  const tl = new TimelineMax();

  tl.to(navOpen, 0.7, { y: -1200 }).set(navOpen, { clearProps: "all" });
});

function cursor() {
  let clientX = -100;
  let clientY = -100;
  const innerCursor = document.querySelector(".cursor--small");

  const initCursor = () => {
    document.addEventListener("mousemove", e => {
      clientX = e.clientX;
      clientY = e.clientY;
    });

    const render = () => {
      TweenMax.set(innerCursor, {
        x: clientX,
        y: clientY
      });

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  };

  initCursor();

  let lastX = 0;
  let lastY = 0;
  let isStuck = false;
  let showCursor = false;
  let group, stuckX, stuckY, fillOuterCursor;

  const initCanvas = () => {
    const canvas = document.querySelector(".cursor--canvas");
    const shapeBounds = {
      width: 75,
      height: 75
    };
    paper.setup(canvas);
    const strokeColor = "#ff0000";
    const strokeWidth = 1;
    const segments = 8;
    const radius = 15;

    const noiseScale = 150;
    const noiseRange = 4;
    let isNoisy = false;

    const polygon = new paper.Path.RegularPolygon(
      new paper.Point(0, 0),
      segments,
      radius
    );
    polygon.strokeColor = strokeColor;
    polygon.strokeWidth = strokeWidth;
    polygon.smooth();
    group = new paper.Group([polygon]);
    group.applyMatrix = false;

    const noiseObjects = polygon.segments.map(() => new SimplexNoise());
    let bigCoordinates = [];

    const lerp = (a, b, n) => {
      return (1 - n) * a + n * b;
    };

    const map = (value, in_min, in_max, out_min, out_max) => {
      return (
        ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
      );
    };

    paper.view.onFrame = event => {
      lastX = lerp(lastX, clientX, 0.2);
      lastY = lerp(lastY, clientY, 0.2);
      group.position = new paper.Point(lastX, lastY);
    };
  };

  initCanvas();
}
cursor();
function video() {
  const videoGif = document.querySelector(".container__video__gif");
  const titleGif = document.querySelector(".container__video__title");
  const watchGif = document.querySelector(".watch");
  const socialGif = document.querySelector(".social__video");
  const newTl = new TimelineMax();
  newTl
    .fromTo(videoGif, 1.2, { y: -130, opacity: 0 }, { y: -200, opacity: 1 })
    .fromTo(titleGif, 0.5, { opacity: 0, y: 35 }, { opacity: 1, y: 0 })
    .fromTo(watchGif, 0.4, { opacity: 0, y: 35 }, { opacity: 1, y: 0 })
    .fromTo(
      socialGif,
      0.4,
      { opacity: 0, y: 35 },
      { opacity: 1, y: -30 },
      "-=0.5"
    );
}
video();
