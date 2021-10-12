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
        console.log(p)
        
}

getCart()


// Récupération du local storage
let localStorage = '[{"ref":"5be9c8541c9d440000665243","color":"Tan","quantity":1},{"ref":"5be9c8541c9d440000665243","color":"Chocolate","quantity":1},{"ref":"5be9c8541c9d440000665243","color":"Black","quantity":1}]'
let cart = JSON.parse(localStorage)
// Initialization d'une variable de cache
let products = {}

// // Tableau
// let table = document.createElement('table')
// document.getElementsByTagName('body')[0].appendChild(table)

// // En-tête du tableau
// let thead = document.createElement('thead')
// table.appendChild(thead)

// // Ligne dans l'en-tête du tableau
// let tr = document.createElement('tr')
// thead.appendChild(tr)

// // Boucle pour afficher toutes les colonnes dans l'en-tête du tableau
// for( let i of [ 'ref', 'Nom', 'Couleur', 'Prix unitaire', 'Quantité', 'Total' ] ) {
//     let th = document.createElement('th')
//     th.innerHTML = i
//     tr.appendChild(th)
// }

// //  Contenu du tableau
// let tbody = document.createElement('tbody')
// table.appendChild(tbody)

// Pour chaque objet dans le panier
for( let item of cart ) {
    // Si le produit n'est pas dans le "cache" (c'est de l'optimisation)
    if( products[item.ref] === undefined ) {
        // Récupération des informations du produit sur le serveur
        let res = await fetch(`http://localhost:3000/api/teddies/${item.ref}`)
        let product = await res.json()
        // Enregistrement du produit dans le cache
        products[item.ref] = product
    }

    // Ligne
    let tr = document.createElement('tr')
    tbody.appendChild(tr)

    // Traitement des informations à afficher
    let price = products[item.ref].price / 100
    let data = [
        item.ref,
        products[item.ref].name,
        item.color,
        price,
        item.quantity,
        price * item.quantity
    ]
    for( let i of data ) {
        // Cellule
        let td = document.createElement('td')
        td.innerHTML = i
        tr.appendChild(td)
