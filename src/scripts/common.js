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
})
