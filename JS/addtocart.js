/*
1.Selectionner le bouton ajouter au panier
2.Ecouter l'evènement click sur le bouton et executer la fonction qui completera le panier
3.Créer la constante correspondant à l'indexe de la couleur du produit
4.Creer l'objet à ajouter dans le produit
5. Ajouter le produit dans le local storage
        //json.parse() = passer du JSON au JS
        //json.stringify() = passer du JS au JSON
*/




//  1. Selection du bouton panier
    const addToCartButton = document.querySelector("#AddToCartButton")

// 2. Ecouter l'evènement click sur le bouton et executer la fonction qui completera le panier
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
                } else {
                    // fais rien
                }
            }

            if (productAlreadyInCart) { //si le produit était séjà dans le panier
                localStorage.setItem("productsListInCart", JSON.stringify(cart)) // met à jour le local storage 
            } else { // si le produit n'était pas dans le panier 
                cart.push(productToAddinCart) //Ajoute le produit dans l'array
                localStorage.setItem("productsListInCart", JSON.stringify(cart)) // met à jour le local storage
            }

        } else { // sinon
            cart = [] //crée un tableau qui contiendra la liste des produits du panier
            cart.push(productToAddinCart) //Ajoute le produit dans la liste
            localStorage.setItem("productsListInCart", JSON.stringify(cart)) // envoie dans le local storage
        }
    }
})


/*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        // /*creation de l'alerte*/
        // const success = document.createElement("div")
        // success.classList.add("alert", "alert-success", "sticky-top", "float", "alert-dismissible", "fade", "show")
        // success.setAttribute("role", "alert")
        // const alertBtn = document.createElement("button")
        // alertBtn.classList.add("close")
        // alertBtn.setAttribute("type", "button")
        // alertBtn.setAttribute("data-dismiss", "alert")
        // alertBtn.setAttribute("aria-label", "close")
        // const x = document.createElement("span")
        // x.setAttribute("aria-hidden", "true")

        // let body = document.getElementById("body")
        // body.appendChild(success)
        // success.appendChild(alertBtn)
        // alertBtn.appendChild(x)
        // /*fin de l'alerte*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/