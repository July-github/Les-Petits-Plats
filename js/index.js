import {recipes} from "./recipes.js";
console.log(recipes);


const card = document.getElementById("structure-card");
const cloneCard = card.cloneNode(true);
  

//let numberCard = document.querySelector(".card").classList.length
//console.log(numberCard)


for(let i=0; i<recipes.length; i++){

        document.getElementById("cards").appendChild(cloneCard);
    
        const recipeName = document.querySelectorAll(".recipe");
        const recipeTime = document.querySelectorAll(".time");
        const recipeDescription = document.querySelectorAll(".description");

        recipeName[i].innerHTML = recipes[i].name;
        recipeTime[i].innerHTML += recipes[i].time + " min";
        recipeDescription[i].innerHTML = recipes[i].description;


        function getIngredient() {
            for (let j=0; j<recipes[i].ingredients.length; j++){
            let newIngredient = document.createElement("li");
            document.querySelectorAll("ul")[i].appendChild(newIngredient);
            newIngredient.innerHTML = recipes[i].ingredients[j].ingredient 
            }
        }
        getIngredient(this)
    
    
}