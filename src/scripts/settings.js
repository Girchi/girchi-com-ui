import intlTelInput from 'intl-tel-input'
import utils from 'intl-tel-input/build/js/utils.js'
import 'intl-tel-input/build/css/intlTelInput.css'

var countryData = window.intlTelInputGlobals.getCountryData()
var input = document.querySelector('#phone')

for (var i = 0; i < countryData.length; i++) {
  var country = countryData[i]
  country.name = country.name.replace(/.+\((.+)\)/, '$1')
}

if (input) {
  intlTelInput(input, {
    hiddenInput: 'full_phone',
    autoPlaceholder: 'aggressive',
    preferredCountries: [],
    initialCountry: 'ge',
    utilsScript: utils
  })
}
