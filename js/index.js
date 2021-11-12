import {recipes} from "./recipes.js";
console.log(recipes);









for(let i=0; i<recipes.length; i++){
    /*const card = document.getElementById("structure-card");
    const cloneCard = card.cloneNode(true);
    document.getElementById("cards").appendChild(cloneCard);*/
    
    let numberCard = document.querySelector(".card").classList.length
const card = document.getElementById("structure-card");
    const cloneCard = card.cloneNode(true);
while (recipes.length > numberCard){
    document.getElementById("cards").appendChild(cloneCard);
    numberCard++;
}
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