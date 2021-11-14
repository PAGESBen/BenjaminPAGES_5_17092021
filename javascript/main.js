/*fonctions d'optimisation*/

const url = "http://localhost:3000/api/teddies"

//fonction pour générer les alertes
const generateAlerte = (message, success = "danger") => {

    let div = document.createElement('div')
    div.innerText = message
    div.className(`alerte alerte-${success} notification`)
    document.getElementsByTagName( 'body' )[0].appendChild( div )
}

//fonction d'appel webservice sécurisée
let get = async (route) => {
	let response = await fetch(url + route)
	if( response.ok ) {
		return response.json()
	} else if (response.status === 404) {
        generateAlerte("ce produit n'existe pas")
    }
	else {
		throw "Erreur sur la requête"
    }
}

//Variable du panier

let cartQuantity = document.getElementById('cartCount')
let cart = JSON.parse(localStorage.getItem("productsListInCart"))

// fonctions pour la création d'éléments dans le DOM

const generateDiv = (className = '') => {
    let div = document.createElement('div')
    div.className = className
    return div
}

const generateImg = (className = '', alt, src) => {
    let img = document.createElement('img')
    img.src = src
    img.className = className
    img.alt = alt
    return img
}

const generateTitle = (level, className = '', content) => {
    let title = document.createElement(`h${level}`)
    title.className = className
    title.textContent = content
    return title
}

const generateP = (className = '', content) => {
    let p = document.createElement('p')
    p.className = className
    p.textContent = content
    return p
}

const generateLink = (className, href, label) => {
    let a = document.createElement('a')
    a.className = className
    a.href = href
    a.textContent = label
    return a
}

const generateStrong = (content) => {
    let strong = document.createElement('strong')
    strong.innerText = content
    return strong
}

const generateSmall = (content) => {
    let small = document.createElement('small')
    small.innerText = content
    return small
}

const generateBr = () => {
    let br = document.createElement('br')
    return br
}

const generateText = (content) => {
    return document.createTextNode(content)
}

const generatePrice = (price) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
}

const generateSelect = (options = {}, defaultValue = null) => {
    let select = document.createElement('select')

    for (let value in options){
        let option = document.createElement('option')
        option.value = value
        option.innerText = options[value]
        select.appendChild(option)
    }
    if (defaultValue !== null) {
        select.value = defaultValue
    }
    return select
}

const generateButton = (className = '', content) => {
    let button = document.createElement('button')
    button.className = className
    button.innerHTML = content

    return button
}

const generateIcon = (className) => {
    let icon = document.createElement('i')
    icon.className = className
    return icon
}


/*FONCTIONS POUR MANIPULER LE PANIER*/

let updateCart = async (productId, color, qty) => {

    let found = false

    for(item of cart) {
        if(item.ref === productId && item.color === color) {
            item.quantity = qty
            found = true
            break
        }
    }

    if( ! found ) {
        cart.push( {
            ref : productId,
            color : item.color,
            quantity : qty
        })
    }

    localStorage.setItem("productsListInCart", JSON.stringify(cart)) // met à jour le local storage 

}


let removeItemInCart = (productId, color) => {
    let i=0

    for(item of cart) {
        i++
        if(item.ref === productId && item.color === color) {
            cart.splice(i-1, 1)
            break
        }
    }
    localStorage.setItem("productsListInCart", JSON.stringify(cart)) // met à jour le local storage 
}

/*---------------------------------------------------------------------------------------*/
//déclaration de la fonction runIndex de la page Index

async function runIndex() {

    let products = await get('/')

    for (let peluche of products) {

        console.log(peluche)
        
        //generation les elements du dom -- const newElt = document.createElement("div") + ajout de leur classes nomElement.classList.add("", "", "", "");

        // On va récuperer le contener principal dans le DOM -- let elt = document.getElementById('main');
        let mainContainer = document.getElementById('productslist')

        const col = generateDiv("col-12 col-lg-4")
        mainContainer.appendChild(col)

        const card = generateDiv("card m-2")
        col.appendChild(card)

        const productImg = generateImg('card-img-top', `photo du produit ${peluche.name}`, peluche.imageUrl)
        card.appendChild(productImg)

        const cardBody = generateDiv("card-body")
        card.appendChild(cardBody)

        const name = generateTitle(2 ,"card-title text-center", peluche.name)
        cardBody.appendChild(name)

        const description = generateP("card-text", peluche.description)
        cardBody.appendChild(description)

        const price = generateP("card-text", `Prix : ${peluche.price} €` )
        cardBody.appendChild(price)

        const button = generateLink("btn btn-primary stretched-link m-2", `./product.html?id=${peluche._id}`, "Voir l'article")
        card.appendChild(button)
    }
}


/*---------------------------------------------------------------------------------------*/
//déclaration de la fonction runProduct de la page Product

//1. récupération de l'id du produit dans l'URL

//a.recuperation de la chaine de caractère de l'url 
const queryString_url = window.location.search

//b.recupération de l'ID uniquement dans une constante "id"
const urlSearchParams = new URLSearchParams(queryString_url)
const id = urlSearchParams.get("id")

async function runProduct() {
    
    //2. Appel webservice
    let product = await get(`/${id}`)

    //3. Recuperer et compléter les elements à compléter dans le DOM :

    const productImg = document.getElementById("productImg")
    productImg.setAttribute("src", product.imageUrl)
    productImg.setAttribute("alt", `photo du produit ${product.name}`)

    const productName = document.getElementById("name")
    productName.textContent = product.name

    const description = document.getElementById("description")
    description.textContent = product.description

    const price = document.getElementById("price")
    price.textContent = product.price /100

    //Boucle for pour le menu déroulant des couleurs
    for (i=0; i < product.colors.length; i++){

        //Creation de l'element option du menu déroulant
        const colorList = document.createElement("option")
        colorList.setAttribute("value", product.colors[i])


        //Ajout du contenu aux <options>
        colorList.textContent = product.colors[i]

        //Ajout des couleurs dans le DOM
        const colorMenu = document.getElementById("selectColor")
        colorMenu.appendChild(colorList)  

    }

    const addToCartButton = document.querySelector("#AddToCartButton")
    addToCartButton.addEventListener("click", function(e) {

        // 3. Créer la constante correspondant à l'indexe de la couleur du produit
        const colorId = document.querySelector("select")     // Aller chercher l'input select contenant les couleurs
        let colorSelected = colorId.value    //Recuperer la valeur du menu déroulant

        //4. Creer l'objet à ajouter dans le produit
        if (colorSelected == "NaV") {
            colorId.classList.add("border-danger") //encadré rouge si la couleur n'a pas été choisie
        } else { // sinon créer l'objet du produit à ajouter dans le panier
            colorId.classList.remove("border-danger")
            let productToAddinCart = {
                ref: id,
                color: colorSelected,
                quantity: 1
            }

            //5. Ajouter le produit dans le local storage

            if (cart) { //Si il y a déjà quelque chose dans le panier

                let productAlreadyInCart = false // variable qui m'indique si le produit est déjà dans le panier ou non

                for (let i = 0; i < cart.length; i++) { // pour chaque produit dans le panier
                    if (cart[i].ref == productToAddinCart.ref && cart[i].color == productToAddinCart.color) { //si la reference et la couleur est la même 
                        cart[i].quantity = cart[i].quantity + 1 // ajoute une quantité
                        productAlreadyInCart = true //préviens que le produit était déjà dans le panier
                    }
                }

                if (!productAlreadyInCart) { //si le produit n'est pas dans le panier
                    cart.push(productToAddinCart)
                }
                localStorage.setItem("productsListInCart", JSON.stringify(cart)) // met à jour le local storage 

            } else {
                cart = [] //crée un tableau qui contiendra la liste des produits du panier
                cart.push(productToAddinCart) //Ajoute le produit dans la liste
                localStorage.setItem("productsListInCart", JSON.stringify(cart)) // envoie dans le local storage
            }
        }

        countCart()
    })

}

/*------------------------------------------------------------------------------------------------------*/
// compte du panier 

let countCart = async () => {

    let numberOfProductsInCart = 0

    if (cart) {
        for (let i = 0; i < cart.length; i++) {
            numberOfProductsInCart = numberOfProductsInCart + cart[i].quantity
        }
    } else {
        numberOfProductsInCart = 0
    }

    if (numberOfProductsInCart == 0) {
        cartQuantity.classList.add("d-none")
    } else {
        cartQuantity.classList.remove("d-none")
        cartQuantity.textContent = numberOfProductsInCart
    }
}


/*-------------------------------------------------*/
let cacheProducts = {}

async function runCart() {

    if (!cart || cart.length === 0) {

        let main = document.getElementById('main')
        main.innerHTML = ''

        let row = generateDiv('row my-5')
        main.appendChild(row)

        let col = generateDiv('col-12 text-center h1')
        row.appendChild(col)

        let icon = generateIcon('bi bi-exclamation-circle-fill')
        col.appendChild(icon)

        col.appendChild(generateBr())

        let message = generateText('Votre panier est vide')
        col.appendChild(message)

    } else {

        let total = 0
        let cartContainer = document.getElementById('product-table')

        for (let item of cart) {
            if (cacheProducts[item.ref] === undefined) {
                let product = await get(`/${item.ref}`)
                cacheProducts[item.ref] = product
            }

            let product = cacheProducts[item.ref]

            const row = generateDiv('row')
            cartContainer.appendChild(row)

            const colImg = generateDiv('col-md-1 my-2')
            row.appendChild(colImg)

            const img = generateImg('img-fluid', `photo du produit ${product.name}`, cacheProducts[item.ref].imageUrl)
            colImg.appendChild(img)

            const colTitle = generateDiv('col-md-5')
            row.appendChild(colTitle)
            colTitle.appendChild(generateStrong(`${cacheProducts[item.ref].name} - (${item.color}) `))
            colTitle.appendChild(generateBr())
            colTitle.appendChild(generateSmall(item.ref))

            const colPrice = generateDiv('col-md-2')
            colPrice.appendChild(generateText(generatePrice(cacheProducts[item.ref].price / 100)))
            row.appendChild(colPrice)


            //Menu déroulant avec les quantités
            let options = {}
            for (let i = 1; i <= 99; i++) {
                options[i] = i
            }
            let select = generateSelect(options, item.quantity)
            const colQuantity = generateDiv('col-md-2')
            colQuantity.appendChild(select)
            row.appendChild(colQuantity)

            select.addEventListener('change', () => {
                updateCart(item.ref, item.color, Number(select.value))
                countCart()
                refreshCart()
            })

            const removeProduct = generateButton(
                "btn btn-outline-danger mx-1",
                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>`
            )
            colQuantity.appendChild(removeProduct)

            removeProduct.addEventListener("click", () => {
                removeItemInCart(item.ref, item.color)
                countCart()
                refreshCart()
            })

            const colTotal = generateDiv('col-md-2')
            colTotal.appendChild(generateText(generatePrice((cacheProducts[item.ref].price * item.quantity) / 100)))
            row.appendChild(colTotal)

            total = total + (cacheProducts[item.ref].price * item.quantity / 100)
        }

        const totalCart = generateDiv('row')
        totalCart.appendChild(generateText(`Montant total = ${generatePrice(total)}`))
        cartContainer.appendChild(totalCart)
    }
}

const refreshCart = () => {
    let cartContainer = document.getElementById('product-table')
    cartContainer.innerHTML = ''
    runCart()
}

/* Controle du Formulaire grace à regex*/

const validField = (element, expression, errorMessage) => {

    let value = element.value.trim()
    let small = element.nextElementSibling

    if( !expression.test(value) ) {
        small.innerText = errorMessage
        small.classList = 'text-danger'
        return false
    } else {
        small.innerHTML = ''
        return true
    }
}

const regex = {
    mail : /^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,}$/i, 
    name : /^[a-zéèêïëà -]{2,}$/i,
    zipCode : /^[0-9]{1,6}$/,
    address : /^[a-z0-9éèêëïà, -]{3,}$/i
}


const validForm = () => {

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


    for (let field of fields) {

        // console.log(field.element, field.expression, field.errorMessage)
        
        field.element.addEventListener('change', function() {
            validField(field.element, this, field.errorMessage)
        })

    }
}




// ******************fetch d'envoi*******************************
 
// const send = async (data) => {

//     let response = await fetch( url +"/order", {
//         method : 'POST', 
//         headers : {
//             'Content-Type': 'application/json'     
//         }, 
//         body: JSON.stringify(data)
//     })
// }

// const submit = async () => {
//     document.getElementById('submitCommand').addEventListener('click', (e){

//         let sender = {
//             firstName: form.firstName.value,
//             lastName: form.lastName.value,
//             address: form.address.value,
//             mail: form.mail.value,
//             city: form.city.value
//         }

//         let products = []

//         for (let item of cart) {
//             for (let i = 0; i < item.quantity; i++) {
//                 command.push(item.ref)
//             }
//         }

//         send({
//             contact: sender,
//             command: products
//         })
//     })

// }


// *****************************************************************

// async function send(e) {

//     let contact = {
//         firstName : form.firstName.value, 
//         lastName : form.lastName.value,
//         adress : form.adress.value,
//         mail : form.adress.mail,
//         city : form.city.value
//     }

//     let command = []

//     for(let item of cart) {
//         for (let i = 0; i < item.quantity; i++) {
//             command.push(item.ref)
//         }
//     }

//     fetch( url +"/order", {
//       method: "POST",
//       headers: {
//         'Accept': 'application/json', 
//         'Content-Type': 'application/json'
//       },
      
//       body: {
//           contact : contact, 
//           products : command
//         }

//     })
//     .then(function(res) {
//       if (res.ok) {
//         return res.json();
//       }
//     })
//     // .then(function(value) {
//     //     document
//     //       .getElementById("result")
//     //       .innerText = value.postData.text;
//     // });
//   }
  
//   function submitCommand() {
//   document
//     .getElementById("form")
//     .addEventListener("submit", send);
// }