
//déclaration de la fonction 
async function run() {
    let get = await fetch("http://localhost:3000/api/teddies/")
    let ours = await get.json()
    for (let peluche of ours) {
//generation les elements du dom 
//placer les variables dans le dom
//imbriquer et generer les elements
    }

}


//Execution de la fonction run 
run()
