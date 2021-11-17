import {recipes} from "./recipes.js";
console.log(recipes);

function getIngredient(recipe, index) {
    for (let j=0; j<recipe.ingredients.length; j++){
        let newIngredient = document.createElement("li");
        document.querySelectorAll(".ingredients")[index].appendChild(newIngredient);
        const recipeIngredient = document.querySelectorAll(".ingredients > li");
        recipeIngredient[index].innerHTML = recipe.ingredients[j].ingredient;
    }
}

/*Fill the cards*/
function fillCards(){
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

    getIngredient(recipes[i], i)
    }
}
fillCards()

/*Get lists for buttons*/
const listUstensils = []
const listAppareil = []
const listIngredients = []

function getLists(){    
    for(let i=0; i<recipes.length; i++){
        for (let j=0; j<recipes[i].ingredients.length; j++){
            listIngredients.push(recipes[i].ingredients[j].ingredient)
        }
        for (let j=0; j<recipes[i].ustensils.length; j++){
            listUstensils.push(recipes[i].ustensils[j])
        }
        listAppareil.push(recipes[i].appliance)
    }
    
}
getLists()

/*Delete duplicates*/
const uniqueListIngredients = [...new Set(listIngredients)]
const uniqueListUstensils = [...new Set(listUstensils)]
const uniquelistAppareil = [...new Set(listAppareil)]

/*Fill dropdowns buttons with lists*/
const ulLists = document.querySelectorAll(".p_dropbtn") 
function createLi(index){
    let listDropdown = document.createElement("li");
    ulLists[index].appendChild(listDropdown);
}
function fillList(array, index){
    for(let i=0; i<array.length; i++){
        createLi(index)
        let list = ulLists[index].querySelectorAll("li");
        const liText = document.createTextNode(array[i]);
        list[i].appendChild(liText)
    }
}
fillList(uniqueListIngredients, 0)
fillList(uniqueListUstensils, 1)
fillList(uniquelistAppareil, 2)

/* display list on click*/
function displayList(){
    const showList = document.querySelectorAll(".dropdown-content")
    for(let i=0; i<showList.length;i++){
        document.querySelectorAll(".dropbtn")[i].addEventListener("click", function(){
            showList[i].classList.toggle("show")
        })
    }
}
displayList();

/* main search bar */
const mainBar = document.getElementsByClassName("form-control")
//mainBar.addEventListener("input", displayRecipes())

