
import 'owl.carousel2/dist/assets/owl.carousel.css'
import 'owl.carousel2/dist/assets/owl.theme.default.css'
import 'owl.carousel2'

$(document).ready(function () {
  // Video blog carousel

  const contentCarouselsContainers = $('.content-carousel')

  contentCarouselsContainers.map((index, contentCarouselContainer) => {
    const $contentCarouselContainer = $(contentCarouselContainer)
    const owlCarousel = $contentCarouselContainer.find('.owl-carousel').owlCarousel({
      margin: 10,
      dotsContainer: $contentCarouselContainer.find('.carousel-dots'),
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
    $contentCarouselContainer.find('.carousel-next').on('click', () => {
      owlCarousel.trigger('next.owl.carousel')
    })
    $contentCarouselContainer.find('.carousel-prev').on('click', () => {
      owlCarousel.trigger('prev.owl.carousel')
    })
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

  // Related news carousel
  const relatedNewsCarousel = $('.related-news-carousel').owlCarousel({
    margin: 10,
    dotsContainer: $('.related-news-carousel-dots'),
    touchDrag: true,
    mouseDrag: false,
    responsive: {
      0: {
        items: 1,
        slideBy: 1
      },
      480: {
        items: 2,
        slideBy: 1
      },
      768: {
        items: 3,
        slideBy: 1
      }

    }
  })
  $('.related-news-carousel-next').on('click', () => {
    relatedNewsCarousel.trigger('next.owl.carousel')
  })
  $('.related-news-carousel-prev').on('click', () => {
    relatedNewsCarousel.trigger('prev.owl.carousel')
  })
})
