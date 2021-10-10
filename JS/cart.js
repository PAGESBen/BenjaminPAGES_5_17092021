// Récupération du local storage
let cart = JSON.parse(localStorage.getItem("productsListInCart")) 

let get = async (id) => {
    let response = await fetch(`http://localhost:3000/api/teddies/${id}`)
    if( response.ok ) {
        return response.json()
    } else {
        throw "Erreur sur la requête"
    }
}

let getCart = async () => {
    for (let product of cart) {

        const id = product.ref
        const quantity = product.quantity

        let p = await get(id)

        //creation du dom : 

        const col = document.createElement("div")
        col.classList.add("col-12", "col-lg-4")

        const card = document.createElement("div")
        card.classList.add("card", "m-2")

        const row = document.createElement("div")
        row.classList.add("row")

        const productImg = document.createElement("img")
        productImg.classList.add("card-img-left")

        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body")

        const name = document.createElement("h2")
        name.classList.add("card-title", "text-center")

        const description = document.createElement("p")
        description.classList.add("card-text")

        const productQuantity = document.createElement("p")
        productQuantity.classList.add("card-text")

        const price = document.createElement("p")
        price.classList.add("card-text")

        const remove = document.createElement("a")
        remove.classList.add("btn", "btn-danger", "m-2", "w-50")

        const productPage = document.createElement("a")
        productPage.classList.add("btn", "btn-secondary", "m-2", "w-50")

        //placer les variables dans les elements -- elt.innerHTML = "code + variable";

        productImg.setAttribute("src", p.imageUrl)
        name.textContent = p.name
        description.textContent = p.description
        productQuantity.textContent = product.quantity
        price.textContent = "Prix : " + p.price / 100 * product.quantity + " €"
        remove.textContent = "Supprimer"
        productPage.textContent = "Voir l'article"

        // On va récuperer le contener principal dans le DOM -- let elt = document.getElementById('main');
        let mainContainer = document.getElementById('cartlist')
        console.log(mainContainer)

        //imbriquer et generer les elements dans le DOM -- elt.appendChild(newElt);
        mainContainer.appendChild(col)
        col.appendChild(card)
        card.appendChild(row)
        row.appendChild(productImg)
        row.appendChild(cardBody)
        row.appendChild(remove)
        row.appendChild(productPage)
        cardBody.appendChild(name)
        cardBody.appendChild(description)
        cardBody.appendChild(productQuantity)
        cardBody.appendChild(price)
    }

}

getCart()
