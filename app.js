let randomMeal = document.getElementById("random-meal")
let popularMeals = document.getElementById("popular-meals")
let searchButton = document.getElementById("search-button")
let searchInput = document.getElementById("search-input")

const popup = document.getElementById("popup")

fetch("https://www.themealdb.com/api/json/v1/1/random.php")
.then(function(res){
    return res.json()
})
.then(function(data){
    console.log(data)
    let randomImage = document.createElement("img")
    randomImage.setAttribute("src",data.meals[0].strMealThumb)
    randomMeal.append(randomImage)
    document.getElementById("meal-name").innerText=data.meals[0].strMeal


    let div=document.createElement("div");
    div.className="ingredients-div"
    let h3=document.createElement("h3")
    h3.innerHTML=`INGREDIENTS <i class="fa fa-close" style="font-size:60px;color:red" onclick="popup.style.display='none'"></i>`

    div.append(h3)

    for(let i=1;i<=20;i++){
        let p = document.createElement("p")
        let item=`strIngredient${i}`
        p.innerText=data.meals[0][item]
        div.append(p)
    }
    popup.append(div)

    randomImage.onclick=()=>{
        popup.style.display="inherit";
    }
})

function appendMeals(meal){
    for(let eachMeal of meal){
        let mealContainer = document.createElement("div")
        popularMeals.append(mealContainer)
        let mealImage = document.createElement("img")
        mealImage.classList.add("meal-img")
        mealImage.setAttribute("src", eachMeal.strMealThumb)
        mealContainer.append(mealImage)
        let mealName = document.createElement("p")
        mealName.classList.add("meal-name")
        mealName.innerText=eachMeal.strMeal
        mealContainer.append(mealName)
    }
}
function searchMeals(){
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c="+searchInput.value)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data)
        document.getElementById("pop-meal").style.display="block"
        appendMeals(data.meals)
    })
}


searchButton.addEventListener("click", searchMeals)

