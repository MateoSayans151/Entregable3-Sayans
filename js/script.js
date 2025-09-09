/*Estructura*/
class Pokedex{
    constructor(){
        this.pokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
    }
    /**
  * @description Guarda los pokemones en el local storage
  * @returns {void}
  */
    savePokemonInStorage(){
        localStorage.setItem("pokemons",JSON.stringify(this.pokemons));
    }
    /**
  * @description Agrega un nuevo pokemon
  * @param {int} id
  * @param {string} name
  * @param {string} type
  * @returns {void}
  */
    addPokemon(name,type){
    const evolutionLevel = assignEvolutionLevel();
    const pokemon = new Pokemon(name,type,evolutionLevel);
    this.pokemons.push(pokemon);
    window.alert(`Se a creado el Pokemon correctamente\nNombre: ${name}\nTipo: ${type}\nNivel Evolutivo: ${evolutionLevel}`);
    myPokedex.savePokemonInStorage();
    renderPokemons();

    }
    /**
  * @description Borra un Pokemón
  * @param {int} id
  * @returns {void}
  */
    deletePokemon(id){
    if(this.pokemons.length === 0){
        noPokemons();
    }else if(verifyPokemonExistence(id) == false){
        return;
    }else{
        this.pokemons = this.pokemons.filter((pokemonToDelete) => pokemonToDelete.id !== id);
        renderPokemons();
        window.alert(`El Pokemón fue eliminado correctamente`);
        myPokedex.savePokemonInStorage();
    }
    }
    /**
  * @description Modifica un Pokemón según su ID
  * @param {int} id
  * @returns {void}
  */
    modifyPokemon(id){
    if(this.pokemons.length === 0){
        noPokemons();

    }else if(verifyPokemonExistence(id) == false){
        return;

    }else{

    for(let i = 0; i < this.pokemons.length; i++){
        if(this.pokemons[i].id === id){
            newLevel = prompt("Por favor ingrese el nuevo nivel evolutivo del Pokemon");
            while(isNaN(newLevel) || newLevel === ""){
                newLevel = prompt("Por favor ingrese un número válido");
            }
            this.pokemons[i].evolutionLevel = newLevel;
            window.alert(`Se cambió el nivel evolutivo viejo de ${name}. El nuevo nivel evolutivo es ${newLevel}`);
        }
    }
    myPokedex.savePokemonInStorage();
    renderPokemons();
    }
}
}

 /**
  * @description Clase de Pokemón
  * @param {int} id
  * @param {string} name
  * @param {string} type
  * @param {int} evolutionLevel
  */
class Pokemon {
   static lastId = 0;

   constructor(name, type, evolutionLevel) {
    Pokemon.lastId += 1;
    this.id = Pokemon.lastId;
    this.name = name;
    this.type = type;
    this.evolutionLevel = evolutionLevel;
   }
}
/* */
const container = document.getElementById("container");
const myPokedex = new Pokedex();
renderPokemons();


/*Renderizado */
/**
  * @description Renderiza los Pokemones creados
  */
function renderPokemons(){
    container.innerHTML = "";
    myPokedex.pokemons.forEach((pokemon) => {
        const pokemonDiv = document.createElement("div");
        pokemonDiv.id = "poke";
        const pokemonInfo = document.createElement("div");

        pokemonInfo.innerHTML = `<p><strong>${pokemon.id}</strong></p><p><strong>${pokemon.name}</strong> - ${pokemon.type}</p>
            <p>Nivel Evolutivo: ${pokemon.evolutionLevel}</p>`;

        pokemonDiv.style.backgroundColor = assignColour(pokemon.type);
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.addEventListener("click",() => myPokedex.deletePokemon(pokemon.id));

        pokemonDiv.appendChild(pokemonInfo);
        pokemonDiv.appendChild(deleteBtn)

    container.appendChild(pokemonDiv);
    });
}
/**
  * @description Asigna un background color a cada pokemon según su tipo.Si es tipo nomal o uno inexistente, se deja en blanco.
  * @param {HTMLElement} pokemonDiv
  * @param {string} pokemonType
  * @returns {string} colour
  *
  */
function assignColour(pokemonType){
    let colour = " ";
    switch(pokemonType){
    case "Fuego":
        colour = "red";
        break;
    case "Agua":
        colour  = "blue";
        break;
    case "Planta":
        colour = "green";
        break;
    case "Eléctrico":
        colour = "yellow";
        break;
    case "Hielo":
        colour = "lightblue";
        break;
    case "Siniestro":
        colour = "darkgray";
        break;
    case "Psíquico":
        colour = "purple";
        break;
    case "Roca":
        colour = "gray";
        break;
    case "Hada":
        colour = "pink";
        break;
    case "Bicho":
        colour = "brown";
        break;
    case "Veneno":
        colour = "purple";
        break;
    case "Dragon":
        colour = "darkblue";
        break;
    default:
        colour = "white";
    }
    return colour;
}

/* Mensajes de errores*/
/**
  * @description Mensaje de error que aparece cuando no hay Pokemones registrados y se quiere buscar, modificar, eliminar o mostrar un Pokemon
  */
function noPokemons(){
    window.alert("No hay Pokemones registrados");
}
/**
  * @description Mensaje de error que aparece cuando no existe un Pokemón con el ID especificado
  */
function pokemonNotExist(id){
    window.alert(`No existe un Pokemón con el ID: "${id}"`);
}
/*Validaciones */
/**
  * @description Verifica si existe el Pokemón solicitado
  */
function verifyPokemonExistence(id){
    const validation = true;
    if(myPokedex.pokemons.find(pokemon => pokemon.id === id) == undefined){
        pokemonNotExist(id);
        validation = false;
    }
    return validation;
}

/* Asignación de nivel evolutivo */
/**
  * @description Función que asigna el nivel evolutivo a un Pokémon
  * @returns {int} level
  */
function assignEvolutionLevel(){
    let level = prompt("Por favor ingrese el nivel evolutivo del Pokemon");
    while(isNaN(level)){
        level = prompt("Por favor ingrese un dato numérico");
    }
    return level;
}


/*Botones */
const buttonAdd = document.getElementById("add").addEventListener('click',()=>{
    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;

    if(myPokedex.pokemons.find(pokemonesExistentes => name === pokemonesExistentes.name) != undefined){
        window.alert("Ya existe un Pokemon con ese nombre");
    }else{
        myPokedex.addPokemon(name,type);

    }

});
const buttonShow = document.getElementById("pokemons").addEventListener('click',() =>{
    myPokedex.pokemons.showPokemons();
})
const buttonModify = document.getElementById("modify").addEventListener('click',() =>{
    const id = parseInt(prompt("Por favor ingrese el ID del Pokemon al que quiere modificarle el nivel evolutivo: "));
    myPokedex.modifyPokemon(id);
})

