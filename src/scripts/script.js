// Dropdown
function dropdown () {
  if (!document.querySelector('[data-dropdown]')) return

  const dropdowns = document.querySelectorAll('[data-dropdown]')

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('click', function () {
      if (this.classList.contains('active')) {
        closeDropdown(dropdown)
      } else {
        dropdowns.forEach((dropdown) => closeDropdown(dropdown))
        openDropdown(dropdown)
      }
    })
  })
}

function openDropdown (dropdown) {
  const icon = dropdown.querySelector('.fa-solid')
  dropdown.classList.add('active')
  icon.classList.add('fa-angle-up')
  icon.classList.remove('fa-angle-down')
}
function closeDropdown (dropdown) {
  const icon = dropdown.querySelector('.fa-solid')
  dropdown.classList.remove('active')
  icon.classList.add('fa-angle-down')
  icon.classList.remove('fa-angle-up')
}

// Navigation
function toggleNavigation () {
  if (!document.querySelector('.nav') || !document.querySelector('.open-nav')) return

  const nav = document.querySelector('.nav')
  const navToggle = document.querySelector('.open-nav')

  navToggle.addEventListener('click', () => {
    nav.classList.toggle('active')
  })
}

// Popup
function popup () {
  if (!document.querySelector('.popup')) return

  const petitionPopup = document.querySelector('[data-petition]')
  const petitionBackdrop = petitionPopup.querySelector('.popup__backdrop')
  const petitionSuccessPopup = document.querySelector('[data-petition-success]')
  const successBackdrop = petitionSuccessPopup.querySelector('.popup__backdrop')
  const openPopupBtns = document.querySelectorAll('[data-open-popup]')
  const petitionForm = document.querySelector('.petition-form')

  const popupCtas = petitionSuccessPopup.querySelector('.popup__ctas')

  // Open Petition popup when button is clicked
  openPopupBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      petitionPopup.classList.add('active')
    })
  })

  // Close popups
  // close petition popup
  petitionPopup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup__close')) {
      petitionPopup.classList.remove('active')
    }
  })

  petitionBackdrop.addEventListener('click', () => {
    petitionPopup.classList.remove('active')
  })

  // close success message popup
  petitionSuccessPopup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup__close')) {
      petitionSuccessPopup.classList.remove('active')
      removeSuccessAnimation(petitionSuccessPopup)
      popupCtas.classList.remove('shown')
    }
  })

  successBackdrop.addEventListener('click', () => {
    petitionSuccessPopup.classList.remove('active')

    removeSuccessAnimation(petitionSuccessPopup)
    popupCtas.classList.remove('shown')
  })

  // Show success message popup
  petitionForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // get form data
    const name = petitionForm.name.value
    const lastname = petitionForm.lastname.value
    const phone = petitionForm.tel.value
    const privateID = petitionForm.privateID.value
    const email = petitionForm.email.value

    // for testing
    console.log(name, lastname, phone, privateID, email)

    // reset form after submit
    petitionForm.reset()

    // close stuff
    petitionPopup.classList.remove('active')
    petitionSuccessPopup.classList.add('active')
    const successAnimation = createSuccessImage()
    petitionSuccessPopup.querySelector('.popup-success').appendChild(successAnimation)
    clearTimeout(removeAnimation)
    runRemoveAnimation(petitionSuccessPopup, popupCtas)
  })
}

let removeAnimation

const runRemoveAnimation = (popup, ctas) => {
  removeAnimation = window.setTimeout(() => {
    removeSuccessAnimation(popup)
    ctas.classList.add('shown')
  }, 4500)
}

function createSuccessImage () {
  const successAnimation = document.createElement('div')
  successAnimation.classList.add('animation')
  const successAnimationImg = document.createElement('img')
  successAnimationImg.src = './src/images/Gif-Completed.gif'
  successAnimation.appendChild(successAnimationImg)
  return successAnimation
}

function removeSuccessAnimation (parent) {
  if (!document.querySelector('.animation')) return

  const animation = parent.querySelector('.animation')
  const image = animation.querySelector('img')
  image.src = ''
  animation.remove()
}

popup()
toggleNavigation()
dropdown()
