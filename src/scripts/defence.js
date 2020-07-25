var lastId
var topMenu = $('#scroll-btn')
var topMenuHeight = topMenu.outerHeight() + 1
var menuItems = topMenu.find('a')
var scrollItems = menuItems.map(function () {
  var item = $($(this).attr('href'))
  if (item.length) { return item }
})

menuItems.click(function (e) {
  var href = $(this).attr('href')
  var offsetTop = href === '#' ? 0 : $(href).offset().top - topMenuHeight + 1
  $('html, body').stop().animate({
    scrollTop: offsetTop
  }, 850)
  e.preventDefault()
})

// Bind to scroll
$(window).scroll(function () {
  // Get container scroll position
  var fromTop = $(this).scrollTop() + topMenuHeight

  // Get id of current scroll item
  var cur = scrollItems.map(function () {
    if ($(this).offset().top < fromTop) { return this }
  })
  // Get the id of the current element
  cur = cur[cur.length - 1]
  var id = cur && cur.length ? cur[0].id : ''

  if (lastId !== id) {
    lastId = id
    // Set/remove active class
    menuItems
      .parent().removeClass('active')
      .end().filter('[href="#' + id + '"]').parent().addClass('active')
  }
})
