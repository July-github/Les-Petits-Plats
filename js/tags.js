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
export function createTag(e, tagType){
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
import {standardize} from "./mainSearch_bar.js";

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
export function displayListDropI(arraySearchMain){
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
export function displayListDropU(arraySearchMain){
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
export function displayListDropA(arraySearchMain){
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

import {displayMatched} from "./mainSearch_bar.js";
import {testAlreadyTag, mixArray} from "./mix_filters.js";

function displayTag(){
    const mainBar = document.getElementById("search_bar")
    if(mainBar.value===""){
        const arraySearchMain = testAlreadyTag()
        displayMatched(arraySearchMain)
    }else{
        const arraySearchMain = mixArray(mainBar.value)
        displayMatched(arraySearchMain)
    }
}
export function displayOnClickTag(){
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

/** Close tag on click **/
export function removeDisabledI(e){
    const liTagIngredients = [...document.querySelectorAll("#myDropdown_I > ul > li")]
    liTagIngredients.map(liTagIngredient =>{
        if(e.target.parentElement.innerText === liTagIngredient.innerText){
            console.log(liTagIngredient.innerText)
            liTagIngredient.classList.remove("disabled")
        }
    })
}
export function removeDisabledU(e){
    const liTagUstensils = [...document.querySelectorAll("#myDropdown_U > ul > li")]
    liTagUstensils.map(liTagUstensil =>{
        if(e.target.parentElement.innerText === liTagUstensil.innerText){
            console.log(liTagUstensil.innerText)
            liTagUstensil.classList.remove("disabled")
        }
    })
}
export function removeDisabledA(e){
    const liTagApparels = [...document.querySelectorAll("#myDropdown_A > ul > li")]
    liTagApparels.map(liTagApparel =>{
        if(e.target.parentElement.innerText === liTagApparel.innerText){
            console.log(liTagApparel.innerText)
            liTagApparel.classList.remove("disabled")
        }
    })
}