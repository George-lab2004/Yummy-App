let Details = document.getElementById("Details");
let disappear = document.querySelector(".disappear");
let disappears = document.querySelector(".disappeartwo");
let bigCat = document.getElementById("Categories")
let Cats = document.getElementById("Cats");
let AreaList = document.getElementById("AreaList")
let ingred = document.getElementById("IngredList")
let search = document.getElementById("search")
export class MealsDetails {
    async MealDetails(ID) {
        showLoading();
        try {
            const api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`);
            const response = await api.json();
            return response.meals[0];
        } catch (error) {
            console.error('Error fetching meal details:', error);
            return null;
        } finally {
            hideLoading();
        }
    }
}

function showLoading() {
    loading.classList.remove("d-none");
}

function hideLoading() {
    loading.classList.add("d-none");
}

export function addEventListeners() {
    document.querySelectorAll(".details").forEach(element => {
        element.addEventListener("click", async function() {
            let ID = element.getAttribute("data-id");
            const mealDetails = await z.MealDetails(ID);
            displays.renderMeals(mealDetails);
            Details.classList.replace("d-none", "d-block");
            disappear.classList.add("d-none");
            disappears.classList.add("d-none");
            disappears.classList.add("d-none");
            bigCat.classList.add("d-none")
            Cats.classList.add("d-none")
            AreaList.classList.add("d-none")
            ingred.classList.add("d-none")
            search.classList.add("d-none")
        });
    });
}

const z = new MealsDetails();



 class DisplayDetails {
    constructor() {
    }

    renderMeals(meal) {
        let cartoona = "";

        if (meal) {
            let Desc = meal.strInstructions;
            let Title = meal.strMeal;
            let Area = meal.strArea;
            let Category = meal.strCategory;
            let img = meal.strMealThumb;
            let tags = meal.strTags;
            cartoona +=
            `<div class="container-fluid position-relative text-white bg-black">
            <div class="row">
                <div class="col-md-4">
                    <img src="${img}" class="pt-3 ps-3 w-100 ms-3" >
                    <h2>${Title}</h2>
                </div>
                <div class="col-md-8">
                    <div class="content d-block">
                        <h2>Instructions</h2>
                        <p class="pe-5">${Desc} </p>
                        <h1 class="fs-2 fw-bold">Area :<span >${Area}</span></h1> 
                    </div>
                    <h1 class="fs-3 fw-bold">Category :<span >${Category}</span></h1> 
                    <span class="fs-3 fw-bold">Recipes:</span>
                    <div id="Recipe" class="d-flex pt-2 pb-3 text-black justify-content-start align-items-center w-75 flex-wrap"></div>
                    <span class="fs-3 fw-bold">Tags:</span>
                    <div id="Tags" class="container">
                        <div class="d-flex ps-3 pt-2 pb-3 text-black justify-content-start align-items-center w-75 flex-wrap">
                            <span class="border border-2 p-1 ms-2 mt-2">${tags}</span>
                        </div>
                    </div>
                    <a href="${meal.strYoutube}" class="text-decoration-none">
                        <button class="btn-outline-success bg-danger text-white">Watch Recipe</button>
                    </a>
                    <a href="${meal.strYoutube}" class="text-decoration-none">
                        <button class="btn-outline-success bg-success text-white">Source</button>
                    </a>
                </div>
            </div>
        </div>`;

            document.getElementById('Details').innerHTML = cartoona;
            let ingredients = [
                meal.strIngredient1, meal.strIngredient2, meal.strIngredient3,
                meal.strIngredient4, meal.strIngredient5, meal.strIngredient6,
                meal.strIngredient7, meal.strIngredient8, meal.strIngredient9,
                meal.strIngredient10, meal.strIngredient11, meal.strIngredient12,
                meal.strIngredient13, meal.strIngredient14, meal.strIngredient15,
                meal.strIngredient16, meal.strIngredient17, meal.strIngredient18,
                meal.strIngredient19, meal.strIngredient20
            ];

            // Loop through the ingredients and create spans
            ingredients.forEach(ingred => {
                if (ingred) {
                    let span = document.createElement('span');
                    span.className = 'border rounded-1 border-2 p-1 ms-2 mt-4';
                    span.textContent = `${ingred}`;
                    document.getElementById('Recipe').appendChild(span);
                }
            });
           
        } else {
            console.log(`No meal details found`);
        }
    }
}

let displays = new DisplayDetails();
