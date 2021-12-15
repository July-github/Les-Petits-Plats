/***** Dropdowns *****/
/*Get lists for buttons*/
export function getListsU(array){
    const arrayU = []
    for(let i=0; i<array.length; i++){
        for (let j=0; j<array[i].ustensils.length; j++){
            let ustensil = array[i].ustensils[j].toLowerCase()
            let capUstensil = ustensil[0].toUpperCase() + ustensil.slice(1);  
            arrayU.push(capUstensil)
        }
    }
    return arrayU.sort((a,b) => a.localeCompare(b))
}
export function getListsA(array){
    const arrayA = []
    for(let i=0; i<array.length; i++){
        let appliance = array[i].appliance.toLowerCase()
        let capAppliance = appliance[0].toUpperCase() + appliance.slice(1);
        arrayA.push(capAppliance);
    }
    return arrayA.sort((a,b) => a.localeCompare(b))
}
export function getListsI(array){
    const arrayI = []
    for(let i=0; i<array.length; i++){
        for (let j=0; j<array[i].ingredients.length; j++){
            let ingredient = array[i].ingredients[j].ingredient.toLowerCase()
            let capIngredient = ingredient[0].toUpperCase() + ingredient.slice(1);
            arrayI.push(capIngredient)
        }
    }
    return arrayI.sort((a,b) => a.localeCompare(b))
}

/*Delete duplicates*/
function getUnique(arrayDrop){
    return [...new Set(arrayDrop)]
}

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
export function createLi(arrayDrop, ulType){
    const getUlType = getUl(ulType)    
    const ulList = document.querySelector(getUlType)
    const uniqueLists = getUnique(arrayDrop)
    uniqueLists.map(uniqueList => 
        fillList(ulList, uniqueList)
    )
}
function fillList(ulList, arrayRecipe){
    let listDropdown = document.createElement("li");
    let list = ulList.appendChild(listDropdown)
    list.textContent = arrayRecipe
}

/* Search bar Dropdowns */
import {standardize} from "./mainSearch_bar.js";

export function searchDropMatched(arrayDrops, e){
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

import {displayListDropI, displayListDropU, displayListDropA} from "./tags.js";   
import {mixSearch} from "./mix_filters.js";

function getSearchDropI(){
    const searchDrop = document.getElementById("search_dropI")  
    const liTagIngredients = [...document.querySelectorAll("#myDropdown_I > ul > li")]  
    searchDrop.addEventListener("input", function(e) {
        const mainBar = document.getElementById("search_bar")
        if(mainBar.value ===""){
            searchDropMatched(liTagIngredients, e)
        }else{
            mixSearch(displayListDropI, mainBar, e)
        }
    })
}
function getSearchDropU(){
    const searchDrop = document.getElementById("search_dropU")
    const liTagUstensils = [...document.querySelectorAll("#myDropdown_U > ul > li")]
    searchDrop.addEventListener("input", function(e) {
        const mainBar = document.getElementById("search_bar")
        if(mainBar.value ===""){
            searchDropMatched(liTagUstensils, e)
        }else{
            mixSearch(displayListDropU, mainBar, e)
        }
    })
}
function getSearchDropA(){
    const searchDrop = document.getElementById("search_dropA")
    const liTagApparels = [...document.querySelectorAll("#myDropdown_A > ul > li")]
    searchDrop.addEventListener("input", function(e) {
        const mainBar = document.getElementById("search_bar")
        if(mainBar.value ===""){
            searchDropMatched(liTagApparels, e)
        }else{
            mixSearch(displayListDropA, mainBar, e)
        }
    })
}
export function listenDrop(){
    const searchDropI = document.getElementById("search_dropI")
    const searchDropU = document.getElementById("search_dropU")
    const searchDropA = document.getElementById("search_dropA")

    searchDropI.addEventListener("input", function(){
        getSearchDropI(this);
    });
    searchDropU.addEventListener("input", function(){
        getSearchDropU(this);
    });
    searchDropA.addEventListener("input", function(){
        getSearchDropA(this);
    });    
}

/* Display & close list on click*/
export function displayList(){
    const showLists = [...document.querySelectorAll(".dropbtn")]
    showLists.map(showList => showList.addEventListener("click", function(){
        showList.nextElementSibling.classList.toggle("d-block")
        const dropContent = showList.nextElementSibling
        showList.style.width = "400px"
        dropContent.style.width = "400px"
        }
    ))
}
export function closeList(){
    const closeLists = [...document.querySelectorAll(".dropdown-content > nav > i")]
    closeLists.map(closeList => closeList.addEventListener("click", function(){
        const parentCloseList = closeList.parentElement.parentElement
        parentCloseList.classList.remove("d-block")
        parentCloseList.style.width = "auto"
        const showLists = [...document.querySelectorAll(".dropbtn")]
        showLists.map(showList => showList.style.width = "initial")
    }))
}