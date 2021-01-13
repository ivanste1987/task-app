/* Singup form  */
const singupform = document.querySelector('#singup-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const name = document.querySelector('#name');
const age = document.querySelector('#age');
const welContainer = document.querySelector('#welcomeMsg')

const welMsg = document.createElement('H4')
welMsg.classList.add('display-4')

welContainer.appendChild(welMsg)

singupform.addEventListener('submit', (event) => {
    event.preventDefault();

    axios.post('http://localhost:3000/users', {
        email: email.value,
        password: password.value,
        age: age.value,
        name: name.value
    }).then((response) => {
        welMsg.innerHTML = response.data.message
        if(welMsg.innerHTML !== undefined){
            welContainer.style.visibility = 'visible'
        }
    })
})

/*Login form */
const loginForm = document.querySelector('#login-form');
const userEmail = document.querySelector('#user-email');
const userPassword = document.querySelector('#user-password');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault()

  

    axios.post('http://localhost:3000/users/login', {
        email: userEmail.value,
        password: userPassword.value
    }).then((response) => {
        console.log(response)
        axios.create({'Authorization': `Bearer ${response.data.token}`})
        window.location.href = 'http://127.0.0.1:5500/task-app/public/pages/tasks.html'
    }).catch()
   
})
