import {recipes} from "./recipes.js";
console.log(recipes);
/*Fill the cards*/
for(let i=0; i<recipes.length; i++){
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
    recipeTime[i].innerHTML = recipes[i].time + " min";
    recipeDescription[i].innerHTML = recipes[i].description;

    function getIngredient() {
        for (let j=0; j<recipes[i].ingredients.length; j++){
        let newIngredient = document.createElement("li");
        document.querySelectorAll("ul")[i].appendChild(newIngredient);
        const recipeIngredient = document.querySelectorAll("li");
        recipeIngredient[i].innerHTML = recipes[i].ingredients[j].ingredient;
        }
    }
    getIngredient(recipes[i])
}
/*Show lists for buttons on click*/
const getList = document.getElementsByClassName(".dropbtn")
const showList = document.getElementsByClassName("dropdown-content")
for(let i=0; i < getList.length; i++){
    getList[i].addeventlistener("click", function(){
        showList.classList.add("show")
})
}

/*Get lists for buttons*/
const listUstensils = []
const listAppareil = []
const listIngredients = []
for(let i=0; i<recipes.length; i++){
    for (let j=0; j<recipes[i].ingredients.length; j++){
        listIngredients.push(recipes[i].ingredients[j].ingredient)
    }
    for (let j=0; j<recipes[i].ustensils.length; j++){
        listUstensils.push(recipes[i].ustensils[j])
    }
    listAppareil.push(recipes[i].appliance)
}
/*Delete duplicates*/
const uniqueListIngredients = new Set(listIngredients)
console.log(uniqueListIngredients)
const uniqueListUstensils = new Set(listUstensils)
const uniquelistAppareil = new Set(listAppareil)

/*Errors*/

/*fill list for buttons*/
const menuIngredients = document.getElementsByClassName(".list-ingredient")
