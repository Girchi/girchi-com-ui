import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/build/css/intlTelInput.css'

var countryData = window.intlTelInputGlobals.getCountryData()
var input = document.querySelector('#phone')

for (var i = 0; i < countryData.length; i++) {
  var country = countryData[i]
  country.name = country.name.replace(/.+\((.+)\)/, '$1')
}

intlTelInput(document.querySelector('[type="phone"]'), {
  hiddenInput: 'full_phone',
  autoPlaceholder: 'aggressive',
  preferredCountries: [],
  initialCountry: 'ge',
  utilsScript: '/node_modules/intl-tel-input/build/js/utils.js?1560794689211'
})
