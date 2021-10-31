const alerte = (alertType, messageAlert, elementParent) => {
    let div = document.createElement('div')
    div.className = `alert alert-${alertType}`
    mainContainer.appendChild(div)

    div.innerHTML = messageAlert

    setTimeout( () => {
        div.remove
    }, 1500)
}