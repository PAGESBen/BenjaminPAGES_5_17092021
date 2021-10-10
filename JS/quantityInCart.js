/* 
1. Récuperer le pannier
2. Si le panier est vide = renvoyer 0
3. Si le panier contient quelque chose = additionner les quantités
*/

let cartQuantity = document.getElementById('cartCount')


let countCart = () => {

    let cart = JSON.parse(localStorage.getItem("productsListInCart"))
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

    console.log(numberOfProductsInCart)
}

countCart()