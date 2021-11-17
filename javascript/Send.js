const send = async (data) => {

    let response = await fetch( url +"/order", {
        method : 'POST', 
        headers : {
            'Content-Type': 'application/json'     
        }, 
        body: JSON.stringify(data)
    })
}

function submit (){
    document.getElementById('submitCommand').addEventListener('click', (e){

        let sender = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            address: form.address.value,
            mail: form.mail.value,
            city: form.city.value
        }

        let products = []

        for (let item of cart) {
            for (let i = 0; i < item.quantity; i++) {
                command.push(item.ref)
            }
        }

        send({
            contact: sender,
            command: products
        })
    })

}

function confirmation () {
    document.getElementById('confirmation')
}