
//déclaration de la fonction 
async function run() {
    let get = await fetch("http://localhost:3000/api/teddies/")
    let ours = await get.json()
    for (let peluche of ours) {

// variable let pour rechercher l'element conteneur dans le dom -- let elt = document.getElementById('main');
        let mainContainer = document.getElementById('productslist')
        
//generation les elements du dom -- const newElt = document.createElement("div");
        const col = document.createElement("div.col.col-lg-4")
        const card = document.createElement("div.card.m-2")
        const cardBody = document.createElement("div.card-body")
        const name = document.createElement("h2.card-title.text-center")
        const description = document.createElement("p.card-tect")
        const button = document.createElement("a.btn.btn-primary.stretched-link.m-2")

//placer les variables dans les elements -- elt.innerHTML = "code + variable";
        card.innerHTML = "<img class=”card-img-top” src="${peluche.image}" alt=”...”>"

//imbriquer et generer les elements dans le DOM -- elt.appendChild(newElt);
        mainContainer.appendChild(col)
        col.appendChild(card)
        card.appendChild(cardBody)
        card.appendChild(button)
        cardBody.appendChild(name)
        cardBody.appendChild(description)
    }
}


//Execution de la fonction run 
run()



/*
1. Créer les elements
    let nouvelElement = document.createElement("div")
2. leur ajouter le contenu
    let contenu = nouvelElement.innerHTML(variable)
3. Les placer dans le Dom

*/