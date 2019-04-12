import $ from 'jquery'
import '../index.html'
import '../styles/index.scss'
import 'bootstrap/js/src/index'

// Checkbox

$('.form-checkbox-input [type="checkbox"]').on('change', (e) => {
  if (e.target.checked) {
    $(e.target).parent().addClass('checked')
  } else {
    $(e.target).parent().removeClass('checked')
  }
})
