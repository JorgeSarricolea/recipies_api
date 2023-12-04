document.addEventListener("DOMContentLoaded", function () {
  let result = document.getElementById("result");
  let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  let emptyInput = "Input field cannot be empty";
  let notFound = "Recipe not found:(";

  // Search Button
  document.querySelector(".search-btn").addEventListener("click", searchMeal);

  document
    .querySelector(".search-inp")
    .addEventListener("keypress", function (e) {
      if (e.which === 13) {
        // 13 is the key code for Enter
        searchMeal();
      }
    });

  function searchMeal() {
    let userInp = document.querySelector(".search-inp").value;

    // Error Message
    if (userInp.length == 0) {
      document.querySelector(".empty-input").innerHTML = emptyInput;
      document.querySelector(".empty-input").style.display = "block";
      setTimeout(function () {
        document.querySelector(".empty-input").style.display = "none";
      }, 3000);
    } else {
      //API Fetch GET
      fetch(url + userInp)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.meals != null) {
            result.style.display = "block";
            let myMeal = data.meals[0];
            let ingredients = [];
            let count = 1;

            for (let i in myMeal) {
              let ingredient = "";
              let measure = "";
              if (i.startsWith("strIngredient") && myMeal[i]) {
                ingredient = myMeal[i];
                measure = myMeal["strMeasure" + count];
                count += 1;
                ingredients.push(measure + " " + ingredient);
              }
            }

            // User Meal Data
            result.innerHTML =
              '<div class="result">' +
              "<h2>" +
              myMeal.strMeal +
              "</h2>" +
              "<h3>" +
              myMeal.strArea +
              " - " +
              myMeal.strCategory +
              "</h3>" +
              '<img src="' +
              myMeal.strMealThumb +
              '">' +
              "<p>Ingredients</p>" +
              '<div class="ingredients"></div>' +
              '<div class="recipie">' +
              "<p>Instructions</p>" +
              '<pre id="instructions">' +
              myMeal.strInstructions +
              "</pre>" +
              "</div>" +
              "</div>";

            // Ingredients List
            let ingredientList = document.querySelector(".ingredients");
            let parent = document.createElement("ul");

            ingredients.forEach(function (i) {
              let child = document.createElement("li");
              child.textContent = i;
              parent.appendChild(child);
              ingredientList.appendChild(parent);
            });
          } else {
            //API Invalid Input
            result.style.display = "none";
            document.querySelector(".invalid-input").innerHTML = notFound;
            document.querySelector(".invalid-input").style.display = "block";
            setTimeout(function () {
              document.querySelector(".invalid-input").style.display = "none";
            }, 3000);
          }
        })
        .catch(function (error) {
          console.error("Error fetching data:", error);
        });
    }
  }
});
