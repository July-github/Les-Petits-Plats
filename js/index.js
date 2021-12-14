import {recipes} from "./recipes.js";

/***** Cards *****/
/* Create cards */
import {createCardsBlock, removeCardsBlock} from "./cards_creation.js";

/* Fill cards */
import {displayCards} from "./cards_creation.js";

createCardsBlock(recipes)
displayCards(recipes)

/***** Dropdowns *****/
/*Get lists for buttons*/
import {getListsI, getListsU, getListsA} from "./dropdowns.js";

/*Fill dropdowns buttons with lists*/
import {createLi} from "./dropdowns.js";

createLi(getListsI(recipes), "ingredients")
createLi(getListsA(recipes), "apparels")
createLi(getListsU(recipes), "ustensils")

/* Search bar Dropdowns */
import {listenDrop} from "./dropdowns.js";

listenDrop()

/* Display & close list on click*/
import {displayList, closeList} from "./dropdowns.js";

displayList();
closeList();

/***** Main search bar *****/
const mainBar = document.getElementById("search_bar")

/* Prog fonctionnelle */
import {displayError, validateInputSearch} from "./mainSearch_bar.js";

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

/* Listen to a change in the search bar */
mainBar.addEventListener("input", function(){
    validateInputSearch(this);
});

/***** Tag *****/  
import {displayListDropI, displayListDropU, displayListDropA} from "./tags.js";
import {displayOnClickTag} from "./tags.js";

displayOnClickTag()

/** Close tag on click **/
import {removeDisabledI, removeDisabledU, removeDisabledA} from "./tags.js";
document.addEventListener("click", function(e){
    if(e.target && e.target.className.includes("iconU") || e.target.className.includes("iconA") || e.target.className.includes("iconI")){
        if(mainBar.value===""){
            e.target.parentElement.remove()
            const arraySearchMain = testAlreadyTag()
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

/***** Mix filters *****/
import {mixArray, testAlreadyTag} from "./mix_filters.js";
