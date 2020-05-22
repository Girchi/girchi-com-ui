$(document).ready(function () {
  $('.notifications__icon').on('click', (e) => {
    $('.notifications__notifi-box').toggle()
  })
})

// Send Notifications
const attachmentInput = $('.js-notification-attachment')
const attachmentContainer = $('#notification-attachment-container')
const files = []

function humanFileSize (bytes) {
  if (bytes === 0) { return '0.00 B' }
  var e = Math.floor(Math.log(bytes) / Math.log(1024))
  return (bytes / Math.pow(1024, e)).toFixed(2) + ' ' + ' KMGTP'.charAt(e) + 'B'
}

function renderAttachments () {
  attachmentContainer.html('')

  files.forEach(function ({ name, size }, index) {
    attachmentContainer.append(`
       <div class="notification-attachment">
          <span>${name}</span>
          <small>(${humanFileSize(size)})</small>
          <button class="js-notification-attachment-delete" data-index="${index}">&times;</button>
       </div>
    `)
  })
}

$('.js-notification-attachment').on('click', function (e) {
  $($(this).attr('data-target')).click()
})

attachmentInput.on('change', function (e) {
  Array.from(e.target.files).forEach(function (file) {
    files.push(file)
  })

  $(this).val('')
  renderAttachments()
})

$('body').delegate('.js-notification-attachment-delete', 'click', function (e) {
  const index = parseInt($(this).attr('data-index'))

  delete files[index]

  renderAttachments()
})
