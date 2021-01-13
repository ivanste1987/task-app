const toggle = () => {
    const form = document.querySelectorAll('form')
    form.forEach((f) => {
        f.classList.toggle('change')
    })
}