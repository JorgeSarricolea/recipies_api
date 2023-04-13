$(document).ready(function() {

    let result = $("#result");
    let searchBtn = $(".search-btn");
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    let errorMessages = "Input Field Cannot Be Empty";

    $(".search-btn").click(function() {
        let userInp = $(".search-inp").val();
        url += userInp;
        if (userInp.length == 0) {
            $(".error").html(errorMessages);
            $(".error").show();
            setTimeout(function() {
                $(".error").hide();
            }, 3000);
        } else {
            $.get(url, function(data) {
                let myMeal = data.meals[0];
                let ingredients = [];
                let count = 1;
                console.log(myMeal);
                console.log(myMeal.strArea);
                console.log(myMeal.strCategory);
                console.log(myMeal.strMealThumb);
                console.log(myMeal.strMeal);
                console.log(myMeal.strInstructions);
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
                console.log(ingredients);

                result.html(
                    `<img src="${myMeal.strMealThumb}">
                    <div class="details">
                        <h2>${myMeal.strMeal}</h2>
                        <h3>${myMeal.strArea} - ${myMeal.strCategory}</h3>
                    </div>
                    <div class="recipie">
                        <p>${myMeal.strInstructions}</p>
                    </div>`
                    );
            });
        }

    });
});
