$(document).ready(() => {
  $(window).on('scroll', () => {
    if ($(window).width() < 1200) return
    const stickyNavbarWrapper = $('.sticky-navbar-wrapper')
    const stickyNavbar = $('.sticky-navbar')
    const scrollTop = $(window).scrollTop()
    const gutter = 100

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
  }).scroll() // invoke scroll-handler on page-load
})
