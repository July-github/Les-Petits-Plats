import {recipes} from "./recipes.js";

/***** Cards *****/
/* Create cards */
import {createCardsBlock} from "./cards_creation.js";

/* Fill cards */
import {displayCards} from "./cards_creation.js";

createCardsBlock(recipes)
displayCards(recipes)

/***** Dropdowns *****/
import {createLi, getListsI, getListsU, getListsA} from "./dropdowns.js";

createLi(getListsI(recipes), "ingredients")
createLi(getListsU(recipes), "apparels")
createLi(getListsA(recipes), "ustensils")

/* Search bar Dropdowns */
import {getSearchDropI,  getSearchDropU, getSearchDropA} from "./dropdowns.js";

getSearchDropI()
getSearchDropU()
getSearchDropA()

/* Display & close list on click*/
import {displayList, closeList} from "./dropdowns.js";

displayList();
closeList()

/***** Main search bar *****/
const mainBar = document.getElementById("search_bar")

import {validateInputSearch, displayMatched} from "./mainSearch_bar.js";

/* Listen to a change in the search bar */
mainBar.addEventListener("input", function(){
    validateInputSearch(this);
});

/***** Tag *****/  
/** Tags creation **/
import {displayOnClickTag} from "./tags.js";

displayOnClickTag()

/** Close tag on click **/
import {removeDisabledI, removeDisabledU, removeDisabledA} from "./tags.js";

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

/***** Mix filters *****/
import {mixArray, testAlreadyTag} from "./mix_filters.js";