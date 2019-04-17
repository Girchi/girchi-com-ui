// Checkbox
$('.form-checkbox-input [type="checkbox"]').on('change', (e) => {
  const parent = $(e.target).parent()
  if (e.target.checked) {
    parent.addClass('checked')
  } else {
    parent.removeClass('checked')
  }
})
