import $ from 'jquery'
import '../index.html'
import '../styles/index.scss'
import 'bootstrap/js/src/index'

$(document).ready(() => {
  // Checkbox
  $('.form-checkbox-input [type="checkbox"]').on('change', (e) => {
    const parent = $(e.target).parent()
    if (e.target.checked) {
      parent.addClass('checked')
    } else {
      parent.removeClass('checked')
    }
  })

  // GeD Progress
  const renderGeDProgress = () => {
    const windowWidth = $(window).width()
    const progressBarGutter = 50
    const gedProgress = $('.js-ged-progress')
    const gedProgressBar = gedProgress.find('.progress-bar')
    const gedProgressTotal = gedProgress.find('.progress-bar-total')
    const gedProgressTotalWidth = gedProgressTotal.width() + progressBarGutter
    const gedProgressValue = gedProgressBar.attr('aria-valuenow')
    const gedProgressBarWidth = windowWidth * gedProgressValue / 100

    gedProgressBar.css({ width: `${gedProgressValue}%` })
    // if gedProgressValue is closer to gedProgressTotal
    if (windowWidth - gedProgressTotal.width() - progressBarGutter < gedProgressBarWidth) {
      // add padding right to progress bar label
      const paddingRight = gedProgressTotalWidth * (gedProgressValue / 100)
      gedProgressBar.css({ paddingRight })
    }
  }
  setTimeout(renderGeDProgress, 500)
  $(window).on('resize', renderGeDProgress)
})
