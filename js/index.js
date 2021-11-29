import {recipes} from "./recipes.js";
console.log(recipes);

/*** Cards ***/
/* Create cards */
function createCard(element){
    const newDiv = document.createElement("div")
    return element.appendChild(newDiv).classList.add("card", "p-0", "my-3")
}
function createImg(element){
    const newImg = document.createElement("img")
    return element.appendChild(newImg).classList.add("w-100")
}
function setImg(element){
    const newSrcImg = element.setAttribute("src", "./images/img.svg")
    const newAltImg = element.setAttribute("alt", "image plat")
    return newAltImg, newSrcImg
}
function createCardBody(element){
    const newDiv = document.createElement("div")
    return element.appendChild(newDiv).classList.add("card-body", "text-left")
}
function createNewRowTop(element){
    const newDiv = document.createElement("div")
    return element.appendChild(newDiv).classList.add("row", "rowTop", "my-2", "w-100", "flex-nowrap")
}
function createNewRecipeName(element){
    const newDiv = document.createElement("div")
    return element.appendChild(newDiv).classList.add("recipe", "col-8", "fs-5")
}
function createClock(element){
    const newIClock = document.createElement("i")
    const newClock = element.appendChild(newIClock)
    const newClassClock = newClock.classList.add("far", "fa-clock", "iconClock", "col-1", "m-2")
    return newClassClock
}
function setClock(element){
    const newAriaClock = element.setAttribute("aria-hidden", "true")
    return newAriaClock
}
function createNewTime(element){
    const newDiv = document.createElement("div")
    return element.appendChild(newDiv).classList.add("time", "col-3", "fw-bold", "fs-6")
}
function createNewRowBottom(element){
    const newDiv = document.createElement("div")
    return element.appendChild(newDiv).classList.add("row", "rowBottom", "fs-6")
}
function createNewIngredient(element){
    const newDiv = document.createElement("div")
    return element.appendChild(newDiv).classList.add("ingredients", "col-5")
}
function createNewUl(element){
    const newUl = document.createElement("ul")
    return element.appendChild(newUl).classList.add("ulIngredients")
}
function createNewLi(element){
    const newLi = document.createElement("li")
    return element.appendChild(newLi)
}
function createNewDescription(element){
    const newDiv = document.createElement("div")
    return element.appendChild(newDiv).classList.add("description", "col-7")
}

function createCardsBlock(arrays){
    arrays.map(array => createCard(document.getElementById("cards")))
        const cards = [...document.querySelectorAll(".card")]
        cards.map(card => createImg(card))
            const images = [...document.querySelectorAll(".card > img")]
            images.map(image => setImg(image))
        cards.map(card => createCardBody(card))
            const cardBodies = [...document.querySelectorAll(".card-body")]
            cardBodies.map(cardBodie => createNewRowTop(cardBodie))
                const topRows = [...document.querySelectorAll(".rowTop")]
                topRows.map(topRow => createNewRecipeName(topRow))
                topRows.map(topRow => createClock(topRow))
                    const clockIcons = [...document.querySelectorAll(".iconClock")]
                    clockIcons.map(clockIcon => setClock(clockIcon))
                topRows.map(topRow => createNewTime(topRow))
            cardBodies.map(cardBody => createNewRowBottom(cardBody))
                const bottomRows = [...document.querySelectorAll(".rowBottom")]
                    bottomRows.map(bottomRow => createNewIngredient(bottomRow))
                    const ingredients = [...document.querySelectorAll(".ingredients")]
                    ingredients.map(ingredient => createNewUl(ingredient))
                bottomRows.map(bottomRow => createNewDescription(bottomRow))
}
function removeCardsBlock(){
    while(document.querySelector(".card")){
        document.getElementById("cards").removeChild(document.querySelector(".card"));
    }
}
/* Fill cards */
function fillRecipesName(array){
    const recipeCardsNames = [...document.querySelectorAll(".recipe")]
    for (let i=0; i<array.length; i++){
        const lowRecipeNames = array[i].name.toLowerCase()
        recipeCardsNames[i].innerHTML = lowRecipeNames[0].toUpperCase() + lowRecipeNames.slice(1)
    }
    return [recipeCardsNames]
}
function fillRecipesTime(array){
    const recipeCardsTimes = [...document.querySelectorAll(".time")] 
    for (let i=0; i<array.length; i++){
        recipeCardsTimes[i].innerHTML = array[i].time + " min"
    }
    return [recipeCardsTimes]
}
function fillRecipesDescription(array){
    const recipeCardsDescription = [...document.querySelectorAll(".description")] 
    for (let i=0; i<array.length; i++){
        recipeCardsDescription[i].innerHTML = array[i].description
    }
    return [recipeCardsDescription]
}
function createLiIngredient(array, index){
    const recipeCardsIngredients = [...document.querySelectorAll(".ulIngredients")] 
    for (let j=0; j<array.ingredients.length; j++){
        createNewLi(recipeCardsIngredients[index])
    }
    return recipeCardsIngredients
}
function fillIngredients(array, index){   
    const recipeCardsIngredients = [...document.querySelectorAll(".ulIngredients")] 
    const ulLis = recipeCardsIngredients[index].querySelectorAll(".ulIngredients > li")
    for (let j=0; j<array.ingredients.length; j++){
        ulLis[j].innerHTML = array.ingredients[j].ingredient
    }
    return ulLis
}
function displayRecipesIngredient(array){
    for (let i=0; i<array.length; i++){
        createLiIngredient(array[i], i)
        for (let j=0; j<array[i].ingredients.length; j++){
            fillIngredients(array[i], i)
        }
    }
}

function displayCards(array){
    fillRecipesName(array)
    fillRecipesTime(array)
    fillRecipesDescription(array)
    displayRecipesIngredient(array)
}

createCardsBlock(recipes)
displayCards(recipes)

/*** Dropdowns ***/
/*Get lists for buttons*/
const listUstensils = []
const ListApparel = []
const listIngredients = []

function getLists(array, arrayU, arrayA, arrayI){    
    for(let i=0; i<array.length; i++){
        for (let j=0; j<array[i].ingredients.length; j++){
            let ingredient = array[i].ingredients[j].ingredient.toLowerCase()
            let capIngredient = ingredient[0].toUpperCase() + ingredient.slice(1);
            arrayI.push(capIngredient)
        }
        for (let j=0; j<array[i].ustensils.length; j++){
            let ustensil = array[i].ustensils[j].toLowerCase()
            let capUstensil = ustensil[0].toUpperCase() + ustensil.slice(1);  
            arrayU.push(capUstensil)
        }
        let appliance = array[i].appliance.toLowerCase()
        let capAppliance = appliance[0].toUpperCase() + appliance.slice(1);
        arrayA.push(capAppliance);
    }
    return arrayI.sort(), arrayU.sort(), arrayA.sort()
}
getLists(recipes, listUstensils, ListApparel, listIngredients)

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

function resetDropdowns(index){
    const ulLists = document.querySelectorAll(".p_dropbtn")
    while(ulLists[index].querySelector("li")){
        ulLists[index].removeChild(ulLists[index].querySelector("li"))
    }
}

/* Display list on click*/
function displayList(){
    const showLists = [...document.querySelectorAll(".dropbtn")]
    showLists.map(showList => showList.addEventListener("click", function(){
        showList.nextElementSibling.classList.toggle("d-block")
        })
    )
}
displayList();

/*** Main search bar ***/
const mainBar = document.getElementById("search_bar")

/* Array match test */
// switch the string to lowercase & without any accent to compare
function standardize(item){
    return item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

/* Display matched cards & dropdowns */
function searchMatched(arrays, input){
    const arraySearchName = arrays.filter(array => standardize(array.name).includes(standardize(input)))
    const arraySearchDescription = arrays.filter(array => standardize(array.description).includes(standardize(input)))
    const arraySearchIngredients = arrays.filter(array => ((array.ingredients).map(el => standardize(el.ingredient))).includes(standardize(input)))
    //console.log(arraySearchDescription)
    const arraySearch = [...arraySearchName, ...arraySearchDescription, ...arraySearchIngredients]
    //console.log([...arraySearch])
    return [...new Set(arraySearch)]
}

function displayMatched(arrays, input){
    const arraySearchMain = searchMatched(arrays, input)
    const arraySearchIngredients = []
    const arraySearchAppliance = []
    const arraySearchUstensils = []
    removeCardsBlock()
    createCardsBlock(arraySearchMain)
    displayCards(arraySearchMain)
    resetDropdowns(0)
    resetDropdowns(1)
    resetDropdowns(2)
    getLists(arraySearchMain, arraySearchUstensils, arraySearchAppliance, arraySearchIngredients)
    fillList([...new Set(arraySearchIngredients)], 0)
    fillList([...new Set(arraySearchAppliance)], 1)
    fillList([...new Set(arraySearchUstensils)], 2)
    displayOnClickTag()
}
function validateInputSearch(){
    //Regex 3 characters creation
    const regexInputSearch = /[a-zA-ZÀ-ÿ]{3,}/g;
    //const stringInputSearch = mainBar.textContent.toString()
    const validInputSearch = regexInputSearch.test(mainBar.value);
    if((mainBar.value === "") || (validInputSearch === false)){
        removeCardsBlock()
        createCardsBlock(recipes)
        displayCards(recipes)
        resetDropdowns(0)
        fillList(uniqueListIngredients, 0)
        resetDropdowns(1)
        fillList(uniqueListApparels, 1)
        resetDropdowns(2)
        fillList(uniqueListUstensils, 2)
    }else{
        displayMatched(recipes, mainBar.value)
    }
}

/* Listen to a change in the search bar */
mainBar.addEventListener("input", function(){
    validateInputSearch(this);
});

/*** Tag on click ***/  
function mixMatched(item){
    const toto = searchMatched(recipes, mainBar.value)
    displayMatched(toto, item)
}
function displayOnClickTag(){
    const liTagIngredients = document.querySelectorAll("#myDropdown_I > ul > li")
    const liTagUstensils = document.querySelectorAll("#myDropdown_U > ul > li")
    const liTagApparels = document.querySelectorAll("#myDropdown_A > ul > li")

    for(let i=0; i<liTagIngredients.length; i++){
        liTagIngredients[i].addEventListener("click", function(e){
            const createTag = document.createElement("div")
            const tag = document.getElementById("taglist")
            createTag.innerHTML = e.target.innerHTML + " " + ' <i class="far fa-times-circle" id="iconI"></i>'
            createTag.classList.add("bg-primary", "px-3", "py-2", "m-2", "rounded-2", "text-nowrap") 
            tag.appendChild(createTag)
            if(mainBar.value===""){
                displayMatched(recipes, e.target.innerHTML)   
            }else{
                mixMatched(e.target.innerHTML)
            }
        })
    }
    for(let i=0; i<liTagUstensils.length; i++){    
        liTagUstensils[i].addEventListener("click", function(e){
            const createTag = document.createElement("div")
            const tag = document.getElementById("taglist")
            createTag.innerHTML = e.target.innerHTML + " " + ' <i class="far fa-times-circle" id="iconU"></i>'
            createTag.classList.add("bg-danger", "px-3", "py-2", "m-2", "rounded-2", "text-nowrap")
            tag.appendChild(createTag)    
            if(mainBar.value===""){
                displayMatched(recipes, e.target.innerHTML)   
            }else{
                mixMatched(e.target.innerHTML)
            }      
        })
    }
    for(let i=0; i<liTagApparels.length; i++){    
        liTagApparels[i].addEventListener("click", function(e){
            const createTag = document.createElement("div")
            const tag = document.getElementById("taglist")
            createTag.innerHTML = e.target.innerHTML + " " + ' <i class="far fa-times-circle" id="iconA"></i>'
            createTag.classList.add("bg-success", "px-3", "py-2", "m-2", "rounded-2", "text-nowrap")
            tag.appendChild(createTag)  
            if(mainBar.value===""){
                displayMatched(recipes, e.target.innerHTML)   
            }else{
                mixMatched(e.target.innerHTML)
            }
        })
    }
}
displayOnClickTag()

/* close tag on click */
document.addEventListener("click", function(e){
    if(e.target && e.target.id== "iconU" || e.target.id== "iconA" || e.target.id== "iconI"){
        e.target.parentElement.classList.toggle("d-none")
        /*if(mainBar.value===""){
            displayCards(recipes)   
        }else{
            mixMatched(e.target.innerHTML)
        }*/
    }
})
