
import 'bootstrap-slider'
import 'bootstrap-slider/src/sass/bootstrap-slider.scss'

$('#pupilRegistration').on('shown.bs.modal', function (e) {
  const unit = $('.time-range-picker').attr('data-slider-unit')
  const price = parseFloat($('.time-range-picker').attr('data-slider-price'))
  const monthlyPrice = $('.monthly-price')
  $('.time-range-picker').slider({
    tooltip: 'hide'
  }).on('change', function (e) {
    let diff = Math.abs(e.value.newValue[0] - e.value.newValue[1])
    if (diff <= 3) {
      diff = Math.abs(e.value.oldValue[0] - e.value.oldValue[1])
      $('.time-range-picker').slider('setValue', e.value.oldValue)
    }
    $('.tick-slider-selection').text(`${diff} ${unit}`)
    monthlyPrice.text(diff * price)
  })
  // on init
  const defaultValue = $('.time-range-picker').slider('getValue')
  const diff = Math.abs(defaultValue[0] - defaultValue[1])
  $('.tick-slider-selection').text(`${diff} ${unit}`)
  monthlyPrice.text(diff * price)
})
