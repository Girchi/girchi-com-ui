import 'bootstrap-select'
import 'bootstrap-select/sass/bootstrap-select.scss'

$('.select').selectpicker({
  showContent: true
})

$('.form-control select').on('change', (e) => {
  if (e.target.value.toString().length) {
    $(e.target).addClass('selected')
  } else {
    $(e.target).removeClass('selected')
  }
})
