import 'bootstrap-select'
import 'bootstrap-select/sass/bootstrap-select.scss'

$('.select').selectpicker({
  showContent: true,
  dropupAuto: false,
  size: 5
})

$('.form-control select').on('change', (e) => {
  if (e.target.value.toString().length) {
    $(e.target).addClass('selected')
  } else {
    $(e.target).removeClass('selected')
  }
})

