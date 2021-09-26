/* 
1. faire la requette au web service et recuperer les objets JSON 
    -fetch 
    -get.json

2. Generer les elements des cartes et leur ajouter leur classes bootstrap : 
    -document.createElement()
    -nomElement.classList.add("", "", "", "")

3. leur donner un contenu : 
    -nomElement.textContent = ""
    -ajout attribu pour l'image : nomElement.setAttribute("attribu", "valeur")

4. Les placer dans le DOM : 
    -nomElementParent.appendChild(elementEnfant)
*/


//déclaration de la fonction 
async function run() {
    let get = await fetch("http://localhost:3000/api/teddies/")
    let ours = await get.json()
    for (let peluche of ours) {

        console.log(peluche)
        
        //generation les elements du dom -- const newElt = document.createElement("div") + ajout de leur classes nomElement.classList.add("", "", "", "");

        const col = document.createElement("div")
        // .col.col-lg-4
        col.classList.add("col-12","col-lg-4")
        
        const card = document.createElement("div")
        // .card.m-2
        card.classList.add("card","m-2")

        const productImg = document.createElement("img")
        // .card-img-top
        productImg.classList.add("card-img-top")

        const cardBody = document.createElement("div")
        // .card-body
        cardBody.classList.add("card-body")

        const name = document.createElement("h2")
        // .card-title.text-center
        name.classList.add("card-title","text-center")
        
        const description = document.createElement("p")
        // .card-text
        description.classList.add("card-text")

        const price = document.createElement("p")
        // .card-text
        price.classList.add("card-text")

        const button = document.createElement("a")
        // .btn.btn-primary.stretched-link.m-2
        button.classList.add("btn", "btn-primary", "stretched-link", "m-2")


        //placer les variables dans les elements -- elt.innerHTML = "code + variable";

        productImg.setAttribute("src", peluche.imageUrl)
        name.textContent = peluche.name
        description.textContent = peluche.description
        price.textContent = "Prix : " + peluche.price + " €"
        button.textContent = "Voir l'article"

        //On crée l'url qui contiendra l'ID de l'objet pour la page product
        button.setAttribute("href", "./product.html?id=" + peluche._id)

        // On va récuperer le contener principal dans le DOM -- let elt = document.getElementById('main');
        let mainContainer = document.getElementById('productslist')

        //imbriquer et generer les elements dans le DOM -- elt.appendChild(newElt);
        mainContainer.appendChild(col)
        col.appendChild(card)
        card.appendChild(productImg)
        card.appendChild(cardBody)
        card.appendChild(button)
        cardBody.appendChild(name)
        cardBody.appendChild(description)
        cardBody.appendChild(price)
    }
}


//Execution de la fonction run 
run()
