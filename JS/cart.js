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

let totalPrice = 0

let getCart = async () => {

    let products = {}

    //creation du tableau et mise en place dans le DOM
    const table = document.createElement('table')
    document.getElementById('product-table').appendChild(table).classList.add("table", "table-striped")

    //Création de l'entête du tableau
    const thead = document.createElement('thead')
    table.appendChild(thead)

    //creation de la ligne d'entête du tableau
    const tr = document.createElement('tr')
    thead.appendChild(tr)

    //creation des entêtes des colonnes
    for( let i of ['reference', 'nom', 'couleur', 'prix unitaire', 'quantité', 'total']) {
        const th = document.createElement('th')
        th.innerHTML = i
        tr.appendChild(th)
    }

    //creation du contenu du tableau
    const tbody = document.createElement('tbody')
    table.appendChild(tbody)

    for (let item of cart ) {
        if (products[item.ref] === undefined) {
            let res = await fetch (`http://localhost:3000/api/teddies/${item.ref}`)
            let product = await res.json()
            products[item.ref] = product
        }
        
        //creation de la ligne contenant le produit
        const tr = document.createElement('tr')
        tbody.appendChild(tr)

        //On récupere les informations à afficher : 
        let price = products[item.ref].price / 100
        let itemInformation = [
            item.ref,
            products[item.ref].name,
            item.color,
            `${price} €`,
            item.quantity,
            `${price * item.quantity} €`
        ]

        for (let i of itemInformation) {
            const td = document.createElement('td')
            td.innerHTML = i
            tr.appendChild(td)
        }

        totalPrice = totalPrice + price * item.quantity
        
    }

}

getCart()