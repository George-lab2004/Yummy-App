import { addEventListeners } from "./Details.module.js";
import { hideLoading, showLoading } from "./Search.module.js";

// Store the list of areas
let AreaList = [];

// Class to fetch and store area data
export class Area {
    constructor() {
        this.meals = [];
    }

    async getArea() {
        showLoading();
        try {
            const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
            const response = await api.json();
            this.meals = response.meals;
            AreaList = response.meals; // Store the meals in the mealsList
            console.log(AreaList);
        } catch (error) {
            console.error("Error fetching meals:", error);
        } finally {
            hideLoading();
        }
    }
}

const play = new Area();
play.getArea();

// Class to display areas
class DisplayArea {
    Display(AreaList) {
        let cartoona = "";
        for (let i = 0; i < AreaList.length; i++) {
            let Areas = AreaList[i];
            let are = Areas.strArea;

            cartoona += `
                <div class="col-md-3 area" data-area="${are}">
                    <div class="rounded-2 text-center text-white pt-5">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${are}</h3>
                    </div>
                </div>`;
        }
        document.querySelector('#Area .row').innerHTML = cartoona;

        // Add event listeners after rendering
        addEventListenerst();
    }
}

(async () => {
    const homeInstance = new Area();
    await homeInstance.getArea();
    console.log("Areas after fetching:", AreaList); // Log after the asynchronous call completes

    const dis = new DisplayArea();
    dis.Display(AreaList);
})();

// Class to fetch details of meals for a specific area
class AreaDetails {
    async AreaDetails(are) {
        showLoading();
        try {
            const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${are}`);
            const response = await api.json();
            console.log(response);
            return response.meals; // Return the meals array
        } catch (error) {
            console.error('Error fetching meal details:', error);
            return null; // Return null or handle error as appropriate
        } finally {
            hideLoading();
        }
    }
}

const trys = new AreaDetails();

// Add event listeners to area elements
function addEventListenerst() {
    document.querySelectorAll(".area").forEach(element => {
        element.addEventListener("click", async function() {
            let type = element.getAttribute("data-area");
            console.log(type);
            const z = new AreaDetails(); // Create a new instance of AreaDetails
            const mealDetails = await z.AreaDetails(type);
            display.renderMeals(mealDetails); // Render the meals for the selected area
            document.getElementById("AreaList").classList.replace("d-none", "d-block");
            document.querySelector(".disappear").classList.add("d-none");
        });
    });
}
let ar = document.getElementById("Area")
// Class to display meal details
class DisplayDetails {
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
            ar.classList.add("d-none")
            document.querySelector('#AreaList .row').innerHTML = cartoona;
            addEventListeners(); // Add event listeners to the meal detail elements
            
        } else {
            console.log("No meal details found");
        }
    }
}

const display = new DisplayDetails();
