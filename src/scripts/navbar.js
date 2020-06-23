$(document).ready(() => {
  $(window).on('scroll', () => {
    if ($(window).width() < 1200) return
    const stickyNavbarWrapper = $('.sticky-navbar-wrapper')
    const stickyNavbar = $('.sticky-navbar')
    const scrollTop = $(window).scrollTop()
    const gutter = 100

    if (stickyNavbarWrapper.length) {
      if ((stickyNavbarWrapper.offset().top + stickyNavbarWrapper.height() + gutter) <= scrollTop) {
        if (!stickyNavbar.hasClass('sticky')) {
          stickyNavbar.addClass('sticky')
        }
      } else {
        if (stickyNavbar.hasClass('sticky')) {
          stickyNavbar.removeClass('sticky')
        }
      }

      if ((stickyNavbarWrapper.offset().top + stickyNavbarWrapper.height() + gutter / 2) <= scrollTop) {
        if (!stickyNavbar.hasClass('position-fixed')) {
          stickyNavbar.addClass('position-fixed')
        }
      } else {
        if (stickyNavbar.hasClass('position-fixed')) {
          stickyNavbar.removeClass('position-fixed')
        }
      }
    }
  }).scroll() // invoke scroll-handler on page-load

  // Search
  const navbarSearchBtn = $('.navbar-search-btn ')
  const navbarSearchInput = $('.navbar-search-input ')
  navbarSearchBtn.on('click', e => {
    e.preventDefault()
    if (navbarSearchInput.is(':visible')) {
      navbarSearchInput
        .removeClass('border-secondary')
        .addClass('border-white')
        .removeClass('w-lg-500')
        .fadeOut()
    } else {
      navbarSearchInput
        .fadeIn()
        .removeClass('border-white')
        .addClass('border-secondary')
        .addClass('w-lg-500')
      navbarSearchInput.find('input').focus()
    }
  })

  // Navbar dropdown
  if ($(window).width() < 1200) {
    $('.nav-item.is-dropdown .nav-link i').on('click', (e) => {
      e.preventDefault()
      const item = $(e.target).parents('.nav-item')
      const dropdown = $(e.target).parents('.nav-item').find('.nav-dropdown')
      if (dropdown.is(':visible')) {
        dropdown.hide()
        item.removeClass('collapsed')
      } else {
        dropdown.show()
        item.addClass('collapsed')
      }
    })
  } else {
    $('.nav-item.is-dropdown').on('mouseenter', function (e) {
      $(this).addClass('collapsed')
    }).on('mouseleave', function (e) {
      $(this).removeClass('collapsed')
    })
  }
})
