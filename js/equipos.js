
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
  * @description Agrega un nuevo equipo
  * @param {int} id
  * @param {string} name
  * @returns {void}
  */
    addTeam(name){
        if(myPokedex.teams.find(teamsExistentes => name === teamsExistentes.name) != undefined){
        window.alert("Ya existe un equipo con ese nombre");
    }else{
        const capacity = assignCapacity();
        const team = new Team(name,capacity);
        this.teams.push(team);
        window.alert(`Se a creado el equipo correctamente\nNombre: ${name}\nCapacidad: ${capacity}`);
        myPokedex.saveTeamsInStorage();
        renderTeams();
    }

    }
    /**
  * @description Borra un Equipo
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
  * @description Modifica el nombre de un equipo
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
  * @description Clase de Equipo
  * @param {int} id
  * @param {string} name
  * @param {int} capacity
  */

 class Team {
   static lastId = 0;

   constructor(name, capacity) {
    Team.lastId += 1;
    this.id = Team.lastId;
    this.name = name;
    this.capacity = capacity;
   }
}
/* */
/*Renderizado */
/**
  * @description Renderiza los Equipos creados
  */
const myPokedex = new Pokedex();
export function renderTeams(){
    container.innerHTML = "";
    myPokedex.teams.forEach((team) => {
        const teamDiv = document.createElement("div");
        teamDiv.id = "team";
        const teamInfo = document.createElement("div");

        teamInfo.innerHTML = `<p><strong>${team.id}</strong></p><p><strong>${team.name}</strong> - ${team.capacity}</p>
            <p>Nivel Evolutivo: ${team.evolutionLevel}</p>`;

        teamDiv.style.backgroundColor = assignColour(team.capacity);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.addEventListener("click",() => myPokedex.deleteTeam(team.id));

        const modifybtn = document.createElement("button");
        modifybtn.textContent = "Modificar";
        modifybtn.addEventListener("click",() => myPokedex.modifyTeam(team.id));


        teamDiv.appendChild(teamInfo);
        teamDiv.appendChild(deleteBtn)
        teamDiv.appendChild(modifybtn);

    container.appendChild(teamDiv);
    });
}

/**
  * @description Asigna un background color a cada equipo según su capacidad. Si es tipo normal o uno inexistente, se deja en blanco.
  * @param {HTMLElement} teamDiv
  * @param {int} teamCapacity
  * @returns {string} colour
  *
  */

function assignColour(teamCapacity){
    let colour = "";
    if(teamCapacity > 5){
        colour = "green";
    }else if(teamCapacity > 2){
        colour = "yellow";
    }else{
        colour = "red";
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

/* Asignación de capacidad */
/**
  * @description Función que asigna la capacidad a un equipo
  * @returns {int} capacity
  */
function assignCapacity(){
    let capacity = prompt("Por favor ingrese la capacidad del equipo");
    while(isNaN(capacity)){
        capacity = prompt("Por favor ingrese un dato numérico");
    }
    return capacity;
}

export function addTeam(name,capacity){
    myPokedex.addTeam(name,capacity);
};