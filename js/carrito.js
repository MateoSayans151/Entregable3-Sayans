
export class Cart{
    constructor(){
        this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    }
    /**
  * @description Guarda los equipos en el local storage
  * @returns {void}
  */
    saveCartInStorage(){
        localStorage.setItem("cart",JSON.stringify(this.cart));
    }
    /**
  * @description Agrega un pokemon al carrito
  * @param {int} id
  * @param {string} name
  * @returns {void}
  */
    addToCart(pokemon){
        const amount = assignAmount();
        pokemon.amount = amount;
        this.cart.push(pokemon);
        window.alert(`Se a creado el equipo correctamente\nNombre: ${pokemon.name}\nCapacidad: ${amount}`);
        myCart.saveCartInStorage();
        renderCart();

    }
    /**
  * @description Borra un Pokemon del carrito
  * @param {string} name
  * @returns {void}
  */
    deleteItem(id){
    if(this.cart.length === 0){
        noItems();
    }else if(verifyItemExistence(id) == false){
        return;
    }else{
        this.cart = this.cart.filter((itemToDelete) => itemToDelete.id !== id);
        renderCart();
        window.alert(`El pokemon fue eliminado correctamente`);
        myCart.saveCartInStorage();
    }
    }
    /**
  * @description Modifica la cantidad de un pokemon en el carrito
  * @param {int} id
  * @returns {void}
  */
    modifyItem(id){
    if(this.cart.length === 0){
        noItems();

    }else if(verifyItemExistence(id) == false){
        return;

    }else{

    for(let i = 0; i < this.cart.length; i++){
        if(this.cart[i].id === id){
            const NewAmount = prompt("Por favor ingrese la nueva cantidad del Pokemon");
            while(isNaN(NewAmount) || NewAmount === ""){
                NewAmount = prompt("Por favor ingrese un número válido");
            }
            this.cart[i].amount = NewAmount;
            window.alert(`Se cambió la cantidad vieja de ${this.cart[i].name}. La nueva cantidad es ${NewAmount}`);
        }
    }
    myCart.saveCartInStorage();
    renderCart();
    }
}
}


/* */
/*Renderizado */
/**
  * @description Renderiza los Equipos creados
  */
const myCart = new Cart();
export function renderCart(){
    container.innerHTML = "";
    myCart.cart.forEach((pokemon) => {
        const pokemonDiv = document.createElement("div");
        pokemonDiv.id = "pokemon";
        const pokemonInfo = document.createElement("div");

        pokemonInfo.innerHTML = `<p><strong>${pokemon.id}</strong></p><p><strong>${pokemon.name}</strong> - ${pokemon.amount}</p>`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.addEventListener("click",() => myCart.deleteItem(pokemon.id));

        const modifybtn = document.createElement("button");
        modifybtn.textContent = "Modificar";
        modifybtn.addEventListener("click",() => myCart.modifyItem(pokemon.id));


        pokemonDiv.appendChild(pokemonInfo);
        pokemonDiv.appendChild(deleteBtn)
        pokemonDiv.appendChild(modifybtn);

    container.appendChild(pokemonDiv);
    });
}

/**
  * @description Asigna un background color a cada equipo según su capacidad. Si es tipo normal o uno inexistente, se deja en blanco.
  * @param {HTMLElement} teamDiv
  * @param {int} teamCapacity
  * @returns {string} colour
  *
  */


/* Mensajes de errores*/
/**
  * @description Mensaje de error que aparece cuando no hay Pokemones registrados y se quiere buscar, modificar, eliminar o mostrar un Pokemon
  */
function noItems(){
    window.alert("No hay Pokemones registrados");
}
/**
  * @description Mensaje de error que aparece cuando no existe un Pokemón con el ID especificado
  */
function itemNotExist(id){
    window.alert(`No existe un equipo con el ID: "${id}"`);
}
/*Validaciones */
/**
  * @description Verifica si existe el equipo solicitado
  */
function verifyItemExistence(id){
    const validation = true;
    if(myCart.cart.find(team => team.id === id) == undefined){
        itemNotExist(id);
        validation = false;
    }
    return validation;
}

/* Asignación de capacidad */
/**
  * @description Función que asigna la capacidad a un equipo
  * @returns {int} amount
  */
function assignAmount(){
    let amount = prompt("Por favor ingrese la cantidad de este pokemon que desea agregar a su carrito");
    while(isNaN(amount)){
        amount = prompt("Por favor ingrese un dato numérico");
    }
    return amount;
}

export function addPokemonToCart(pokemon){
    myCart.addToCart(pokemon);
};