
export function showDeleteAlert(pokemonName) {
    return Swal.fire({
        title: 'Eliminar Pokémon',
        text: `¿Quieres eliminar a ${pokemonName} de tu carrito?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3ce73cff', 
        cancelButtonColor: '#ee0f0fff'
    });
}

export function showAddAlert(pokemonName,amount) {
    return Swal.fire({
        title: 'Agregado al carrito',
        text: `Se agregaron ${amount} ${pokemonName} a tu carrito`,
        icon: 'success',
        confirmButtonColor: '#3ce73cff', 
        confirmButtonText: 'Aceptar'
    });
}

export function showBuyAlert(){
    return Swal.fire({
        title: 'Compra realizada',
        text: `Gracias por su compra!`,
        icon: 'success',
        confirmButtonColor: '#3ce73cff', 
        confirmButtonText: 'Aceptar'
    });
}


export function showAskBuyAlert(){
    return Swal.fire({
        title: 'Confirmación',
        text: `Estás seguro de confirmar la compra?`,
        icon: 'warning',
        confirmButtonColor: '#3ce73cff', 
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        cancelButtonColor: '#ee0f0fff'
    });
}