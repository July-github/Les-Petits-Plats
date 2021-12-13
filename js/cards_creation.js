/***** Cards *****/
/* Create cards */
function createCard(element){
    const newDiv = document.createElement("div")
    return element.appendChild(newDiv).classList.add("card", "p-0", "my-3", "mx-0")
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
    return element.appendChild(newDiv).classList.add("row", "rowTop", "mb-3", "w-100", "flex-nowrap")
}
function createNewRecipeName(element){
    const newDiv = document.createElement("div")
    return element.appendChild(newDiv).classList.add("recipe", "col-8", "fs-6")
}
function createClock(element){
    const newIClock = document.createElement("i")
    const newClock = element.appendChild(newIClock)
    const newClassClock = newClock.classList.add("far", "fa-clock", "iconClock", "col-1", "fs-4", "p-0")
    return newClassClock
}
function setClock(element){
    const newAriaClock = element.setAttribute("aria-hidden", "true")
    return newAriaClock
}
function createNewTime(element){
    const newDiv = document.createElement("div")
    return element.appendChild(newDiv).classList.add("time", "col-3", "p-0")
}
function createNewRowBottom(element){
    const newDiv = document.createElement("div")
    return element.appendChild(newDiv).classList.add("row", "rowBottom")
}
function createNewIngredient(element){
    const newDiv = document.createElement("div")
    return element.appendChild(newDiv).classList.add("ingredients", "col-5")
}
function createNewUl(element){
    const newUl = document.createElement("ul")
    return element.appendChild(newUl).classList.add("ulIngredients", "p-0")
}
function createNewLi(element){
    const newLi = document.createElement("li")
    return element.appendChild(newLi).classList.add("list-unstyled")
}
function createNewDescription(element){
    const newDiv = document.createElement("div")
    return element.appendChild(newDiv).classList.add("description", "col-7")
}
export function createCardsBlock(arrayRecipes){
    // Card creation
    arrayRecipes.map(() => createCard(document.getElementById("cards")))
    const cards = [...document.querySelectorAll(".card")]

    // Recipe image creation
    cards.map(card => createImg(card))
    const images = [...document.querySelectorAll(".card > img")]
    images.map(image => setImg(image))
    
    // Bodycard creation
    cards.map(card => createCardBody(card))
    const cardBodies = [...document.querySelectorAll(".card-body")]
    
    // Top row creation
    cardBodies.map(cardBodie => createNewRowTop(cardBodie))
    const topRows = [...document.querySelectorAll(".rowTop")]
    
    // Recipe name creation
    topRows.map(topRow => createNewRecipeName(topRow))
     
    // Recipe timing & icon creation
    topRows.map(topRow => createClock(topRow))
    const clockIcons = [...document.querySelectorAll(".iconClock")]
    clockIcons.map(clockIcon => setClock(clockIcon))
    topRows.map(topRow => createNewTime(topRow))
    
    // Bottom row creation
    cardBodies.map(cardBody => createNewRowBottom(cardBody))
    const bottomRows = [...document.querySelectorAll(".rowBottom")]
    
    // Ingredients list creation
    bottomRows.map(bottomRow => createNewIngredient(bottomRow))
    const ingredients = [...document.querySelectorAll(".ingredients")]
    ingredients.map(ingredient => createNewUl(ingredient))
    
    // Recipe description creation
    bottomRows.map(bottomRow => createNewDescription(bottomRow))
}

export function removeCardsBlock(){
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
function transformCase(array, j){
    const ingredient = array.ingredients[j].ingredient.toLowerCase()
    const capIngredient = ingredient[0].toUpperCase() + ingredient.slice(1);
    return capIngredient
}
function fillIngredients(array, index){   
    const recipeCardsIngredients = [...document.querySelectorAll(".ulIngredients")] 
    const ulLis = recipeCardsIngredients[index].querySelectorAll(".ulIngredients > li")
    for (let j=0; j<array.ingredients.length; j++){
        if(array.ingredients[j].unit){
            ulLis[j].innerHTML = transformCase(array, j) + ": " + array.ingredients[j].unit
        }if(array.ingredients[j].quantity){
            ulLis[j].innerHTML = transformCase(array, j) + ": " + array.ingredients[j].quantity
        }if((array.ingredients[j].quantity) && (array.ingredients[j].unit)){
            ulLis[j].innerHTML = transformCase(array, j) + ": " + array.ingredients[j].quantity + " " + array.ingredients[j].unit
        }
        else{
        ulLis[j].innerHTML = transformCase(array, j)
        }
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
export function displayCards(array){
    fillRecipesName(array)
    fillRecipesTime(array)
    fillRecipesDescription(array)
    displayRecipesIngredient(array)
}