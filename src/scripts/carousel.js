
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
        items: 1,
        margin: 0,
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
  $('.video-carousel-next').on('click', () => {
    videoCarousel.trigger('next.owl.carousel')
  })
  $('.video-carousel-prev').on('click', () => {
    videoCarousel.trigger('prev.owl.carousel')
  })
})
