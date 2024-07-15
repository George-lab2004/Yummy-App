
import { addEventListeners } from "./Details.module.js";
import { Home, mealsList, showLoading } from "./Search.module.js";
let details = document.getElementById('Details')
showLoading()
document.addEventListener("DOMContentLoaded", async () => {
    const response = new Home();
    await response.getMeals(); // Ensure getMeals completes before proceeding

    console.log(mealsList); 
    new Navigation();

});



$(document).ready(function() {
    $('a[href^="#"]').click(function(event) {
      event.preventDefault();
      let targetId = $(this).attr('href');
      let sections = ['#IngredList', '#AreaList', '#Cats', "#search"];
      
      // Hide any active section
      sections.forEach(section => {
        if ($(section).hasClass('exist') && !$(section).hasClass('d-none')) {
          $(section).addClass('d-none');
        }
      });
  
      // Show the clicked section
      if ($(targetId).length) {
        $(targetId).removeClass('d-none');
      }
    });
  });
  


    class Navigation {
        constructor() {
            this.openIcon = document.querySelector(".openIcon");
            this.open = document.querySelector(".open");
            this.links = document.querySelectorAll(".list-unstyled a");
            this.sections = document.querySelectorAll(".section");
            this.isOpen = false;
    
            this.init();
        }
    
        init() {
            this.setupNavLinks();
            this.setupToggle();
        }
    
        setupNavLinks() {
        let navbar = document.querySelector(".list-unstyled");
        let children = navbar.children;
        let links = navbar.querySelectorAll("a");
        for (let i = 0; i < children.length; i++) {
                    let child = children[i];
                    child.addEventListener("click", function () {
                        for (let j = 0; j < children.length; j++) {
                            children[j].classList.remove("active");
                        }
                        this.classList.add("active");
                    });
                }
            for (let i = 0; i < links.length; i++) {
                let link = links[i];
                link.addEventListener("click", function () {
        
                    // Remove 'active' class from all sections and add 'd-none' to hide them
        
                    let sections = document.querySelectorAll(".exist");
        
                    // Get the href attribute, clean it, and show the corresponding section
                    let href = this.getAttribute("href");
                    let cleanHref = href.replace("#", ""); // Remove the '#' character
                    let section = document.getElementById(cleanHref);
                    for (let j = 0; j < sections.length; j++) {
                        sections[j].classList.add("d-none");
                        sections[j].classList.remove("exist");
                        
                    }
                    if (section) {
                        section.classList.remove("d-none");
                        section.classList.add("exist")
                        details.classList.add("d-none")
                    }
        
                    console.log("The cleaned href attribute of the clicked link is:", cleanHref);
                });
            }
        }
    
        setupToggle() {
            this.openIcon.addEventListener("click", () => {
                if (this.isOpen) {
                    this.closeMenu();
                } else {
                    this.openMenu();
                }
            });
        }
    
        openMenu() {
            this.open.style.left = "0";
            document.querySelectorAll("li").forEach(li => li.classList.add("slide-top"));
            this.openIcon.querySelector(".fas").classList.replace("fa-bars", "fa-times-circle");
            this.isOpen = true;
        }
    
        closeMenu() {
            this.open.style.left = "-270px";
            document.querySelectorAll("li").forEach(li => li.classList.remove("slide-top"));
            this.openIcon.querySelector(".fas").classList.replace("fa-times-circle", "fa-bars");
            this.isOpen = false;
        }
    }
    class DisplayHome {
        constructor() {
            this.meals = [];
        }
    
        Display(mealsList) {
            let cartoona = ""
            for (let i = 0; i < mealsList.length; i++) {
                let meal = mealsList[i];
                console.log(meal);
    
                let id = meal.idMeal;
                let title = meal.strMeal
                let img = meal.strMealThumb
                cartoona += `
                      <div class="col-md-3 details position-relative overflow-hidden" data-id="${id}" >
        
        <img src="${img}" class="w-100 overflow-hidden rounded-1 pt-3" alt="">
        <div class="layer rounded-1 pt-3">
          <p> 
<h1>${title}</h1>
          </p>
        </div>
      </div>
                `

            }
            document.querySelector('#home .row').innerHTML = cartoona
            addEventListeners()

        }
    }
    
    (async () => {
        const homeInstance = new Home();
        await homeInstance.getMeals();
        console.log(mealsList); // Log after the asynchronous call completes
    
        const dis = new DisplayHome();
        dis.Display(mealsList);
    })();






    


