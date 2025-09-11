
export class Pokedex{
    constructor(){
        this.teams = JSON.parse(localStorage.getItem("teams")) || [];
    }
    /**
  * @description Guarda los equipos en el local storage
  * @returns {void}
  */
    saveTeamsInStorage(){
        localStorage.setItem("teams",JSON.stringify(this.teams));
    }
    /**
  * @description Agrega un nuevo pokemon
  * @param {int} id
  * @param {string} name
  * @param {string} type
  * @returns {void}
  */
    addTeam(name,type){
        if(myPokedex.teams.find(teamsExistentes => name === teamsExistentes.name) != undefined){
        window.alert("Ya existe un equipo con ese nombre");
    }else{
        const evolutionLevel = assignEvolutionLevel();
        const pokemon = new Pokemon(name,type,evolutionLevel);
        this.teams.push(pokemon);
        window.alert(`Se a creado el Pokemon correctamente\nNombre: ${name}\nTipo: ${type}\nNivel Evolutivo: ${evolutionLevel}`);
        myPokedex.saveTeamsInStorage();
        renderTeams();
    }

    }
    /**
  * @description Borra un Pokemón
  * @param {int} id
  * @returns {void}
  */
    deleteTeam(id){
    if(this.teams.length === 0){
        noTeams();
    }else if(verifyTeamExistence(id) == false){
        return;
    }else{
        this.teams = this.teams.filter((teamToDelete) => teamToDelete.id !== id);
        renderTeams();
        window.alert(`El equipo fue eliminado correctamente`);
        myPokedex.saveTeamsInStorage();
    }
    }
    /**
  * @description Modifica un Pokemón según su ID
  * @param {int} id
  * @returns {void}
  */
    modifyTeam(id){
    if(this.teams.length === 0){
        noTeams();

    }else if(verifyTeamExistence(id) == false){
        return;

    }else{

    for(let i = 0; i < this.teams.length; i++){
        if(this.teams[i].id === id){
            newLevel = prompt("Por favor ingrese el nuevo nivel evolutivo del Pokemon");
            while(isNaN(newLevel) || newLevel === ""){
                newLevel = prompt("Por favor ingrese un número válido");
            }
            this.teams[i].evolutionLevel = newLevel;
            window.alert(`Se cambió el nivel evolutivo viejo de ${name}. El nuevo nivel evolutivo es ${newLevel}`);
        }
    }
    myPokedex.saveTeamsInStorage();
    renderTeams();
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
/*Renderizado */
/**
  * @description Renderiza los Pokemones creados
  */
const myPokedex = new Pokedex();
export function renderTeams(){
    container.innerHTML = "";
    myPokedex.teams.forEach((team) => {
        const teamDiv = document.createElement("div");
        teamDiv.id = "team";
        const teamInfo = document.createElement("div");

        teamInfo.innerHTML = `<p><strong>${team.id}</strong></p><p><strong>${team.name}</strong> - ${team.type}</p>
            <p>Nivel Evolutivo: ${team.evolutionLevel}</p>`;

        teamDiv.style.backgroundColor = assignColour(team.type);
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.addEventListener("click",() => myPokedex.deleteTeam(team.id));

        teamDiv.appendChild(teamInfo);
        teamDiv.appendChild(deleteBtn)

    container.appendChild(teamDiv);
    });
}

/**
  * @description Asigna un background color a cada pokemon según su tipo.Si es tipo nomal o uno inexistente, se deja en blanco.
  * @param {HTMLElement} pokemonDiv
  * @param {string} pokemonType
  * @returns {string} colour
  *
  */
function assignColour(teamType){
    let colour = " ";
    switch(teamType){
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
function noTeams(){
    window.alert("No hay Pokemones registrados");
}
/**
  * @description Mensaje de error que aparece cuando no existe un Pokemón con el ID especificado
  */
function teamNotExist(id){
    window.alert(`No existe un equipo con el ID: "${id}"`);
}
/*Validaciones */
/**
  * @description Verifica si existe el equipo solicitado
  */
function verifyTeamExistence(id){
    const validation = true;
    if(myPokedex.teams.find(team => team.id === id) == undefined){
        teamNotExist(id);
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

export function addTeam(name,type){
    myPokedex.addTeam(name,type);
};