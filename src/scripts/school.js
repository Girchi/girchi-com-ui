
import 'bootstrap-slider'
import 'bootstrap-slider/src/sass/bootstrap-slider.scss'
import { round } from './helpers'

$('#pupilRegistration').on('shown.bs.modal', function (e) {
  const unit = $('.time-range-picker').attr('data-slider-unit')
  const price = parseFloat($('.time-range-picker').attr('data-slider-price')) / 12
  const labels = JSON.parse($('.time-range-picker').attr('data-slider-ticks-labels'))
  const ticks = JSON.parse($('.time-range-picker').attr('data-slider-ticks'))
  const monthlyPrice = $('.monthly-price')
  const startTime = $('.start-time')
  const endTime = $('.end-time')
  let sliderId = 2
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
  // init sliders
  initSliders()
  $('body').on('change', function () {
    $('.start-time').each(function (key, select) {
      $(select).change(updatePrice())
    })
    $('.end-time').each(function (key, select) {
      $(select).change(updatePrice())
    })
  })
  $('#addNewChild').on('click', function () {
    // Init slider
    let slider = `
      <div class="px-3 d-none d-lg-block slider-element">
      <input
                  class="time-range-picker w-100"
                  type="text"
                  data-slider-ticks="[9,10,11,12,13,14,15,16,17,18,19,20,21]"
                  data-slider-ticks-labels='["9 სთ","10 სთ","11 სთ","12 სთ","13 სთ","14 სთ","15 სთ","16 სთ","17 სთ","18 სთ","19 სთ","20 სთ","21 სთ"]'
                  data-slider-min="9"
                  data-slider-max="21"
                  data-slider-step="1"
                  data-slider-price="1000"
                  data-slider-unit="სთ"
                  data-slider-value="[9,13]"
                  data-slider-id = "${sliderId}"
                />
                </div>`
    // Append slider element
    $('#sliders-wrapper').append(slider)
    // init sliders
    initSliders()
    // Append select elements
    $('#child-select-wrapper').append(` <div class="col-12 col-lg-6">
                  <div class="form-group">
                    <label class="form-label" for="start-time"
                      >დაწყების დრო</label
                    >
                    <select
                      class="form-control form-control-lg start-time"
                      name="start-time[${sliderId}]"
                      placeholder="მიუთითეთ დაწყების დრო"
                      data-slider = ${sliderId}
                    >
                    </select>
                  </div>
                </div>
                <div class="col-12 col-lg-6">
                  <div class="form-group">
                    <label class="form-label" for="end-time"
                      >დამთავრების დრო</label
                    >
                    <select
                      class="form-control form-control-lg end-time"
                      name="end-time[${sliderId}]"
                      placeholder="მიუთითეთ დამთავრების დრო"
                      data-slider = ${sliderId}
                    >
                    </select>
                  </div>
                </div>`)
    // append select options
    $.each(labels, (i, e) => {
      let value = ticks[i]
      let label = e
      if (value <= 17) {
        $(`[name="start-time[${sliderId}]"]`).append(`<option value="${value}">${label}</option>`)
      }
      if (value >= 13) {
        $(`[name="end-time[${sliderId}]"]`).append(`<option value="${value}">${label}</option>`)
      }
      $(`[name="end-time[${sliderId}]"]`).val(13)
    })
    initSliders()
    sliderId++
    updatePrice()
  })
  // Remove last slider from slider wrapper
  $('#removeLastChild').on('click', function () {
    updatePrice()
    if ($('#sliders-wrapper .slider-element').last().length) {
      let currentSliderId = $('#sliders-wrapper .slider-element input').last().attr('data-slider-id')
      $(`[name="start-time[${currentSliderId}]"]`).parent().remove()
      $(`[name="end-time[${currentSliderId}]"]`).parent().remove()
      $('#sliders-wrapper .slider-element').last().remove()
      sliderId--
      initSliders()
    }
  })
  function initSliders () {
    $('.time-range-picker').each(function (key, slider) {
      if ($(slider).is(':visible')) {
        let currentSliderId = $(slider).attr('data-slider-id')
        $(slider).slider({
          tooltip: 'hide'
        }).on('change', function (e) {
          let start = e.value.newValue[0]
          let end = e.value.newValue[1]
          let diff = Math.abs(start - end)
          if (diff <= 3) {
            start = e.value.oldValue[0]
            end = e.value.oldValue[1]
            diff = Math.abs(start - end)
            $(slider).slider('setValue', e.value.oldValue)
          }
          $(slider).prev('.slider-horizontal').find('.tick-slider-selection').text(`${diff} ${unit}`)
          $(`[name="start-time[${currentSliderId}]"]`).val(start)
          $(`[name="end-time[${currentSliderId}]"]`).val(end)
          updatePrice()
        })

        // on init
        const defaultValue = $(slider).slider('getValue')
        updatePrice()

        const diff = Math.abs(defaultValue[0] - defaultValue[1])
        $(slider).prev('.slider-horizontal').find('.tick-slider-selection').text(`${diff} ${unit}`)
        // update form control
        $(`[name="start-time[${currentSliderId}]"]`).val(defaultValue[0])
        $(`[name="end-time[${currentSliderId}]"]`).val(defaultValue[1])
      }
    })
  }
  function updatePrice () {
    let wholePrice = 0
    $('.start-time').each(function (key, select) {
      const currentSliderId = $(select).attr('data-slider')
      const startTime = $(select).val()
      const endTime = $(`[name="end-time[${currentSliderId}]"]`).val()
      const diff = Math.abs(startTime - endTime)
      wholePrice += round(diff * price, 0)
      monthlyPrice.text(wholePrice)
    })
  }
})
