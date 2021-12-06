import {recipes} from "./recipes.js";
console.log(recipes);

/***** Cards *****/
/* Create cards */
function createCard(element){
    const newDiv = document.createElement("div")
    return element.appendChild(newDiv).classList.add("card", "p-0", "my-3", "mx-1","col")
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
    return element.appendChild(newDiv).classList.add("recipe", "col-9", "sm-col-8", "fs-6")
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
    return element.appendChild(newDiv).classList.add("time", "col-2", "sm-col-3", "fs-6", "p-0")
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

function createCardsBlock(arrayRecipes){
    // Card creation
    arrayRecipes.map(arrayRecipe => createCard(document.getElementById("cards")))
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
function displayCards(array){
    fillRecipesName(array)
    fillRecipesTime(array)
    fillRecipesDescription(array)
    displayRecipesIngredient(array)
}

createCardsBlock(recipes)
displayCards(recipes)

/***** Dropdowns *****/
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
/* Search bar Dropdowns */
function searchDropMatched(arrayDrop, e){
    const standardizedInput = standardize(e.target.value)
    const newListDrop = arrayDrop.filter(item => standardize(item).includes(standardizedInput))
    return newListDrop
}
function getDropClick(dropClickType){
    switch(dropClickType){
        case "ingredients":
            return "search_dropI";
        case "ustensils":
            return "search_dropU";
        case "apparels":
            return "search_dropA";
    }
}
function getSearchDrop(arrayDrop, index, dropClickType){
    const getArrayDrop = getDropClick(dropClickType)
    const searchDrop = document.getElementById(getArrayDrop)
    searchDrop.addEventListener("input", function(e) {
        resetDropdowns(index)
        const newArrayDrop = searchDropMatched(arrayDrop, e)
        fillList(newArrayDrop, index)
        displayOnClickTag()
    })
}
getSearchDrop(uniqueListIngredients, 0, "ingredients")
getSearchDrop(uniqueListApparels, 1, "apparels")
getSearchDrop(uniqueListUstensils, 2, "ustensils")

/* Display & close list on click*/
function displayList(){
    const showLists = [...document.querySelectorAll(".dropbtn")]
    showLists.map(showList => showList.addEventListener("click", function(){
        showList.nextElementSibling.classList.toggle("d-block")
        })
    )
}
function closeList(){
    const closeLists = [...document.querySelectorAll(".dropdown-content > nav > i")]
    closeLists.map(closeList => closeList.addEventListener("click", function(){
        closeList.parentElement.parentElement.classList.remove("d-block")
    }))
}
displayList();
closeList()

/***** Main search bar *****/
const mainBar = document.getElementById("search_bar")

/* Array match test */
// switch the string to lowercase & without any accent to compare
function standardize(item){
    return item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

/* Display matched cards & dropdowns */
function searchMatched(arrayRecipes, input){
    const standardizedInput = standardize(input)
    const arraySearchName = arrayRecipes.filter(arrayRecipe => standardize(arrayRecipe.name).includes(standardizedInput))
    const arraySearchDescription = arrayRecipes.filter(arrayRecipe => standardize(arrayRecipe.description).includes(standardizedInput))
    const arraySearchIngredients = arrayRecipes.filter(arrayRecipe => {
        let validRecipe = false
        arrayRecipe.ingredients.forEach(item => {
                if(standardize(item.ingredient).includes(standardizedInput)){ 
                    return validRecipe = true
                }
            })
       return validRecipe
    })
    const arraySearch = [...arraySearchName, ...arraySearchDescription, ...arraySearchIngredients]
    return [...new Set(arraySearch)]
}
function tagIMatched(arrayRecipes, input){
    const standardizedInput = standardize(input)
    const arraySearchIngredients = arrayRecipes.filter(arrayRecipe => {
        let validRecipe = false
        arrayRecipe.ingredients.forEach(item => {
                if(standardize(item.ingredient).includes(standardizedInput)){ 
                    return validRecipe = true
                }
            })
        return validRecipe
        })
    return [...arraySearchIngredients]
}
function tagAMatched(arrayRecipes, input){
    const standardizedInput = standardize(input)
    const arrayTagApparels = arrayRecipes.filter(arrayRecipe => standardize(arrayRecipe.appliance).includes(standardizedInput))
    return [...arrayTagApparels]
}
function tagUMatched(arrayRecipes, input){
    const standardizedInput = standardize(input)
    const arrayTagUstensils = arrayRecipes.filter(arrayRecipe => {
        let validRecipe = false
        arrayRecipe.ustensils.forEach(el => {
            if(standardize(el).includes(standardizedInput)){
                return validRecipe = true
            }     
        })
        return validRecipe
    })
    return [...arrayTagUstensils]
}
function mixArray(input){
    const arrayTag = testAlreadyTag()
    return [...searchMatched(arrayTag, input)]
}
function displayError(arraySearchMain){
    const errorDiv = document.querySelector("#navbar")
    if(arraySearchMain.length === 0){
        errorDiv.setAttribute("data-after", "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.")
    }else{
        errorDiv.setAttribute("data-after", "");
    }
}
function displayMatched(arraySearchMain){
    displayError(arraySearchMain)
    removeCardsBlock()
    createCardsBlock(arraySearchMain)
    displayCards(arraySearchMain)
    resetDropdowns(0)
    resetDropdowns(1)
    resetDropdowns(2)
    const arraySearchIngredients = []
    const arraySearchAppliance = []
    const arraySearchUstensils = []
    getLists(arraySearchMain, arraySearchUstensils, arraySearchAppliance, arraySearchIngredients)
    fillList([...new Set(arraySearchIngredients)], 0)
    fillList([...new Set(arraySearchAppliance)], 1)
    fillList([...new Set(arraySearchUstensils)], 2)
    displayOnClickTag()
}
function reduceArray(textParentTag, tagMatched){
    for (let i=0; i<textParentTag.length; i++){
        const arrayTag = tagMatched(recipes, textParentTag[i])
        tagMatched(arrayTag, textParentTag.slice(-1)[0])
        return [...tagMatched(arrayTag, textParentTag.slice(-1)[0])]
    }
}
function reduceMixArray(textParentTagX, tagMatchedX, tagMatchedY, textParentTagY){
    for (let i=0; i<textParentTagX.length; i++){
        const arrayTag = tagMatchedX(recipes, textParentTagX[i])
        return [...tagMatchedY(arrayTag, textParentTagY.slice(-1)[0])]
    }
}
function testAlreadyTag(){
    const testTagI = document.getElementsByClassName("iconI").length
    const testTagA = document.getElementsByClassName("iconA").length
    const testTagU = document.getElementsByClassName("iconU").length
    const TagI = document.querySelectorAll(".iconI")
    const TagA = document.querySelectorAll(".iconA")
    const TagU = document.querySelectorAll(".iconU")

    const parentTagI = [...TagI].map(TagI => TagI.parentElement, [])
    const textParentTagI = parentTagI.map(parentTagI => parentTagI.innerText)
    const parentTagA = [...TagA].map(TagA => TagA.parentElement, [])
    const textParentTagA = parentTagA.map(parentTagA => parentTagA.innerText)
    const parentTagU = [...TagU].map(TagU => TagU.parentElement, [])
    const textParentTagU = parentTagU.map(parentTagU => parentTagU.innerText)

    if((testTagI !== 0) && (testTagA === 0) && (testTagU === 0)){
        if(testTagI === 1){
            return tagIMatched(recipes, textParentTagI.slice(-1)[0])
        }else{
            return reduceArray(textParentTagI, tagIMatched)
        } 
    }if((testTagA !== 0) && (testTagI === 0) && (testTagU === 0)){
        if(testTagA === 1){
            return tagAMatched(recipes, textParentTagA.slice(-1)[0])
        }else{
            return reduceArray(textParentTagA, tagAMatched)
        } 
    }if((testTagU !== 0) && (testTagA === 0) && (testTagI === 0)){
        if(testTagU === 1){
            return tagUMatched(recipes, textParentTagU.slice(-1)[0])
        }else{
            return reduceArray(textParentTagU, tagUMatched)
        }
    }if((testTagI !== 0) && (testTagA !== 0) && (testTagU === 0)){
        return reduceMixArray(textParentTagI, tagIMatched, tagAMatched, textParentTagA)

    }if((testTagI !== 0) && (testTagA === 0) && (testTagU !== 0)){
        return reduceMixArray(textParentTagI, tagIMatched, tagUMatched, textParentTagU)

    }if((testTagI === 0) && (testTagA !== 0) && (testTagU !== 0)){
        return reduceMixArray(textParentTagA, tagAMatched, tagUMatched, textParentTagU)

    }if((testTagI === 0) && (testTagA === 0) && (testTagU === 0)){
        return recipes
    }
}

function validateInputSearch(e){
    //Regex 3 characters creation
    const regexInputSearch = /[a-zA-ZÀ-ÿ]{3,}/g;
    //const stringInputSearch = mainBar.textContent.toString()
    const validInputSearch = regexInputSearch.test(mainBar.value);

    if(validInputSearch === false){
        removeCardsBlock()
        createCardsBlock(recipes)
        displayCards(recipes)
        resetDropdowns(0)
        fillList(uniqueListIngredients, 0)
        resetDropdowns(1)
        fillList(uniqueListApparels, 1)
        resetDropdowns(2)
        fillList(uniqueListUstensils, 2)
        displayError(recipes)
    }else{
        const arraySearchMain = mixArray(mainBar.value)
        displayMatched(arraySearchMain)
    }
}

/* Listen to a change in the search bar */
mainBar.addEventListener("input", function(){
    validateInputSearch(this);
});

/***** Tag on click *****/  
function getTagColor(tagType){
    switch(tagType){
        case "ingredients":
            return "bg-primary";
        case "ustensils":
            return "bg-danger";
        case "apparels":
            return "bg-success";
    }
}
function createTag(e, tagType){
    const createTag = document.createElement("div")
    const tag = document.getElementById("taglist")
    const tagColor = getTagColor(tagType)
    createTag.classList.add(tagColor, "px-3", "py-2", "m-2", "rounded-2", "text-nowrap") 
    tag.appendChild(createTag)
    if(tagType === "ingredients"){
        createTag.innerHTML = e.target.innerHTML + '<i class="far fa-times-circle iconI"></i>'
    }
    if(tagType === "ustensils"){
        createTag.innerHTML = e.target.innerHTML + '<i class="far fa-times-circle iconU"></i>'
    }
    if(tagType === "apparels"){
        createTag.innerHTML = e.target.innerHTML + '<i class="far fa-times-circle iconA"></i>'
    }
}

function displayOnClickTag(){
    const liTagIngredients = document.querySelectorAll("#myDropdown_I > ul > li")
    const liTagUstensils = document.querySelectorAll("#myDropdown_U > ul > li")
    const liTagApparels = document.querySelectorAll("#myDropdown_A > ul > li")

    for(let i=0; i<liTagIngredients.length; i++){
        liTagIngredients[i].addEventListener("click", function(e){
            createTag(e, "ingredients")
            if(mainBar.value===""){
                const arraySearchMain = testAlreadyTag()
                displayMatched(arraySearchMain)
                e.target.classList.add("d-none")
            }else{
                const arraySearchMain = mixArray(mainBar.value)
                displayMatched(arraySearchMain)
            }
        })
    }
    for(let i=0; i<liTagUstensils.length; i++){    
        liTagUstensils[i].addEventListener("click", function(e){
            createTag(e, "ustensils")  
            if(mainBar.value===""){
                const arraySearchMain = testAlreadyTag()
                displayMatched(arraySearchMain)
            }else{
                const arraySearchMain = mixArray(mainBar.value)
                displayMatched(arraySearchMain)
            }      
        })
    }
    for(let i=0; i<liTagApparels.length; i++){
        liTagApparels[i].addEventListener("click", function(e){
            createTag(e, "apparels") 
            if(mainBar.value===""){
                const arraySearchMain = testAlreadyTag()
                displayMatched(arraySearchMain)
            }else{
                const arraySearchMain = mixArray(mainBar.value)
                displayMatched(arraySearchMain)
            }
        })
    }
}
displayOnClickTag()

/* close tag on click */
document.addEventListener("click", function(e){
    if(e.target && e.target.className.includes("iconU") || e.target.className.includes("iconA") || e.target.className.includes("iconI")){
        if(mainBar.value===""){
            e.target.parentElement.remove()
            const arraySearchMain = testAlreadyTag()
            displayMatched(arraySearchMain)
        }else{
            e.target.parentElement.remove()
            const arraySearchMain = mixArray(mainBar.value)
            displayMatched(arraySearchMain)
        }
    }
})