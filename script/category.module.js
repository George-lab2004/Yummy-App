import { addEventListeners } from "./Details.module.js";

let Categories = [];
let loading = document.getElementById("loading");
let bigCat = document.getElementById("Categories")
let Details = document.getElementById("Details");

export class Cat {
    constructor() {
        this.cat = [];
    }

    async getcats() {
        showLoading(); // Show loading indicator when fetching data
        console.log("Fetching categories..."); // Log start of fetch
        try {
            const api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
            const response = await api.json();
            console.log("API Response:", response); // Log API response

            if (response.categories) {
                this.cat = response.categories; // Store categories data in this.cat
                Categories = response.categories; // Update global Categories array
                console.log("Categories:", this.cat); // Log the categories
            } else {
                console.error("No categories found in response.");
            }
        } catch (error) {
            console.error("Error fetching meals:", error);
        } finally {
            hideLoading(); // Hide loading indicator after fetching data
        }
    }
}

// Show loading indicator
function showLoading() {
    loading.classList.remove("d-none");
    console.log("Loading shown"); // Log loading shown
}

// Hide loading indicator
function hideLoading() {
    loading.classList.add("d-none");
    console.log("Loading hidden"); // Log loading hidden
}

// Instantiate and call the getcats method to fetch data
document.addEventListener("DOMContentLoaded", () => {
    const x = new Cat();
    x.getcats();
});

class DisplayCat {
    constructor() {
        this.cat = [];
    }

    Display(categories) {
        let cartoona = "";
        for (let i = 0; i < categories.length; i++) {
            let cat = categories[i];
            console.log(cat);

            let id = cat.idCategory;
            let title = cat.strCategory;
            let img = cat.strCategoryThumb;

            cartoona += `
                <div class="col-md-3 type position-relative overflow-hidden" data-type="${title}">
                    <img src="${img}" class="w-100 overflow-hidden rounded-1 pt-3" alt="">
                    <div class="layer rounded-1 pt-3">
                        <h1 class="title">${title}</h1>
                    </div>
                </div>
            `;
        }
        document.querySelector('#Categories .row').innerHTML = cartoona;

        // Add event listeners after rendering
        addEventListenerst();
    }
}

(async () => {
    const homeInstance = new Cat();
    await homeInstance.getcats();
    console.log("Categories after fetching:", Categories); // Log after the asynchronous call completes

    const dis = new DisplayCat();
    dis.Display(Categories);
})();

let Cats = document.getElementById("Cats");
let disappears = document.querySelector(".disappeartwo");

class CatsDetails {
    async CatDetails(type) {
        showLoading();
        try {
            const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${type}`);
            const response = await api.json();
            console.log(response);
            return response.meals; // Access the first meal object in the meals array
        } catch (error) {
            console.error('Error fetching meal details:', error);
            return null; // Return null or handle error as appropriate
        } finally {
            hideLoading();
        }
    }
}




// function addEventListeners() {
//     document.querySelectorAll(".details").forEach(element => {
//         element.addEventListener("click", async function() {
//             let ID = element.getAttribute("data-id");
//             const mealDetails = await z.MealDetails(ID);
//             displays.renderMeals(mealDetails);
//             Details.classList.replace("d-none", "d-block");
//             disappear.classList.add("d-none");
//             disappears.classList.add("d-none")
//         });
//     });
// }






 function addEventListenerst() {
    document.querySelectorAll(".type").forEach(element => {
        element.addEventListener("click", async function() {
            let type = element.getAttribute("data-type");
            console.log(type);
            const z = new CatsDetails(); // Create a new instance of CatsDetails
            const mealDetails = await z.CatDetails(type);
            displays.renderCats(mealDetails);

            Cats.classList.replace("d-none", "d-block");
            disappears.classList.add("d-none");

            
        });
    });
}
function remove() {
    bigCat.classList.add("d-none")
    Cats.classList.add("d-none")
    
}
class DisplayDetails {
    constructor() {}

    renderCats(meals) {
        let cartoona = "";

        if (meals && meals.length > 0) {
            meals.forEach(meal => {
                let Id = meal.idMeal;
                let Title = meal.strMeal;
                let img = meal.strMealThumb;
       
                cartoona += `                    
                  <div class="col-md-3 details position-relative overflow-hidden" data-id="${Id}" >
        
        <img src="${img}" class="w-100 overflow-hidden rounded-1 pt-3" alt="">
        <div class="layer rounded-1 pt-3">
          <p> 
<h1>${Title}</h1>
          </p>
        </div>
      </div>`;
            });
            document.querySelector('#Cats .row').innerHTML = cartoona;
            addEventListenerst()
            addEventListeners()
        } else {
            console.log("No meal details found");
        }
    }
}

let displays = new DisplayDetails();
