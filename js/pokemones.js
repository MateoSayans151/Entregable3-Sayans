import { addPokemonToCart } from "./carrito.js";

async function renderPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await response.json();
    return data.results;
}

export async function showCards() {
    try{
        const pokemonList = await renderPokemons();

        pokemonList.forEach((pokemon) => {
            createCard(pokemon);
        });
    } catch(error){
        console.log(error);

    }
}
//Con el export puedo usar la función en otros archivos
export function createCard(pokemon) {
    const div = document.getElementById("output");
    const card = document.createElement("div");
    const image = fetch(pokemon.url); //Promesa
    
    image.then(response => response.json()).then(pokemonData => {
        const price = parseFloat(pokemonData.id * 37);
        card.innerHTML = `
            <h4 class="pokemon-card h4">${pokemon.name}</h4>
            <img src="${pokemonData.sprites.front_default}" alt="${pokemon.name}" class="pokemon-image">
            <p class="pokemon-price">Precio: ${price}</p>
            <button class="buyButton">Agregar</button>

        `;

        const buyBtn = card.querySelector(".buyButton");
        buyBtn.addEventListener("click",() =>
        {
            const newPokemon = new Pokemon(pokemonData.id,pokemon.name,price);
            addPokemonToCart(newPokemon);
        });
        
        card.appendChild(buyBtn);
        card.className = "pokemon-card";
    });
    div.appendChild(card);
}


/**
  * @description Clase de Equipo
  * @param {int} id
  * @param {string} name
  * @param {float} price
  */
class Pokemon {

constructor(id,name,price) {
    this.id = id;
    this.name = name;
    this.price = price;
}
}

