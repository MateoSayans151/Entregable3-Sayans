/*Estructura*/

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
        console.log(pokemonData);//Resultado de la promesa
        card.innerHTML = `
            <h2>${pokemon.name}</h2>
            <img src="${pokemonData.sprites.front_default}" alt="${pokemon.name}">

        `;
        const buyBtn = document.createElement("button");
        buyBtn.textContent = "Comprar";
        buyBtn.addEventListener("click",() =>
        {
            const newPokemon = new Pokemon(pokemonData.id,pokemon.name);
            addToCart(newPokemon);
        });
        //puedo usar promesa.finally para avisar cuando se creó un equipo sea cual sea el resultado.
        // O tambien lo puedo usar para una vez que se hayan cargado los pokemones
        card.appendChild(buyBtn);
    });
    div.appendChild(card);
}


/**
  * @description Clase de Equipo
  * @param {int} id
  * @param {string} name
  */
class Pokemon {

constructor(id,name) {
    this.id = id;
    this.name = name;
}
}

