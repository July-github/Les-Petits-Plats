/***** Main search bar *****/
/* Array match test */
// switch the string to lowercase & without any accent to compare
export function standardize(item){
    return item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

/* Prog fonctionnelle */
export function searchMatched(arrayRecipes, input){
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
export function displayError(arraySearchMain){
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
import{recipes} from "./recipes.js";

export function validateInputSearch(){
    const mainBar = document.getElementById("search_bar")
    //Regex 3 characters creation
    const regexInputSearch = /[a-zA-ZÀ-ÿ]{3,}/g;
    const validInputSearch = regexInputSearch.test(mainBar.value);

    if(validInputSearch === true){
        const arraySearchMain = mixArray(mainBar.value)
        displayMatched(arraySearchMain)
    }else{
        displayMatched(recipes)
    }
}