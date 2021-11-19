import {recipes} from "./recipes.js";
console.log(recipes);

/*Get the ingredients*/

function getIngredient(recipe, index) {
    for (let j=0; j<recipe.ingredients.length; j++){
        let newIngredient = document.createElement("li");
        document.querySelectorAll(".ingredients")[index].appendChild(newIngredient);
        const recipeIngredient = document.querySelectorAll(".ingredients > li");
        recipeIngredient[index].innerHTML = recipe.ingredients[j].ingredient;
    }
}
function fillIngredient(recipe){

    for (let j=0; j<recipe.ingredients.length; j++){
        const ingredients = document.querySelectorAll("ul.ingredients");
        const newIngredient = document.createElement("li");
        const recipeIngredient = document.querySelectorAll("li");
        ingredients[j].appendChild(newIngredient);
        recipeIngredient[j].innerHTML = recipe.ingredients[j].ingredient;
        console.log(recipeIngredient[j].innerHTML)
    }
}

/*Fill the cards*/
function fillCards(){
    for(let i=0; i<recipes.length; i++){
        const card = document.querySelector(".card");
        let numberCard = document.querySelectorAll(".card").length
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
        
        getIngredient(recipes[i], i);
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
const mainBar = document.getElementById("search_bar")

/* Array match test */
let arraySearchMain = []
    // switch the string to lowercase & without any accent to compare
function searchMatch(){
    for(let i=0;i<recipes.length;i++){
        let lowerName = recipes[i].name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        let lowerDescription = recipes[i].description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

        if(lowerName.includes(mainBar.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())){
            arraySearchMain.push(recipes[i])
        }
        if(lowerDescription.includes(mainBar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))){
            arraySearchMain.push(recipes[i])
        }
        for(let j=0;j<recipes[i].ingredients.length;j++){
            let lowerIngredient = recipes[i].ingredients[j].ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            
            if(lowerIngredient.includes(mainBar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))){
                arraySearchMain.push(recipes[i])
            }
        }
    }
}

/* Display matched cards */
const cardName = document.getElementsByClassName("recipe")

function displayCards(){
    for(let i=0;i<recipes.length;i++){
        cardName[i].closest(".card").classList.add("hide");
        for(let j=0;j<arraySearchMain.length;j++){
            if(cardName[i].innerHTML === arraySearchMain[j].name){
                cardName[i].closest(".card").classList.remove("hide");
            }
        }
    }
}

function validateInputSearch(){
//Regex 3 characters creation
const regexInputSearch = /[a-zA-ZÀ-ÿ]{3,}/g;
//const stringInputSearch = mainBar.textContent.toString()
const validInputSearch = regexInputSearch.test(mainBar.value);
    if(mainBar.value === ""){
        for(let i=0;i<recipes.length;i++){
            cardName[i].closest(".card").classList.remove("hide");
        }
        return false;
    }
    if(validInputSearch === false){
        for(let i=0;i<recipes.length;i++){
            cardName[i].closest(".card").classList.remove("hide");
        }
        console.log("false")
        return false;
    }else{
        searchMatch();
        console.log(arraySearchMain)
        displayCards()
    }
}

/* Listen to a change in the search bar */
mainBar.addEventListener("input", function(){
    arraySearchMain = [];
    validateInputSearch(this);
});