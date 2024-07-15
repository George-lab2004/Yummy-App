import { addEventListeners } from "./Details.module.js";

let mealsList = [];
let loading = document.getElementById("loading");
export class Home {
    constructor() {
        this.meals = [];
    }

    async getMeals() {
        try {
            const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
            const response = await api.json();
            this.meals = response.meals || []; // Ensure meals array is initialized
            mealsList = response.meals || []; // Store the meals in the mealsList
        } catch (error) {
            console.error("Error fetching meals:", error);
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

export { mealsList, showLoading, hideLoading };

let Namelist = []; // Initialize an array to store names

export class Search {
    constructor() {
        this.meals = [];
    }

    async getNames(Name) {
        try {
            const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Name}`);
            const response = await api.json();
            this.meals = response.meals || []; // Ensure meals array is initialized
            Namelist = response.meals || []; // Store the meals in the Namelist array
            console.log(Namelist);
            return Namelist;
        } catch (error) {
            console.error("Error fetching meals:", error);
        } finally {
            hideLoading();
        }
    }
}

const se = new Search();

// Assuming 'Names' is the ID of the input element for search by name
const Names = document.getElementById('nme');

// Add an event listener to 'Names' input for real-time searching
Names.addEventListener("input", async function () {
    let value = Names.value;
    const Namelist = await se.getNames(value);
    Display.displayNames(Namelist);
});

let Letterlist = []; // Initialize an array to store names

export class Searchletter {
    constructor() {
        this.meals = [];
    }

    async getletter(char) {
        try {
            const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`);
            const response = await api.json();
            this.meals = response.meals || []; // Ensure meals array is initialized
            Letterlist = response.meals || []; // Store the meals in the Letterlist array
            console.log(Letterlist);
        } catch (error) {
            console.error("Error fetching meals:", error);
        } finally {
            hideLoading();
        }
    }
}

const le = new Searchletter();

// Assuming 'letter' is the ID of the input element for search by letter
const letter = document.getElementById('letter');

// Add an event listener to 'letter' input for real-time searching
letter.addEventListener("input", async function () {
    let value = letter.value;
    await le.getletter(value);
    Display.displayNames(Letterlist); // Display names from Letterlist
});

class DisplayName {
    constructor() {}

    displayNames(Namelist) {
        try {
            let cartoona = "";
            Namelist.forEach(meal => {
                let id = meal.idMeal;
                let title = meal.strMeal;
                let img = meal.strMealThumb;
                cartoona += `
                    <div class="col-md-3 details position-relative overflow-hidden" data-id="${id}">
                        <img src="${img}" class="w-100 overflow-hidden rounded-1 pt-3" alt="">
                        <div class="layer rounded-1 pt-3">
                            <h1>${title}</h1>
                        </div>
                    </div>
                `;
            });
            document.querySelector('#search .row').innerHTML = cartoona;
            addEventListeners()

        } catch (error) {
            console.error("Error displaying names:", error);
        }
    }
}

const Display = new DisplayName();

document.addEventListener("DOMContentLoaded", async () => {
    await se.getNames('initial value'); // Fetch initial data
});
