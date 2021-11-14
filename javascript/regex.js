/* Controle du Formulaire grace à regex*/

const validField = (element, regex, errorMessage) => {

    let value = element.value.trim()
    let small = element.nextElementSibling

    if( !regex.test(value) ) {
        small.innerText = errorMessage
        small.classList = 'text-danger'
        return false
    } else {
        small.innerHTML = ''
        return true
    }
}

const regex = {
    mail : new RegExp('^[a-z0-9.-_]+[@]{1}[a-z0-9._-]+[.]{1}[a-z]{2,}$','gi'), 
    name : new RegExp('^[a-zéèêïëà -]{2,}$','gi'),
    zipCode : new RegExp ('^[0-9]{1,6}$', 'g'),
    address : new RegExp ('^[a-z0-9éèêëïà, -]{3,}$', 'gi')
}


let form = document.getElementById("form")

let fields = [{
    element : form.firstName, 
    expression : regex.name,
    errorMessage : 'Le prénom n\'est pas correct'
}, 
{
    element : form.lastName, 
    expression : regex.name,
    errorMessage : 'Le nom n\'est pas correct'
}, 
{
    element : form.mail, 
    expression : regex.mail,
    errorMessage : 'Adresse mail non valide'
}, 
{
    element : form.address, 
    expression : regex.address,
    errorMessage : 'L\'adresse n\'est pas valide'
}, 
{
    element : form.zipCode, 
    expression : regex.zipCode,
    errorMessage : 'Code postal non valide'
}, 
{
    element : form.city, 
    expression : regex.name,
    errorMessage : 'La ville n\'est pas valide'
}]

const validForm = () => {
    for (let field of fields) {
        console.log(field.element)
        field.element.addEventListener('change', function() {
            validField(field.element, field.expression, field.errorMessage)
        })
    }
}



// ************************************

const regex = {
    mail : /^[a-z0-9.-_]+[@]{1}[a-z0-9._-]+[.]{1}[a-z]{2,}$/gi, 
    name : /^[a-zéèêëïà -]{3,}$/gi,
    zipCode : /^[0-9]{1,6}$/g,
    address : /^[a-z0-9éèêëïà, -]{3,}$/gi
}


// *************************************
/* Controle du Formulaire grace à regex*/

const validField = (element, regexTest, errorMessage) => {

    let value = element.value.trim()
    let small = element.nextElementSibling

    if( !regexTest.test(value) ) {
        small.innerText = errorMessage
        small.classList = 'text-danger'
        return false
    } else {
        small.innerHTML = ''
        return true
    }
}

const regex = {
    mail : /^[a-z0-9.-_]+[@]{1}[a-z0-9._-]+[.]{1}[a-z]{2,}$/gi, 
    name : /^[a-zéèêëïà -]{3,}$/gi,
    zipCode : /^[0-9]{1,6}$/g,
    address : /^[a-z0-9éèêëïà, -]{3,}$/gi
}

let form = document.getElementById("form")

let fields = [{
    element : form.firstName, 
    expression : regex.name,
    errorMessage : 'Le prénom n\'est pas correct'
}, 
{
    element : form.lastName, 
    expression : regex.name,
    errorMessage : 'Le nom n\'est pas correct'
}, 
{
    element : form.mail, 
    expression : regex.mail,
    errorMessage : 'Adresse mail non valide'
}, 
{
    element : form.address, 
    expression : regex.address,
    errorMessage : 'L\'adresse n\'est pas valide'
}, 
{
    element : form.zipCode, 
    expression : regex.zipCode,
    errorMessage : 'Code postal non valide'
}, 
{
    element : form.city, 
    expression : regex.name,
    errorMessage : 'La ville n\'est pas valide'
}]

const validForm = () => {

    form.addEventListener('submit', function(e) {
        
        let success = false
        
        for (let field of fields) {
            validField(field.element, field.expression, field.errorMessage)
            success *= test
        }
        
        e.preventDefault()
    })
}
