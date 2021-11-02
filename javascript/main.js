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

generateLink = (className, href, label) => {
    let a = document.createElement('a')
    a.className = className
    a.href = href
    a.textContent = label
    return a
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

}

/*------------------------------------------------------------------------------------------------------*/
// compte du panier 

let cartQuantity = document.getElementById('cartCount')
let cart = JSON.parse(localStorage.getItem("productsListInCart"))

let countCart = () => {

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

/*------------------------------------------------------------------------------------------------------*/

const addToCartButton = document.querySelector("#AddToCartButton")

addToCartButton.addEventListener("click", function addToCart(e) {

    // 3. Créer la constante correspondant à l'indexe de la couleur du produit
    const colorId = document.querySelector("select")     // Aller chercher l'input select contenant les couleurs
    let colorSelected = colorId.value    //Recuperer la valeur du menu déroulant
    
    //4. Creer l'objet à ajouter dans le produit
    if (colorSelected == "NaV") {
        colorId.classList.add("border-danger") //encadré rouge si la couleur n'a pas été choisie
    } else { // sinon créer l'objet du produit à ajouter dans le panier
        colorId.classList.remove("border-danger")
        let productToAddinCart = {
            ref : id,
            color : colorSelected,
            quantity : 1
        }

        //5. Ajouter le produit dans le local storage

        let cart = JSON.parse(localStorage.getItem("productsListInCart")) // On défini le panier dans le local storage 

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

        } else { // sinon
            cart = [] //crée un tableau qui contiendra la liste des produits du panier
            cart.push(productToAddinCart) //Ajoute le produit dans la liste
            localStorage.setItem("productsListInCart", JSON.stringify(cart)) // envoie dans le local storage
        }
    }

    countCart()
})

/*-------------------------------------------------*/

async function runCart() {

    let products = {}
    let total = 0
    let cartContainer = document.getElementById('product-table')

    for (let item of cart ) {
        if (products[item.ref] === undefined) {
            let product = await get(`/${item.ref}`)
            products[item.ref] = product
        }

        console.log(products[item.ref])
    
    const row = generateDiv('row')
    cartContainer.appendChild(row)

    const colImg = generateDiv('col-md-1 my-2')
    cartContainer.appendChild(colImg)

    const img = generateImg( 'img-fluid', `photo du produit ${products[item.ref].name}`, products[item.ref].imageUrl)
    colImg.appendChild(img)


    }
}
