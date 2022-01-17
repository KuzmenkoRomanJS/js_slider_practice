const slider = {};

slider.rootEl = document.querySelector(".slider");
slider.slides = Array.from(slider.rootEl.querySelectorAll(".slider__slide"));
slider.nextBtn = slider.rootEl.querySelector(".slider__next");
slider.prevBtn = slider.rootEl.querySelector(".slider__prev");
slider.slideAnimated = false;
slider.currentSlideIdx = slider.slides.findIndex(function (slide) {
  return slide.classList.contains("slider__slide--current");
});

if (slider.currentSlideIdx < 0) {
  slider.currentSlideIdx = 0;
}

slider.rootEl.addEventListener("transitionend", function () {
  slider.slideAnimated = false;
});

slider.nextBtn.addEventListener("click", function () {
  slider.nextSlide();
});

slider.prevBtn.addEventListener("click", function () {
  slider.prevSlide();
});

slider.render = function () {
  const { currentSlideIdx } = slider;

  slider.slides.forEach(function (slide, idx) {
    if (currentSlideIdx === idx) {
      slide.classList.add("slider__slide--current");
    } else {
      slide.classList.remove("slider__slide--current");
    }

    if (idx < currentSlideIdx) {
      slide.classList.add("slider__slide--prev");
      slide.classList.remove("slider__slide--next");
    } else {
      slide.classList.remove("slider__slide--prev");
      slide.classList.add("slider__slide--next");
    }
  });
};

slider.showSlide = function (idx) {
  if (slider.slideAnimated) {
    return;
  }

  const newIdx = (slider.slides.length + idx) % slider.slides.length;

  if (slider.currentSlideIdx !== newIdx) {
    slider.slideAnimated = true;
  }

  slider.currentSlideIdx = newIdx;

  slider.render();
};

slider.prevSlide = function () {
  slider.showSlide(slider.currentSlideIdx - 1);
};

slider.nextSlide = function () {
  slider.showSlide(slider.currentSlideIdx + 1);
};
