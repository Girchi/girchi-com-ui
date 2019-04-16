
// GeD Progress

$(document).ready(() => {
  const renderGeDProgress = () => {
    const windowWidth = $(window).width()
    const progressBarGutter = 50
    const gedProgress = $('.js-ged-progress')
    const gedProgressBar = gedProgress.find('.progress-bar')
    const gedProgressTotal = gedProgress.find('.progress-bar-total')
    const gedProgressTotalWidth = gedProgressTotal.width() + progressBarGutter
    const gedProgressValue = gedProgressBar.attr('aria-valuenow')
    const gedProgressUsedValue = gedProgressBar.attr('aria-used')
    const gedProgressBarWidth = windowWidth * gedProgressValue / 100

    gedProgressBar.css({ width: `${gedProgressValue}%` })
    // if gedProgressValue is closer to gedProgressTotal
    if (windowWidth - gedProgressTotal.width() - progressBarGutter < gedProgressBarWidth) {
      // add padding right to progress bar label
      const paddingRight = gedProgressTotalWidth * (gedProgressValue / 100)
      gedProgressBar.css({ paddingRight })
    }
    // Progress value animation
    $({
      counter: 0
    }).animate({
      counter: gedProgressUsedValue
    }, {
      duration: 1500,
      easing: 'swing',
      step: function (now) {
        gedProgressBar
          .find('.progress-bar-value')
          .contents()
          .last()
          .replaceWith(Math.ceil(now).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '))
      }
    })
  }
  setTimeout(renderGeDProgress, 500)
})
