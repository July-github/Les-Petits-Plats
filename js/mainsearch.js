import "./index.js";

/* main search bar */
const mainBar = document.getElementsByClassName("form-control")
//mainBar.addEventListener("input", displayRecipes())
function displayRecipes (){

}

//Regex 3 characters creation
const regexInputSearch = /^[a-zA-ZÀ-ÿ]{3,}/g;
const validInputSearch = regexInputSearch.test(mainBar.value);

console.log(validInputSearch)
