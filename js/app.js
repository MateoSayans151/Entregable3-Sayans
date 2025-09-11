import { renderTeams} from "./equipos.js";
import { addTeam } from "./equipos.js";
import {showCards} from "./pokemones.js";
/*Botones */
const buttonAdd = document.getElementById("add").addEventListener('click',()=>{
    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;
    addTeam(name,type);

});

// Add searchbutton

document.addEventListener("DOMContentLoaded", function(){
    showCards();
    renderTeams();
});

// UTILIZAR TAILWIND PARA ESTILOS