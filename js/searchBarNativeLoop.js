/* main search bar */
const mainBar = document.getElementById("search_bar")

/* Array match test */
let arraySearchMain = []
    // switch the string to lowercase & without any accent to compare
function searchMatch(){
    for(let i=0;i<recipes.length;i++){
        let lowerName = recipes[i].name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        let lowerDescription = recipes[i].description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

        if(lowerName.includes(mainBar.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())){
            arraySearchMain.push(recipes[i])
        }
        if(lowerDescription.includes(mainBar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))){
            arraySearchMain.push(recipes[i])
        }
        for(let j=0;j<recipes[i].ingredients.length;j++){
            let lowerIngredient = recipes[i].ingredients[j].ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            
            if(lowerIngredient.includes(mainBar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))){
                arraySearchMain.push(recipes[i])
            }
        }
    }
}

/* Display matched cards */
const cardName = document.getElementsByClassName("recipe")

function displayCards(){
    for(let i=0;i<recipes.length;i++){
        cardName[i].closest(".card").classList.add("d-none");
        for(let j=0;j<arraySearchMain.length;j++){
            if(cardName[i].innerHTML === arraySearchMain[j].name){
                cardName[i].closest(".card").classList.remove("d-none");
            }
        }
    }
}


function validateInputSearch(){
//Regex 3 characters creation
const regexInputSearch = /[a-zA-ZÀ-ÿ]{3,}/g;
//const stringInputSearch = mainBar.textContent.toString()
const validInputSearch = regexInputSearch.test(mainBar.value);
    if(mainBar.value === ""){
        for(let i=0;i<recipes.length;i++){
            cardName[i].closest(".card").classList.remove("d-none");
        }
        return false;
    }
    if(validInputSearch === false){
        for(let i=0;i<recipes.length;i++){
            cardName[i].closest(".card").classList.remove("d-none");
        }
        console.log("false")
        return false;
    }else{
        searchMatch();
        displayCards();    
    }
}

/* Display matched ingredients */
let matchArrayIngredients = []
function displayIngredients(){
    for(let i=0;i<uniqueListIngredients.length;i++){
        for(let j=0;j<arraySearchMain.length;j++){
            for(let m=0;m<arraySearchMain[j].ingredients.length;m++){
                if(uniqueListIngredients[i].includes(mainBar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))){
                    console.log(uniqueListIngredients[i])
                    matchArrayIngredients.push(uniqueListIngredients[i]);
                    console.log([...new Set(matchArrayIngredients)])
                }
            }
        }
    } 
    fillList([...new Set(matchArrayIngredients)],0);
}

/* Display matched Ustensils */
/* Display matched Apparels */


/* Listen to a change in the search bar */
mainBar.addEventListener("input", function(){
    arraySearchMain = [];
    validateInputSearch(this);
    fillList([],0);
    displayIngredients();
});