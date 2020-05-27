$(function () {
  $('[data-toggle="tooltip"]').tooltip()

  $('[data-toggle="calculate-ged"]').on('input', function () {
    const outputEl = $($(this).attr('data-output'))
    const value = parseFloat($(this).val()) ? parseFloat($(this).val()) : 0
    const rate = parseFloat($(this).attr('data-rate'))
      ? parseFloat($(this).attr('data-rate'))
      : 0
    outputEl.text(value * rate)
  })

  $('.js-check-all').on('change', function () {
    $(this)
      .parents('table')
      .find('tbody input[type="checkbox"]')
      .prop('checked', $(this).is(':checked'))

    if ($(this).is(':checked')) {
      $(this)
        .parents('table')
        .find('tbody .form-checkbox-input')
        .addClass('checked')
    } else {
      $(this)
        .parents('table')
        .find('tbody .form-checkbox-input')
        .removeClass('checked')
    }
  })

  $('.js-check-all')
    .parents('table')
    .find('tbody .form-checkbox-input')
    .on('change', function () {
      const checked = $(this)
        .parents('table')
        .find('tbody input[type="checkbox"]:checked')
      const all = $(this)
        .parents('table')
        .find('tbody input[type="checkbox"]')

      if (checked.length === all.length) {
        $(this)
          .parents('table')
          .find('.js-check-all')
          .prop('checked', true)

        $(this)
          .parents('table')
          .find('thead .form-checkbox-input')
          .addClass('checked')
      } else {
        $(this)
          .parents('table')
          .find('.js-check-all')
          .prop('checked', false)

        $(this)
          .parents('table')
          .find('thead .form-checkbox-input')
          .removeClass('checked')
      }
    })
})
