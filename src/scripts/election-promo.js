$(document).ready(function () {
  const masonry = $('.masonry')
  const masonryItem = $('.masonry').find('.masonry-item')

  function masonrize () {
    const windowWidth = $(window).width()

    if (masonryItem.length > 1) {
      masonry.html('')

      if (windowWidth >= 998) {
        masonry.append('<div class="masonry-row"></div>')

        const masonryRow = $('.masonry').find('.masonry-row')

        masonryRow.append('<div class="masonry-col"></div>')
        masonryRow.append('<div class="masonry-col"></div>')

        const masonryColumn = $('.masonry').find('.masonry-col')

        $.each(masonryItem, function (index, item) {
          $(masonryColumn[index % 2]).append(item)
        })
      } else {
        $.each(masonryItem, function (index, item) {
          masonry.append(item)
        })
      }
    }
  }

  masonrize()

  $(window).on('resize', masonrize)

  const navbar = $('.election-sticky-navbar')

  if (navbar.length) {
    $(window).on('scroll', function () {
      const originalHeight = navbar.height()

      if ($(document).scrollTop() > originalHeight) {
        navbar.css({ height: originalHeight })
        navbar.find('header').addClass('sticky')
      } else {
        navbar.css({ height: 'initial' })
        navbar.find('header').removeClass('sticky')
      }
    })

    $(window).trigger('scroll')
  }
})
