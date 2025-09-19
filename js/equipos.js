
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
    addPokemon(pokemon){
        const amount = assignAmount();
        pokemon.amount = amount;
        this.cart.push(pokemon);
        window.alert(`Se a creado el equipo correctamente\nNombre: ${pokemon.name}\nCapacidad: ${amount}`);
        myPokedex.saveCartInStorage();
        renderCart();

    }
    /**
  * @description Borra un Equipo
  * @param {int} id
  * @returns {void}
  */
    deleteItem(name){
    if(this.cart.length === 0){
        noItems();
    }else if(verifyItemExistence(name) == false){
        return;
    }else{
        this.cart = this.cart.filter((itemToDelete) => itemToDelete.name !== name);
        renderCart();
        window.alert(`El equipo fue eliminado correctamente`);
        myCart.saveCartInStorage();
    }
    }
    /**
  * @description Modifica el nombre de un equipo
  * @param {int} id
  * @returns {void}
  */
    modifyItem(name){
    if(this.cart.length === 0){
        noItems();

    }else if(verifyItemExistence(name) == false){
        return;

    }else{

    for(let i = 0; i < this.cart.length; i++){
        if(this.cart[i].name === name){
            newLevel = prompt("Por favor ingrese el nuevo nivel evolutivo del Pokemon");
            while(isNaN(newLevel) || newLevel === ""){
                newLevel = prompt("Por favor ingrese un número válido");
            }
            this.cart[i].evolutionLevel = newLevel;
            window.alert(`Se cambió el nivel evolutivo viejo de ${name}. El nuevo nivel evolutivo es ${newLevel}`);
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

        pokemonDiv.style.backgroundColor = assignColour(pokemon.amount);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.addEventListener("click",() => myCart.deleteItem(pokemon.name));

        const modifybtn = document.createElement("button");
        modifybtn.textContent = "Modificar";
        modifybtn.addEventListener("click",() => myCart.modifyItem(pokemon.name));


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
    if(myPokedex.teams.find(team => team.id === id) == undefined){
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

export function addPokemon(name,amount){
    myPokedex.addPokemon(name,amount);
};