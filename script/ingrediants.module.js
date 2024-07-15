import { addEventListeners as addIngredientEventListeners } from "./Details.module.js";
import { hideLoading, showLoading } from "./Search.module.js";

// Store the list of ingredients
let IngredientList = [];

// Class to fetch and store ingredient data
export class Ingredient {
    constructor() {
        this.ingredients = [];
    }

    async getIngredients() {
        showLoading();
        try {
            const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
            const response = await api.json();
            this.ingredients = response.meals;
            IngredientList = response.meals; // Store the ingredients in the IngredientList
            console.log("Fetched Ingredient List:", IngredientList);
        } catch (error) {
            console.error("Error fetching ingredients:", error);
        } finally {
            hideLoading();
        }
    }
}

const playIngredient = new Ingredient();
playIngredient.getIngredients();

// Class to display ingredients
class DisplayIngredient {
    Display(IngredientList) {
        let cartoona = "";
        for (let i = 0; i < IngredientList.length; i++) {
            let Ingredients = IngredientList[i];
            let ingredient = Ingredients.strIngredient;

            cartoona += `
                <div class="col-md-3 ingredient" data-ingredient="${ingredient}">
                    <div class="rounded-2 text-center text-white pt-5">
<i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ingredient}</h3>
                    </div>
                </div>`;
        }
        document.querySelector('#Ingred .row').innerHTML = cartoona;

        // Add event listeners after rendering
        console.log("Adding ingredient listeners");
        addIngredientListeners();
    }
}

(async () => {
    const ingredientInstance = new Ingredient();
    await ingredientInstance.getIngredients();
    console.log("Ingredients after fetching:", IngredientList); // Log after the asynchronous call completes

    const displayIngredient = new DisplayIngredient();
    displayIngredient.Display(IngredientList);
})();

// Class to fetch details of meals for a specific ingredient
class IngredientDetails {
    async getDetails(ingredient) {
        showLoading();
        try {
            const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
            const response = await api.json();
            console.log("Fetched Meal Details:", response);
            return response.meals; // Return the meals array
        } catch (error) {
            console.error('Error fetching meal details:', error);
            return null; // Return null or handle error as appropriate
        } finally {
            hideLoading();
        }
    }
}

const ingredientTry = new IngredientDetails();

// Add event listeners to ingredient elements
function addIngredientListeners() {
    document.querySelectorAll(".ingredient").forEach(element => {
        element.addEventListener("click", async function() {
            let type = element.getAttribute("data-ingredient");
            console.log("Ingredient clicked:", type);
            const z = new IngredientDetails(); // Create a new instance of IngredientDetails
            const mealDetails = await z.getDetails(type);
            console.log("Meal details fetched:", mealDetails);
            displayIngredientDetails.renderMeals(mealDetails); // Render the meals for the selected ingredient
            document.getElementById("IngredList").classList.replace("d-none", "d-block");
            document.querySelector(".disappear").classList.add("d-none");
        });
    });
}

let ingred = document.getElementById("Ingred");

// Class to display meal details
class DisplayIngredientDetails {
    renderMeals(meals) {
        let cartoona = "";

        if (meals && meals.length > 0) {
            meals.forEach(meal => {
                let Id = meal.idMeal;
                let Title = meal.strMeal;
                let img = meal.strMealThumb;

                cartoona += `
                    <div class="col-md-3 details position-relative overflow-hidden" data-id="${Id}">
                        <img src="${img}" class="w-100 overflow-hidden rounded-1 pt-3" alt="">
                        <div class="layer rounded-1 pt-3">
                            <p><h1>${Title}</h1></p>
                        </div>
                    </div>`;
            });
            ingred.classList.add("d-none");
            document.querySelector('#IngredList .row').innerHTML = cartoona;
            addIngredientEventListeners(); // Add event listeners to the meal detail elements
        } else {
            console.log("No meal details found");
        }
    }
}

const displayIngredientDetails = new DisplayIngredientDetails();
