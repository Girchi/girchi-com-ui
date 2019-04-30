
import 'owl.carousel2/dist/assets/owl.carousel.css'
import 'owl.carousel2/dist/assets/owl.theme.default.css'
import 'owl.carousel2'

$(document).ready(function () {
  // Video blog carousel
  const videoCarousel = $('.video-carousel').owlCarousel({
    margin: 10,
    dotsContainer: $('.video-carousel-dots'),
    responsive: {
      0: {
        items: 2,
        slideBy: 2
      },
      480: {
        items: 2,
        slideBy: 2
      },
      768: {
        items: 2,
        slideBy: 2
      },
      992: {
        items: 5,
        slideBy: 5
      }
    }
  })
  $('.video-carousel-next').on('click', () => {
    videoCarousel.trigger('next.owl.carousel')
  })
  $('.video-carousel-prev').on('click', () => {
    videoCarousel.trigger('prev.owl.carousel')
  })

  // News carousel
  const newsCarousel = $('.news-carousel').owlCarousel({
    margin: 0,
    items: 1,
    dots: true,
    touchDrag: true,
    mouseDrag: false,
    autoplay: true,
    animateOut: 'fadeOut',
    dotsContainer: $('.news-carousel-dots')
  })
  $('.news-carousel-next').on('click', () => {
    newsCarousel.trigger('next.owl.carousel')
  })
  $('.news-carousel-prev').on('click', () => {
    newsCarousel.trigger('prev.owl.carousel')
  })

  // Rating of politicians carousel

  const ratingOfPoliticiansCarousel = $('.rating-of-politicians-carousel').owlCarousel({
    margin: 15,
    dots: true,
    dotsContainer: $('.rating-of-politicians-carousel-dots'),
    responsive: {
      0: {
        items: 1,
        slideBy: 1
      },
      480: {
        items: 2,
        slideBy: 2
      },
      768: {
        items: 3,
        slideBy: 3
      },
      992: {
        items: 5,
        slideBy: 5
      }
    }
  })
  $('.rating-of-politicians-carousel-next').on('click', () => {
    ratingOfPoliticiansCarousel.trigger('next.owl.carousel')
  })
  $('.rating-of-politicians-carousel-prev').on('click', () => {
    ratingOfPoliticiansCarousel.trigger('prev.owl.carousel')
  })

  // Project carousel
  const projectsCarousel = $('.projects-carousel').owlCarousel({
    margin: 0,
    items: 1,
    dots: true,
    touchDrag: true,
    mouseDrag: false,
    autoplay: true,
    animateOut: 'fadeOut',
    dotsContainer: $('.projects-carousel-dots'),
    autoHeight: true
  })
  $('.projects-carousel-next').on('click', () => {
    projectsCarousel.trigger('next.owl.carousel')
  })
  $('.projects-carousel-prev').on('click', () => {
    projectsCarousel.trigger('prev.owl.carousel')
  })
})
