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
        const stringRecipeName = recipes[i].name.toLowerCase()
        recipeName[i].innerHTML = stringRecipeName[0].toUpperCase() + stringRecipeName.slice(1);
        recipeTime[i].innerHTML = recipes[i].time + " min";
        recipeDescription[i].innerHTML = recipes[i].description;
        
        getIngredient(recipes[i], i);
    }
    
}
fillCards()

/*Get lists for buttons*/
const listUstensils = []
const ListApparel = []
const listIngredients = []

function getLists(){    
    for(let i=0; i<recipes.length; i++){
        for (let j=0; j<recipes[i].ingredients.length; j++){
            let ingredient = recipes[i].ingredients[j].ingredient.toLowerCase()
            let capIngredient = ingredient[0].toUpperCase() + ingredient.slice(1);
            listIngredients.push(capIngredient)
        }
        for (let j=0; j<recipes[i].ustensils.length; j++){
            let ustensil = recipes[i].ustensils[j].toLowerCase()
            let capUstensil = ustensil[0].toUpperCase() + ustensil.slice(1);  
            listUstensils.push(capUstensil)
        }
        let appliance = recipes[i].appliance.toLowerCase()
        let capAppliance = appliance[0].toUpperCase() + appliance.slice(1);
        ListApparel.push(capAppliance);
    }   
}

getLists()

/*Delete duplicates*/
const uniqueListIngredients = [...new Set(listIngredients)]
const uniqueListUstensils = [...new Set(listUstensils)]
const uniqueListApparels = [...new Set(ListApparel)]

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
        list[i].appendChild(liText);
    }
}
fillList(uniqueListIngredients, 0)
fillList(uniqueListApparels, 1)
fillList(uniqueListUstensils, 2)

/* Display list on click*/
function displayList(){
    const showList = document.querySelectorAll(".dropdown-content")
    for(let i=0; i<showList.length;i++){
        document.querySelectorAll(".dropbtn")[i].addEventListener("click", function(){
            showList[i].classList.toggle("d-block")
        })
    }
}
displayList();

/* Tag on click */
const createTag = document.createElement("div")
const tag = document.getElementById("tag")
let liTagIngredients = document.querySelectorAll("#myDropdown_I > ul > li")

function listenClickTag(){
    for(let i=0; i<liTagIngredients.length; i++){
        liTagIngredients[i].addEventListener("click", function(){
            tag.appendChild(createTag)
            tag.classList.add("d-flex")
            let tagIngredient = document.querySelector("#tag > div")
            tagIngredient.innerHTML = liTagIngredients[i].innerHTML;
            tagIngredient.classList.add("bg-primary", "p-1", "m-1")
        })
    }
}
listenClickTag()

/* main search bar */
const mainBar = document.getElementById("search_bar")

/* Array match test */
let arraySearchMain = []
// switch the string to lowercase & without any accent to compare
function standardize(item){
    return item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}
function searchMatch(){
    for(let i=0; i<recipes.length; i++){
        let lowerName = standardize(recipes[i].name)
        let lowerDescription = standardize(recipes[i].description)

        if(lowerName.includes(standardize(mainBar.value))){
            arraySearchMain.push(recipes[i])
        }
        if(lowerDescription.includes(standardize(mainBar.value))){
            arraySearchMain.push(recipes[i])
        }
        for(let j=0; j<recipes[i].ingredients.length; j++){
            let lowerIngredient = standardize(recipes[i].ingredients[j].ingredient)
            
            if(lowerIngredient.includes(standardize(mainBar.value))){
                arraySearchMain.push(recipes[i])
            }
        }
    }
}

/* Display matched cards */
const cardName = document.getElementsByClassName("recipe")

function displayCards(){
    for(let i=0;i<recipes.length;i++){
        cardName[i].closest(".card").classList.add("d-none");
        for(let j=0;j<arraySearchMain.length;j++){
            if(standardize(cardName[i].innerHTML) === standardize(arraySearchMain[j].name)){
                cardName[i].closest(".card").classList.remove("d-none");
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
            cardName[i].closest(".card").classList.remove("d-none");
        }
        return false;
    }
    if(validInputSearch === false){
        for(let i=0;i<recipes.length;i++){
            cardName[i].closest(".card").classList.remove("d-none");
        }
        console.log("false")
        return false;
    }else{
        searchMatch();
        displayCards();
        displayUstensils();
        displayApparels();
        displayIngredients();
    }
}

/* Display matched ingredients */
let matchArrayIngredients = []
function displayIngredients(){
    for(let i=0; i<uniqueListIngredients.length; i++){
        if(standardize(uniqueListIngredients[i]).includes(standardize(mainBar.value))){
            console.log("yes")
            matchArrayIngredients.push(uniqueListIngredients[i]);
            console.log([...new Set(matchArrayIngredients)])
        }else{console.log("no")}
    }
    console.log([...new Set(matchArrayIngredients)])
    fillList([...new Set(matchArrayIngredients)],0);
}

/* Display matched Ustensils */
let matchArrayUstensils = []
function displayUstensils(){
    for(let i=0; i<uniqueListUstensils.length; i++){
        console.log(standardize(uniqueListUstensils[i]))
        if(standardize(uniqueListUstensils[i]).includes(standardize(mainBar.value))){
            console.log("yes")
            matchArrayUstensils.push(uniqueListUstensils[i]);
        }else{console.log("no")}
    }
    console.log([...new Set(matchArrayUstensils)])
    fillList([...new Set(matchArrayUstensils)],0);
}

/* Display matched Apparels */
let matchArrayApparels = []
function displayApparels(){
    for(let i=0; i<uniqueListApparels.length; i++){
        console.log(standardize(uniqueListApparels[i]))
        if(standardize(uniqueListApparels[i]).includes(standardize(mainBar.value))){
            console.log("yes")
            matchArrayApparels.push(uniqueListApparels[i]);
        }else{console.log("no")}
    }
    console.log([...new Set(matchArrayApparels)])
    fillList([...new Set(matchArrayApparels)],0);
}

/* Listen to a change in the search bar */
mainBar.addEventListener("input", function(){
    arraySearchMain = [];
    validateInputSearch(this);
    fillList([],0);
    console.log(arraySearchMain)
});