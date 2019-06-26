$(document).ready(() => {
  let usedPercentage = 0
  // Calculate available percentage value
  const calcAvailablePercentage = () => {
    const availablePercentageEl = $('.pl-available-percentage')
    const percentageEl = $('input[id="percent"]')
    const selectEl = $('.select[id="politician"]')
    let total = 0
    $.each($('.pl-group-item'), (index, el) => {
      const value = $(el).find('input.form-control').val()
      if (value >= 0 && !value.includes('-')) {
        total += (value.length ? parseFloat(value) : 0)
      }
    })
    usedPercentage = total
    availablePercentageEl.text(`${total > 100 ? 0 : 100 - total}%`)
    if (total >= 100) {
      percentageEl.prop('disabled', true)
      selectEl.prop('disabled', true)
    } else {
      percentageEl.prop('disabled', false)
      selectEl.prop('disabled', false)
    }
    selectEl.selectpicker('refresh')
  }
  const listGroupEl = $('.pl-group')
  // Generate list item template
  const listItemTemplate = (index, percentage, { avatar, firstName, lastName, position, id }) => `
   <li class="list-group-item pl-group-item">
      <div
        class="d-flex w-100 align-items-center py-0 py-sm-3 px-0 flex-wrap flex-md-nowrap"
      >
        <div
          class="rounded-circle overflow-hidden d-inline-block mx-auto mx-sm-0 mb-3 mb-sm-0"
        >
          <img
            src="${avatar}"
            width="60"
            class="rounded"
            alt="${firstName} ${lastName}"
          />
        </div>
        <h6
          class="text-center text-sm-left w-100 w-sm-auto text-uppercase line-height-1-2 font-size-4 font-size-md-3 font-size-xl-4 mb-0 mx-2 mx-xl-3"
        >
          <span class="text-decoration-none d-inline-block">
            <span>${firstName}</span>
            <span class="font-weight-bold">${lastName}</span>
          </span>
          <span
            class="d-flex  font-size-1 font-size-lg-3 text-grey mt-1 justify-content-center justify-content-sm-start"
          >${position}</span>
        </h6>
        <div
          class="font-size-4 font-size-xl-5 ml-0 ml-md-auto w-100 w-md-auto pt-3 pt-sm-4 p-md-0 border-top border-top-md-0 mt-3 mt-md-0 text-center"
        >
          <span
            class="font-size-1 font-size-md-3 text-grey font-weight-bold"
            >მხარდაჭერა</span
          >
          <input
            type="hidden"
            name="list[${index}][politician]"
            value="${id}"
          />
          <input
            type="number"
            class="form-control form-control-spin-none border form-control-lg py-3 px-1 px-sm-4 ml-2 d-inline-block mr-0 font-size-4 font-weight-bold text-center max-px-sm-100 max-px-75"
            placeholder="0"
            min="0"
            name="list[${index}][percentage]"
            value="${percentage}"
          />
          <span class="ml-1 mr-0 mr-md-2 font-size-5">%</span>
          <button
            class="btn font-size-4 p-0 shadow-none text-dark-silver ml-0 ml-md-2 text-hover-danger pl-delete"
          >
            <i class="icon-delete"></i>
          </button>
        </div>
      </div>
    </li>
  `
  // handle item delete
  $('body').delegate('.pl-delete', 'click', function () {
    const select = $('.select[id="politician"]')
    const id = $(this).parents('li').find('input[type="hidden"]').val()
    // Remove item
    $(this).parents('li').remove()
    // enable deleted option
    select.find('option[value="' + id + '"]').removeAttr('disabled')
    // refresh select
    select.selectpicker('refresh')
    // recalculate available percentage value
    calcAvailablePercentage()
  })
  // handle politician select
  $('.select[id="politician"]').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    if (e.target.value.length === 0) return
    const input = $(this).parents('li').find('input[id="percent"]')
    const percentage = input.val()
    const itemsCount = listGroupEl.find('.pl-group-item').length
    const selectedOption = $(this).find('option').get(clickedIndex)
    const selectedOptionContent = $($(selectedOption).attr('data-content'))
    const avatar = selectedOptionContent.find('.pl-politician-avatar').attr('src')
    const firstName = selectedOptionContent.find('.pl-politician-first-name').text()
    const lastName = selectedOptionContent.find('.pl-politician-last-name').text()
    const position = selectedOptionContent.find('.pl-politician-position').text()
    const id = $(this).val()
    const politician = { avatar, firstName, lastName, position, id }
    // disabled selected option
    $(selectedOption).attr('disabled', 'disabled')
    // reset input value
    input.val('')
    // reset select value
    $(this).selectpicker('val', '')
    // refresh select
    $(this).selectpicker('refresh')
    // Add list item
    listGroupEl.find('.list-group-item.last ').before(listItemTemplate(itemsCount, percentage, politician))
    // recalculate available percentage value
    calcAvailablePercentage()
  })

  // prevent enter more then max value

  $('input[id="percent"]').on('input', function (e) {
    let value = e.target.value.includes('-') || e.target.value === '' ? -1 : e.target.value
    value = parseFloat(value)

    if (value >= 0) {
      if (usedPercentage + value > 100) {
        $(this).val(100 - usedPercentage)
      }
    } else {
      $(this).val(0)
    }
  })
  $('body').delegate('.pl-group-item .form-control', 'input', function (e) {
    calcAvailablePercentage()
    let value = e.target.value.includes('-') || e.target.value === '' ? -1 : e.target.value
    value = parseFloat(value)

    if (value >= 0) {
      if (usedPercentage > 100) {
        $(this).val(value - (usedPercentage - 100))
      }
    } else {
      $(this).val(0)
    }
  })
  // show available percentage on focus
  $('input[id="percent"]').on('focus', function () {
    $(this)
      .popover('dispose')
      .popover({
        content: $(this).attr('data-msg-text').replace('{value}', (100 - usedPercentage)),
        trigger: 'manual',
        placement: 'top'
      })
      .popover('toggle')
  }).on('blur', function () {
    $(this).popover('toggle')
  })

  $('body').delegate('.pl-group-item .form-control', 'focus', function () {
    const value = $(this).val().length ? parseFloat($(this).val()) : 0

    $(this)
      .popover('dispose')
      .popover({
        content: $('input[id="percent"]').attr('data-msg-text').replace('{value}', (100 - usedPercentage + value)),
        trigger: 'manual',
        placement: 'top'
      })
      .popover('toggle')
  }).delegate('.pl-group-item .form-control', 'blur', function () {
    $(this).popover('toggle')
  })
})
