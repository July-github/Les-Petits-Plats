import {recipes} from "./recipes.js";
import "./cards_creation.js";
console.log(recipes);

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
function getListsU(array){
    const arrayU = []
    for(let i=0; i<array.length; i++){
        for (let j=0; j<array[i].ustensils.length; j++){
            let ustensil = array[i].ustensils[j].toLowerCase()
            let capUstensil = ustensil[0].toUpperCase() + ustensil.slice(1);  
            arrayU.push(capUstensil)
        }
    }
    return arrayU.sort()
}
function getListsA(array){
    const arrayA = []
    for(let i=0; i<array.length; i++){
        let appliance = array[i].appliance.toLowerCase()
        let capAppliance = appliance[0].toUpperCase() + appliance.slice(1);
        arrayA.push(capAppliance);
    }
    return arrayA.sort()
}
function getListsI(array){
    const arrayI = []
    for(let i=0; i<array.length; i++){
        for (let j=0; j<array[i].ingredients.length; j++){
            let ingredient = array[i].ingredients[j].ingredient.toLowerCase()
            let capIngredient = ingredient[0].toUpperCase() + ingredient.slice(1);
            arrayI.push(capIngredient)
        }
    }
    return arrayI.sort()
}

/*Delete duplicates*/
const uniqueListIngredients = [...new Set(getListsI(recipes))]
const uniqueListUstensils = [...new Set(getListsU(recipes))]
const uniqueListApparels = [...new Set(getListsA(recipes))]

/*Fill dropdowns buttons with lists*/
function getUl(ulType){
    switch(ulType){
        case "ingredients":
            return "#myDropdown_I > .p_dropbtn";
        case "ustensils":
            return "#myDropdown_U > .p_dropbtn";
        case "apparels":
            return "#myDropdown_A > .p_dropbtn";
    }
}
function createLi(uniqueLists, ulType){
    const getUlType = getUl(ulType)    
    const ulList = document.querySelector(getUlType)
    uniqueLists.map(uniqueList => 
        fillList(ulList, uniqueList)
    )
}
function fillList(ulList, arrayRecipe){
    let listDropdown = document.createElement("li");
    let list = ulList.appendChild(listDropdown)
    list.textContent = arrayRecipe
}

createLi(uniqueListIngredients, "ingredients")
createLi(uniqueListApparels, "apparels")
createLi(uniqueListUstensils, "ustensils")

/* Search bar Dropdowns */
function searchDropMatched(arrayDrops, e){
    const standardizedInput = standardize(e.target.value)
        const newListDrop = arrayDrops.filter(function(arrayDrop){
            if((standardize(arrayDrop.innerText)).includes(standardizedInput)){
                arrayDrop.classList.remove("d-none")
                return arrayDrop    
            }else{
                if(arrayDrop.classList.contains("d-none")){
                    return arrayDrop    
                }else{
                    arrayDrop.classList.add("d-none")
                    return arrayDrop    
                }
            }
        })
        return newListDrop
}      

function getSearchDropI(){
    const searchDrop = document.getElementById("search_dropI")
    searchDrop.addEventListener("input", function(e) {
        const liTagIngredients = [...document.querySelectorAll("#myDropdown_I > ul > li")]
        if(mainBar.value ===""){
            searchDropMatched(liTagIngredients, e)
        }else{
            searchDropMatched(liTagIngredients, e)
        }
    })
}
function getSearchDropU(){
    const searchDrop = document.getElementById("search_dropU")
    searchDrop.addEventListener("input", function(e) {
        const liTagUstensils = [...document.querySelectorAll("#myDropdown_U > ul > li")]
        searchDropMatched(liTagUstensils, e)
    })
}
function getSearchDropA(){
    const searchDrop = document.getElementById("search_dropA")
    searchDrop.addEventListener("input", function(e) {
        const liTagApparels = [...document.querySelectorAll("#myDropdown_A > ul > li")]
        searchDropMatched(liTagApparels, e)
    })
}

getSearchDropI()
getSearchDropU()
getSearchDropA()

/* Display & close list on click*/
function displayList(){
    const showLists = [...document.querySelectorAll(".dropbtn")]
    showLists.map(showList => showList.addEventListener("click", function(){
        showList.nextElementSibling.classList.toggle("d-block")
        const dropContent = showList.nextElementSibling
        showList.style.width = "400px"
        dropContent.style.width = "400px"
        }
    ))
}
function closeList(){
    const closeLists = [...document.querySelectorAll(".dropdown-content > nav > i")]
    closeLists.map(closeList => closeList.addEventListener("click", function(){
        const parentCloseList = closeList.parentElement.parentElement
        parentCloseList.classList.remove("d-block")
        parentCloseList.style.width = "auto"
        const showLists = [...document.querySelectorAll(".dropbtn")]
        showLists.map(showList => showList.style.width = "initial")
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

/* Boucles natives */
function searchMatch(arrayRecipes, input){
    let arraySearchMain = []
    const standardizedInput = standardize(input)
    for(let i=0; i<arrayRecipes.length; i++){
        let lowerName = standardize(arrayRecipes[i].name)
        let lowerDescription = standardize(arrayRecipes[i].description)

        if(lowerName.includes(standardizedInput)){
            arraySearchMain.push(arrayRecipes[i])
        }
        if(lowerDescription.includes(standardizedInput)){
            arraySearchMain.push(arrayRecipes[i])
        }
        for(let j=0; j<arrayRecipes[i].ingredients.length; j++){
            let lowerIngredient = standardize(arrayRecipes[i].ingredients[j].ingredient)
            if(lowerIngredient.includes(standardizedInput)){
                arraySearchMain.push(arrayRecipes[i])
            }
        }
    }
    return arraySearchMain
}

/* Prog fonctionnelle */
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

/** Error in search bar **/
function displayError(arraySearchMain){
    const errorDiv = document.querySelector("#navbar")
    if(arraySearchMain.length === 0){
        errorDiv.setAttribute("data-after", "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.")
    }else{
        errorDiv.setAttribute("data-after", "");
    }
}

/* Display matched cards & dropdowns */
function displayMatched(arraySearchMain){
    displayError(arraySearchMain)
    removeCardsBlock()
    createCardsBlock(arraySearchMain)
    displayCards(arraySearchMain)
    displayListDropI(arraySearchMain)
    displayListDropU(arraySearchMain)
    displayListDropA(arraySearchMain)
}

function validateInputSearch(){
    //Regex 3 characters creation
    const regexInputSearch = /[a-zA-ZÀ-ÿ]{3,}/g;
    //const stringInputSearch = mainBar.textContent.toString()
    const validInputSearch = regexInputSearch.test(mainBar.value);

    if(validInputSearch === true){
        const arraySearchMain = mixArray(mainBar.value)
        displayMatched(arraySearchMain)    }
}

/* Listen to a change in the search bar */
mainBar.addEventListener("input", function(){
    validateInputSearch(this);
});

/***** Tag *****/  
/** Tags creation **/
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

/** Tags display **/
function testEqualityI(arraySearchMain, liTagIngredient){
    let validRecipe = false
    arraySearchMain.map(item => {
        item.ingredients.forEach(el => {
            if((standardize(el.ingredient)) === (standardize(liTagIngredient.textContent))){
            return validRecipe = true
            }
        })
    })
    return validRecipe
}
function testEqualityU(arraySearchMain, liTagUstensil){
    let validRecipe = false
    arraySearchMain.map(item => {
        item.ustensils.forEach(el => {
            if((standardize(el)) === (standardize(liTagUstensil.textContent))){
            return validRecipe = true
            }
        })
    })
    return validRecipe
}
function testEqualityA(arraySearchMain, liTagApparel){
    let validRecipe = false
    arraySearchMain.forEach(item => {
            if((standardize(item.appliance)) === (standardize(liTagApparel.textContent))){
            return validRecipe = true
            }
        })
        return validRecipe
}
function displayListDropI(arraySearchMain){
    const liTagIngredients = [...document.querySelectorAll("#myDropdown_I > ul > li")]
    liTagIngredients.filter(liTagIngredient => testEqualityI(arraySearchMain, liTagIngredient))
    liTagIngredients.map(liTagIngredient =>{
        if(testEqualityI(arraySearchMain, liTagIngredient) === false){
            liTagIngredient.classList.add("d-none")
    }else{
        liTagIngredient.classList.remove("d-none")
    }
})
}
function displayListDropU(arraySearchMain){
    const liTagUstensils = [...document.querySelectorAll("#myDropdown_U > ul > li")]
    liTagUstensils.filter(liTagUstensil => testEqualityU(arraySearchMain, liTagUstensil))
    liTagUstensils.map(liTagUstensil =>{
        if(testEqualityU(arraySearchMain, liTagUstensil) === false){
            liTagUstensil.classList.add("d-none")
    }else{
        liTagUstensil.classList.remove("d-none")
    }
})
}
function displayListDropA(arraySearchMain){
    const liTagApparels = [...document.querySelectorAll("#myDropdown_A > ul > li")]
    liTagApparels.filter(liTagApparel => testEqualityA(arraySearchMain, liTagApparel))
    liTagApparels.map(liTagApparel =>{
        if(testEqualityA(arraySearchMain, liTagApparel) === false){
            liTagApparel.classList.add("d-none")
    }else{
        liTagApparel.classList.remove("d-none")
    }
})
}
function displayTag(){
    if(mainBar.value===""){
        const arraySearchMain = testAlreadyTag()
        console.log(arraySearchMain)
        displayMatched(arraySearchMain)
    }else{
        const arraySearchMain = mixArray(mainBar.value)
        displayMatched(arraySearchMain)
    }
}
function displayOnClickTag(){
    const liTagIngredients = [...document.querySelectorAll("#myDropdown_I > ul > li")]
    const liTagUstensils = [...document.querySelectorAll("#myDropdown_U > ul > li")]
    const liTagApparels = [...document.querySelectorAll("#myDropdown_A > ul > li")]

    liTagIngredients.map(liTagIngredient => 
        liTagIngredient.addEventListener("click", function(e){
            e.target.classList.add("disabled")
            createTag(e, "ingredients")
            displayTag(e)
            })
        )
    liTagUstensils.map(liTagUstensil => 
        liTagUstensil.addEventListener("click", function(e){
            e.target.classList.add("disabled")
            createTag(e, "ustensils")  
            displayTag()
        })
    )
    liTagApparels.map(liTagApparel => 
        liTagApparel.addEventListener("click", function(e){
            e.target.classList.add("disabled")
            createTag(e, "apparels") 
            displayTag()
        })
    )
}
displayOnClickTag()

/** Close tag on click **/
document.addEventListener("click", function(e){
    if(e.target && e.target.className.includes("iconU") || e.target.className.includes("iconA") || e.target.className.includes("iconI")){
        if(mainBar.value===""){
            e.target.parentElement.remove()
            const arraySearchMain = testAlreadyTag()
            console.log(arraySearchMain)
            displayMatched(arraySearchMain)
            removeDisabledI(e)
            removeDisabledU(e)
            removeDisabledA(e)
            
        }else{
            e.target.parentElement.remove()
            const arraySearchMain = mixArray(mainBar.value)
            displayMatched(arraySearchMain)
            removeDisabledI(e)
            removeDisabledU(e)
            removeDisabledA(e)
        }
    }
})
function removeDisabledI(e){
    const liTagIngredients = [...document.querySelectorAll("#myDropdown_I > ul > li")]
    liTagIngredients.map(liTagIngredient =>{
        if(e.target.parentElement.innerText === liTagIngredient.innerText){
            console.log(liTagIngredient.innerText)
            liTagIngredient.classList.remove("disabled")
        }
    })
}
function removeDisabledU(e){
    const liTagUstensils = [...document.querySelectorAll("#myDropdown_U > ul > li")]
    liTagUstensils.map(liTagUstensil =>{
        if(e.target.parentElement.innerText === liTagUstensil.innerText){
            console.log(liTagUstensil.innerText)
            liTagUstensil.classList.remove("disabled")
        }
    })
}
function removeDisabledA(e){
    const liTagApparels = [...document.querySelectorAll("#myDropdown_A > ul > li")]
    liTagApparels.map(liTagApparel =>{
        if(e.target.parentElement.innerText === liTagApparel.innerText){
            console.log(liTagApparel.innerText)
            liTagApparel.classList.remove("disabled")
        }
    })
}
/***** Mix filters *****/
/** Filter list dropdowns depending on tags **/
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

/** 1 Tag & Main search bar **/
function mixArray(input){
    const arrayTag = testAlreadyTag()
    return [...searchMatched(arrayTag, input)]
}

/** Several same type of tags **/
function reduceArray(textParentTag, tagMatched){
    for (let i=0; i<textParentTag.length; i++){
        const arrayTag = tagMatched(recipes, textParentTag[i])
        return [...tagMatched(arrayTag, textParentTag.slice(-1)[0])]
    }
}

/** Several different types of tags & Main search bar **/
function reduceMixArray(textParentTagX, tagMatchedX, tagMatchedY, textParentTagY){
    const reducedX = reduceArray(textParentTagX, tagMatchedX)
    for (let i=0; i<textParentTagY.length; i++){
        const arrayTag = tagMatchedY(reducedX, textParentTagY[i])
        return [...tagMatchedY(arrayTag, textParentTagY.slice(-1)[0])]
    }
}

/** Test for existing Tags **/
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