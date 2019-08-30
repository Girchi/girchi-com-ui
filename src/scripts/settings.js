import intlTelInput from "intl-tel-input";
import utils from "intl-tel-input/build/js/utils.js";
import "intl-tel-input/build/css/intlTelInput.css";

let countryData = window.intlTelInputGlobals.getCountryData();
let input = document.querySelector(".int-phone");
const popoverinput = $(input).closest("validation-message");

popoverinput.popover({
  trigger: "blur",
  fallbackPlacement: ["top"],
  placement: "top",
  template:
    '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body max-w-180 font-size-1 px-2 text-danger"></div></div>'
});

for (let i = 0; i < countryData.length; i++) {
  let country = countryData[i];
  country.name = country.name.replace(/.+\((.+)\)/, "$1");
}

if (input) {
  var iti = intlTelInput(input, {
    hiddenInput: "full_phone",
    autoPlaceholder: "aggressive",
    preferredCountries: [],
    initialCountry: "ge",
    utilsScript: utils
  });
}

input.addEventListener("blur", function() {
  if (input.value.trim()) {
    if (iti.isValidNumber()) {
      input.closest(".form-group").classList.add("is-valid");
      input.closest(".form-group").classList.remove("is-invalid");
      popoverinput.popover("hide");
    } else {
      input.closest(".form-group").classList.add("is-invalid");
      input.closest(".form-group").classList.remove("is-valid");
      popoverinput.popover("show");
    }
  }
});
