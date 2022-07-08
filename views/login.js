const form = document.getElementById('form')
const emailI = document.getElementById('email')
const passwordI = document.getElementById('password')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = emailI.value
  const password = passwordI.value
  console.log(email)

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log('object')
      var user = userCredential.user
      // ...
    })
    .catch((error) => {
      var errorCode = error.code
      var errorMessage = error.message
    })
})
