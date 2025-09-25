import {showDeleteToast,showModifyToast,noPokemonsToastify} from "./toastify.js";
import {showAddAlert, showAskBuyAlert, showDeleteAlert,showBuyAlert} from "./sweetAlert.js";
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
    async addToCart(pokemon){
        const amount = assignAmount();
        pokemon.amount = amount;
        pokemon.price = (parseFloat(pokemon.id) * amount) * 37;
        this.cart.push(pokemon);
        showAddAlert(pokemon.name,amount);
        myCart.saveCartInStorage();
        renderCart();

    }
    /**
  * @description Borra un Pokemon del carrito
  * @param {string} name
  * @returns {void}
  */
    async deleteItem(id){
    if(this.cart.length === 0){
        noItems();
    }else if(verifyItemExistence(id) == false){
        return;
    }else{
        const pokemonName = this.cart.find(pokemon => pokemon.id === id).name;
        const decision = await showDeleteAlert(pokemonName);
        if(decision.isConfirmed){
            this.cart = this.cart.filter((itemToDelete) => itemToDelete.id !== id);
            showDeleteToast();
            renderCart();
            myCart.saveCartInStorage();
        }

        
    }
    }
    /**
  * @description Modifica la cantidad de un pokemon en el carrito
  * @param {int} id
  * @returns {void}
  */
    async modifyItem(id){
    if(this.cart.length === 0){
        noItems();

    }else if(verifyItemExistence(id) == false){
        return;

    }else{

    for(let i = 0; i < this.cart.length; i++){
        if(this.cart[i].id === id){

            let NewAmount = prompt("Por favor ingrese la nueva cantidad del Pokemon");
            while(isNaN(NewAmount) || NewAmount === "" || NewAmount === null || NewAmount <= 0){
                NewAmount = prompt("Por favor ingrese un número válido");
                
            }
            this.cart[i].amount = NewAmount;
            this.cart[i].price = (parseFloat(this.cart[i].id) * NewAmount) * 37;
            showModifyToast();
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
export  function renderCart(){
    const cart = document.getElementById("carrito");
    cart.className = "cart";
    cart.innerHTML = "";
    myCart.cart.forEach((pokemon) => {
        const pokemonDiv = document.createElement("div");
        pokemonDiv.id = "pokemon";
        pokemonDiv.className = "cart-item";
        const pokemonInfo = document.createElement("div");

        pokemonInfo.innerHTML = `<p><strong>Id:${pokemon.id}</strong></p><p><strong>${pokemon.name}</strong> - Cantidad: ${pokemon.amount}</p><p><strong>$${pokemon.price}</strong></p>`;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "deleteButton";
        deleteBtn.textContent = "Eliminar";
        deleteBtn.addEventListener("click",() => myCart.deleteItem(pokemon.id));

        const modifybtn = document.createElement("button");
        modifybtn.className = "modifyButton";
        modifybtn.textContent = "Modificar";
        modifybtn.addEventListener("click",() => myCart.modifyItem(pokemon.id));


        pokemonDiv.appendChild(pokemonInfo);
        pokemonDiv.appendChild(deleteBtn)
        pokemonDiv.appendChild(modifybtn);

        cart.appendChild(pokemonDiv);

        
    });
    const buyBtn = document.createElement("button");
        buyBtn.className = "buyButton";
        buyBtn.textContent = "Comprar";
        buyBtn.id = "buyButton";
        buyBtn.addEventListener("click",async () => {
            const decision = await showAskBuyAlert();
            if(decision.isConfirmed ){
                if(myCart.cart.length > 0){
                    myCart.cart = [];
                    myCart.saveCartInStorage();
                    renderCart();
                    showBuyAlert();
                }else{
                    noPokemonsToastify();
                }

            }
        });
        cart.appendChild(buyBtn);
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

    while(isNaN(amount) || amount === "" || amount === null || amount <= 0){
        amount = prompt("Por favor ingrese un dato numérico");
    }
    return amount;
}

export function addPokemonToCart(pokemon){
    myCart.addToCart(pokemon);
};