document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.querySelector(".searchIcon");
  const inputControl = document.querySelector(".input-control");
  const menuIcon = document.querySelector(".logoMenu");
  const navBar = document.querySelector(".navbar");

  // Toggle Menu on click
  menuIcon.addEventListener("click", function () {
    navBar.classList.toggle("isOpen");
  });

  searchIcon.addEventListener("click", function () {
    inputControl.classList.toggle("active");
  });

  // Get Categories Recipe
  function getSingleCategory(categoryMeal) {
    const singleCategory = document.querySelectorAll(".category-recipe");
    fetch(categoryMeal)
      .then((data) => data.json())
      .then((data) => {
        data.categories.forEach((categoryEl) => {
          const singleElCategory = document.createElement("div");
          singleElCategory.innerHTML = `
        <div class="category-recipe">
            <img src=${categoryEl.strCategoryThumb} alt="">
            <h4>${categoryEl.strCategory}</h4>
          </div>
        `;
          const singleEl = document.querySelector(".categories-recipe");
          singleEl.appendChild(singleElCategory);
        });
      });
  }
  getSingleCategory("https://www.themealdb.com/api/json/v1/1/categories.php");

  // Get randon Meal - data.meals
  const randomMeals = document.querySelector(".random-recipe");

  console.log(randomMeals)
  function getRandomMeal(getRandom) {
    fetch(getRandom)
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        const singleRandom = document.createElement("div");
        singleRandom.innerHTML = `
        <div class="random-meal">
          <img
            src=${data.meals[0].strMealThumb}
            alt=""
          />
          <h3>${data.meals[0].strMeal}</h3>
        </div>
      `;
        randomMeals.appendChild(singleRandom);
      });
  }
  getRandomMeal("https://www.themealdb.com/api/json/v1/1/random.php");

  // get Menu From Area
  function getAreaByMenu(menuArea) {
    // console.log(menuItems) 6
    fetch(menuArea)
      .then((data) => data.json())
      .then((data) => {
        data.meals.forEach((mealArea) => {
          // mealArea.strArea
          const elMenu = document.createElement("p");
          elMenu.innerHTML = `
        <a href="">${mealArea.strArea}</a>
        `;
          navBar.appendChild(elMenu);
        });
      });
  }
  getAreaByMenu("https://www.themealdb.com/api/json/v1/1/list.php?a=list");



  
  //  get meal form Searc by Name on submit
  const form = document.getElementById("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = document.querySelector(".input").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
      .then((data) => data.json())
      .then((data) => {
        randomMeals.innerHTML = `
      <div class="random-meal">
          <img
            src=${data.meals[0].strMealThumb}
            alt=""
          />
          <h3>${data.meals[0].strMeal}</h3>
        </div>
      `;
      });
  });

  // singleRandom
});
