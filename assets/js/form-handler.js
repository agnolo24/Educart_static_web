// Form submission handler
const scriptURL = 'https://script.google.com/macros/s/AKfycbyk9WY2lkpt3_oCjYpA32nNLHgrpK87OTz1lJqxjQv6XZgLaxASi7ndOe7rnZn-Byia/exec' // You'll need to replace this
const form = document.forms['submit-to-google-sheet']
const loading = document.querySelector('.loading')
const successMessage = document.querySelector('.sent-message')
const errorMessage = document.querySelector('.error-message')

form.addEventListener('submit', e => {
  e.preventDefault()
  
  // Show loading state
  loading.style.display = 'block'
  errorMessage.style.display = 'none'
  successMessage.style.display = 'none'
  
  fetch(scriptURL, {
    method: 'POST',
    body: new FormData(form)
  })
  .then(response => {
    if (response.ok) {
      successMessage.style.display = 'block'
      form.reset()
    } else {
      throw new Error('Network response was not ok')
    }
  })
  .catch(error => {
    console.error('Error!', error.message)
    errorMessage.textContent = 'Error sending message. Please try again.'
    errorMessage.style.display = 'block'
  })
  .finally(() => {
    loading.style.display = 'none'
  })
})
