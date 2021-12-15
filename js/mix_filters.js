import {recipes} from "./recipes.js";
import {standardize} from "./mainSearch_bar.js";

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

/** Main search bar & Drop search bar **/
import {searchDropMatched} from "./dropdowns.js";

export function mixSearch(displayListDrop, input, e){
    const arraySearchMain = mixArray(input.value)
    const newLis = displayListDrop(arraySearchMain)
    searchDropMatched(newLis, e)
}

/** 1 Tag & Main search bar **/
import {searchMatch} from "./mainSearch_bar.js";

export function mixArray(input){
    const arrayTag = testAlreadyTag()
    return [...searchMatch(arrayTag, input)]
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
export function testAlreadyTag(){
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
    
    }if((testTagI !== 0) && (testTagA !== 0) && (testTagU !== 0)){
        const arrayRecipe = reduceMixArray(textParentTagI, tagIMatched, tagAMatched, textParentTagA)
        return tagUMatched(arrayRecipe, textParentTagU.slice(-1)[0])
    
    }if((testTagI === 0) && (testTagA === 0) && (testTagU === 0)){
        return recipes
    }
}