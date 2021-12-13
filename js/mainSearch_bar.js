/***** Main search bar *****/
/* Array match test */
// switch the string to lowercase & without any accent to compare
export function standardize(item){
    return item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

/* Boucles natives */
export function searchMatch(arrayRecipes, input){
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
import {displayListDropI, displayListDropU, displayListDropA} from "./tags.js";
import {createCardsBlock, displayCards, removeCardsBlock} from "./cards_creation.js";

export function displayMatched(arraySearchMain){
    displayError(arraySearchMain)
    removeCardsBlock()
    createCardsBlock(arraySearchMain)
    displayCards(arraySearchMain)
    displayListDropI(arraySearchMain)
    displayListDropU(arraySearchMain)
    displayListDropA(arraySearchMain)
}

import {mixArray} from "./mix_filters.js";

export function validateInputSearch(){
    const mainBar = document.getElementById("search_bar")
    //Regex 3 characters creation
    const regexInputSearch = /[a-zA-ZÀ-ÿ]{3,}/g;
    const validInputSearch = regexInputSearch.test(mainBar.value);

    if(validInputSearch === true){
        const arraySearchMain = mixArray(mainBar.value)
        displayMatched(arraySearchMain)    
    }
}