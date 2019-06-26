
import 'bootstrap-slider'
import 'bootstrap-slider/src/sass/bootstrap-slider.scss'
import { round } from './helpers'

$('#pupilRegistration').on('shown.bs.modal', function (e) {
  const unit = $('.time-range-picker').attr('data-slider-unit')
  const price = parseFloat($('.time-range-picker').attr('data-slider-price')) / 12
  const labels = JSON.parse($('.time-range-picker').attr('data-slider-ticks-labels'))
  const ticks = JSON.parse($('.time-range-picker').attr('data-slider-ticks'))
  const monthlyPrice = $('.monthly-price')
  const startTime = $('[name="start-time"]')
  const endTime = $('[name="end-time"]')

  // append select options
  $.each(labels, (i, e) => {
    let value = ticks[i]
    let label = e
    if (value <= 17) {
      startTime.append(`<option value="${value}">${label}</option>`)
    }
    if (value >= 13) {
      endTime.append(`<option value="${value}">${label}</option>`)
    }
    endTime.val(13)
  })

  if ($('.time-range-picker').is(':visible')) {
    $('.time-range-picker').slider({
      tooltip: 'hide'
    }).on('change', function (e) {
      let start = e.value.newValue[0]
      let end = e.value.newValue[1]
      let diff = Math.abs(start - end)
      if (diff <= 3) {
        start = e.value.oldValue[0]
        end = e.value.oldValue[1]
        diff = Math.abs(start - end)
        $('.time-range-picker').slider('setValue', e.value.oldValue)
      }
      $('.tick-slider-selection').text(`${diff} ${unit}`)
      monthlyPrice.text(round(diff * price, 2))
      startTime.val(start)
      endTime.val(end)
    })

    // on init
    const defaultValue = $('.time-range-picker').slider('getValue')
    const diff = Math.abs(defaultValue[0] - defaultValue[1])
    $('.tick-slider-selection').text(`${diff} ${unit}`)
    monthlyPrice.text(round(diff * price, 2))
    // update form control
    startTime.val(defaultValue[0])
    endTime.val(defaultValue[1])
  } else {
    const diff = Math.abs(startTime.val() - endTime.val())
    monthlyPrice.text(round(diff * price, 2))

    startTime.on('change', () => {
      let start = parseFloat(startTime.val())
      let end = parseFloat(endTime.val())
      let diff = Math.abs(start - end)
      if (diff < 4) {
        endTime.val(start + 4)
        end = parseFloat(endTime.val())
        diff = Math.abs(start - end)
      } else if (start > end) {
        endTime.val(start + 4)
        end = parseFloat(endTime.val())
        diff = Math.abs(start - end)
      }
      monthlyPrice.text(round(diff * price, 2))
    })
    endTime.on('change', () => {
      let start = parseFloat(startTime.val())
      let end = parseFloat(endTime.val())
      let diff = Math.abs(start - end)
      if (diff < 4) {
        startTime.val(end - 4)
        start = parseFloat(startTime.val())
        diff = Math.abs(start - end)
      } else if (start > end) {
        endTime.val(start + 4)
        end = parseFloat(endTime.val())
        diff = Math.abs(start - end)
      }
      monthlyPrice.text(round(diff * price, 2))
    })
  }
})
