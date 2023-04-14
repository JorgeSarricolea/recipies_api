$(document).ready(function() {

    let result = $("#result");
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    let emptyInput = "Input field cannot be empty";
    let notFound = "Not recipie found:("

    /* Search Button
    ---------------------*/

    $(".search-btn").click(function() {
        let userInp = $(".search-inp").val();

        /* Error Message
        ---------------------*/

        if (userInp.length == 0) {
            $(".empty-input").html(emptyInput);
            $(".empty-input").show();
            setTimeout(function() {
                $(".empty-input").hide();
            }, 3000);
        } else {

            /* API Fetch GET
            ---------------------*/

            $.get(url + userInp, function(data) {

                if (data.meals != null) {
                    $("#result").show();
                    let myMeal = data.meals[0];
                    let ingredients = [];
                    let count = 1;

                    /*
                    console.log(myMeal);
                    console.log(myMeal.strArea);
                    console.log(myMeal.strCategory);
                    console.log(myMeal.strMealThumb);
                    console.log(myMeal.strMeal);
                    console.log(myMeal.strInstructions);
                    */

                    for (let i in myMeal) {
                        let ingredient = "";
                        let measure = "";
                        if(i.startsWith("strIngredient") && myMeal[i]) {
                            ingredient = myMeal[i];
                            measure = myMeal[`strMeasure`+count]
                            count += 1;
                            ingredients.push(`${measure} ${ingredient}`);
                        }
                    }

                    /* console.log(ingredients); */

                    /* User Meal Data
                    ---------------------*/

                    result.html(
                        `<div class="result">
                            <h2>${myMeal.strMeal}</h2>
                            <h3>${myMeal.strArea} - ${myMeal.strCategory}</h3>
                            <img src="${myMeal.strMealThumb}">
                            <p>Ingredients</p>
                            <div class="ingredients"></div>
                            <div class="recipie">
                                <p>Instructions</p>
                                <pre id="instructions">${myMeal.strInstructions}</pre>
                            </div>
                        </div>`
                    );

                    /* Ingredients List
                    ---------------------*/

                    let ingredientList = $(".ingredients");
                    let parent = $("<ul></ul>");

                    ingredients.forEach((i) => {
                        let child = $("<li></li>").text(i);
                        parent.append(child);
                        ingredientList.append(parent);
                    });

                } else {

                /* API Invalid Input
                ---------------------*/

                    $("#result").hide();
                    $(".invalid-input").html(notFound);
                    $(".invalid-input").show();
                    setTimeout(function() {
                            $(".invalid-input").hide();
                    }, 3000);
                }
            });
        }
    });
});
