const input = $('.is-invalid .validation-message')

input.popover({
  trigger: 'manual',
  fallbackPlacement: [ 'top' ],
  placement: 'top',
  template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body max-w-180 font-size-1 px-2 text-danger"></div></div>'
})

input.popover('show')
