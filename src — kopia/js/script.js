function init() {
  const navigation = document.querySelector(".navigation");

  const socials = document.querySelector(".social");

  const dotsAnimate1 = document.querySelectorAll(".pages__dots-1");
  const dotsAnimate2 = document.querySelectorAll(".pages__dots-2");
  const dotsAnimate3 = document.querySelectorAll(".pages__dots-3");
  const dotsAnimate4 = document.querySelectorAll(".pages__dots-4");
  const portraitPage = document.querySelector(".portrait__page");

  const newTl = new TimelineMax();
  newTl
    .fromTo(
      navigation,
      0.5,
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, ease: Power2.easeInOut }
    )
    .fromTo(
      portraitPage,
      0.8,

      { opacity: 0, x: 300 },
      { opacity: 1, x: 0 },
      { delay: -0.2 }
    )
    .fromTo(
      dotsAnimate1,
      0.5,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0 },
      "-=0.3"
    )
    .fromTo(
      dotsAnimate2,
      0.5,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0 },
      "-=0.3"
    )
    .fromTo(
      dotsAnimate3,
      0.5,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0 },
      "-=0.3"
    )
    .fromTo(
      dotsAnimate4,
      0.5,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0 },
      "-=0.3"
    )
    .fromTo(socials, 0.8, { opacity: 0 }, { opacity: 1 }, "-=0.4")
    .set(navigation, { clearProps: "all" });

  const slides = document.querySelectorAll(".slide");
  const pages = document.querySelectorAll(".page");
  let current = 0;
  let scrollSlide = 0;

  slides.forEach((slide, index) => {
    slide.addEventListener("click", function() {
      changeDots(this);
      nextSlide(index);
      scrollSlide = index;
    });
  });

  function changeDots(dot) {
    slides.forEach(slide => {
      slide.classList.remove("active");
    });
    dot.classList.add("active");
  }

  function nextSlide(pageNumber) {
    const nextPage = pages[pageNumber];
    const currentPage = pages[current];
    const nextPic = nextPage.querySelector(".page__pic");
    const currentPic = currentPage.querySelector(".page__pic");

    const tl = new TimelineMax();
    tl.fromTo(currentPic, 0.8, { opacity: 1, x: "0" }, { opacity: 0, x: "300" })
      .fromTo(currentPage, 0, { display: "grid" }, { display: "none" })
      .fromTo(nextPage, 0, { display: "none" }, { display: "grid" })
      .fromTo(nextPic, 0.9, { opacity: 0, x: "400" }, { opacity: 1, x: "0" });

    current = pageNumber;
  }
  document.addEventListener("wheel", throttle(scrollChange, 1500));
  document.addEventListener("touchmove", throttle(scrollChange, 1500));

  function switchDots(dotNumber) {
    const activeDot = document.querySelectorAll(".slide")[dotNumber];
    slides.forEach(slide => {
      slide.classList.remove("active");
    });
    activeDot.classList.add("active");
  }

  function scrollChange(e) {
    if (e.deltaY > 0) {
      scrollSlide += 1;
    } else {
      scrollSlide -= 1;
    }

    if (scrollSlide > 2) {
      scrollSlide = 0;
    }
    if (scrollSlide < 0) {
      scrollSlide = 2;
    }
    switchDots(scrollSlide);
    nextSlide(scrollSlide);
  }
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
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

    tl.to(navOpen, 0.7, { y: -1200 });
  });

  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
}

init();

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
