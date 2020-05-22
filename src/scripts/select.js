import 'bootstrap-select'
import 'bootstrap-select/sass/bootstrap-select.scss'

$('.select').selectpicker({
  showContent: true,
  dropupAuto: false,
  size: 5
})
function onHeaderClick () {
  const optGroupIndex = $('.dropdown-header')
    .toArray()
    .indexOf(this)
  const originalSelect = $(this)
    .parents('.bootstrap-select')
    .find('select')
  const currentOptgroup = originalSelect.find('optgroup').eq(optGroupIndex)
  const currentValue = originalSelect.selectpicker('val')

  if ($(this).hasClass('selected')) {
    $.each(currentOptgroup.find('option'), function (index, option) {
      delete currentValue[currentValue.indexOf($(option).val())]
    })
  } else {
    $.each(currentOptgroup.find('option'), function (index, option) {
      currentValue.push($(option).val())
    })
  }

  originalSelect.selectpicker('val', currentValue)
  originalSelect.selectpicker('render')
}

// Remove single filter

$('body').delegate('.filter-chip', 'click', function () {
  const parent = $($(this).attr('data-parent'))
  const value = $(this).attr('data-value')
  const selectedFilters = $(parent).selectpicker('val')

  $(parent).selectpicker('val', selectedFilters.filter(f => f !== value))
})

// Clear Filter
$('.js-clear-filter').on('click', function () {
  $.each($('select.select'), function (index, select) {
    $(select).selectpicker('deselectAll')
  })
})
// Insert filters into filters bar
function syncFiltersAndFiltersBar () {
  const filtersContainer = $('.filter-selected-chips-list')
  filtersContainer.html('')

  $.each($('select.select'), function (index, select) {
    const values = $(select).selectpicker('val')

    $.each(values, function (i, value) {
      const opt = $(select).find(`option[value="${value}"]`)[0]
      const label = opt.label
      const val = opt.value

      filtersContainer.append(
        `<button class="filter-chip" data-value="${val}" data-parent="#${$(
          select
        ).attr('id')}">${label}</button>`
      )
    })
  })
}

$('.select')
  .selectpicker({
    showContent: true,
    dropupAuto: false,
    size: 5
  })
  .on('changed.bs.select', function (e) {
    const originalSelect = $(e.currentTarget)[0]

    if ($(originalSelect).hasClass('tree-select')) {
      // Tree
      $(e.currentTarget)
        .parent()
        .find('.dropdown-menu .dropdown-header')
        .removeClass('selected')

      $.each($(originalSelect).find('optgroup'), function (ogIndex, optgroup) {
        let totalOptions = 0
        let totalSelected = 0

        $.each($(optgroup).find('option'), function (opIndex, option) {
          totalOptions++
          if ($(option).is(':selected')) {
            totalSelected++
          }
        })

        if (totalOptions === totalSelected) {
          $(e.currentTarget)
            .parent()
            .find(`.dropdown-menu .dropdown-header`)
            .eq(ogIndex)
            .addClass('selected')
        }
      })
    }

    // Filter bar
    syncFiltersAndFiltersBar()
  })
  .on('shown.bs.select', function () {
    $('.tree-select ~ .dropdown-menu .dropdown-header').on(
      'click',
      onHeaderClick
    )
  })
  .on('hidden.bs.select', function () {
    $('.tree-select ~ .dropdown-menu .dropdown-header').unbind()
  })

$('.form-control select').on('change', (e) => {
  if (e.target.value.toString().length) {
    $(e.target).addClass('selected')
  } else {
    $(e.target).removeClass('selected')
  }
})

