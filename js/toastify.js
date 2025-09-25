
export function showDeleteToast(){
    Toastify({
    text: "Pokemon eliminado!!!",
    }).showToast();
}

export function showModifyToast(){
    Toastify({
    text: "Modificación exitosa!!!",
    }).showToast();
}


export function noPokemonsToastify(){
    Toastify({
        text:"No hay pokemones en el carrito",
    }).showToast();
}