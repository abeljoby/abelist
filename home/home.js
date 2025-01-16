class Slideshow {
  constructor(slideshowContainer) {
    this.slideIndex = 1;
    this.slides = slideshowContainer.querySelectorAll(".mySlides");
    this.dots = slideshowContainer.querySelectorAll(".dot");
    this.showSlides(this.slideIndex);
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {
    if (n > this.slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = this.slides.length }
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].style.display = "none";
    }
    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].className = this.dots[i].className.replace(" active", "");
    }
    this.slides[this.slideIndex - 1].style.display = "block";
    this.dots[this.slideIndex - 1].className += " active";
  }
}

// Usage example:
const slideshow1 = new Slideshow(document.getElementById('focus-prep'));
const slideshow2 = new Slideshow(document.getElementById('mastermindle'));