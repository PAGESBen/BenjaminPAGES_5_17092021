/*
1.Récuperer l'id du produit dans l'url de la page

2.faire la requette sur l'API sur l'objet concerné : 
    -await fetch
    -await json.get

3.Recuperer et compléter les elements à compléter dans le DOM :
    -document.getElementById()
    -nomElement.textContent ou innerHTML
*/

//1. récupération de l'id du produit dans l'URL

    //a.recuperation de la chaine de caractère de l'url 
const queryString_url = window.location.search

    //b.recupération de l'ID uniquement dans une constante "id"
const urlSearchParams = new URLSearchParams(queryString_url)
const id = urlSearchParams.get("id")

// 2. Récuperation de l'objet ayant l'id

async function run() {
    let get = await fetch("http://localhost:3000/api/teddies/" + id)
    let product = await get.json()
    console.log(product)

    //3. Recuperer et compléter les elements à compléter dans le DOM :

    const productImg = document.getElementById("productImg")
    productImg.setAttribute("src", product.imageUrl)

    const productName = document.getElementById("name")
    productName.textContent = product.name

    const description = document.getElementById("description")
    description.textContent = product.description

    const price = document.getElementById("price")
    price.textContent = product.price

    //Boucle for pour le menu déroulant des couleurs
    for (i=0; i < product.colors.length; i++){

        //Creation de l'element option du menu déroulant
        const colorList = document.createElement("option")
        colorList.setAttribute("value", i + 1)


        //Ajout du contenu aux <options>
        colorList.textContent = product.colors[i]

        //Ajout des couleurs dans le DOM
        const colorMenu = document.getElementById("selectColor")
        colorMenu.appendChild(colorList)  
            
    }

}

run()




