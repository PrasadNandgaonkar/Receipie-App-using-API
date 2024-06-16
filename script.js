document.getElementById("search-button").addEventListener("click", function() {
    var searchTerm = document.getElementById("search").value;
    var resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
        if (data.meals) {
            data.meals.forEach(meal => {
                var mealCard = document.createElement("div");
                mealCard.classList.add("meal-card");
                mealCard.innerHTML = `
                    <h2>${meal.strMeal}</h2>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <button class="instruction-button" data-instructions="${meal.strInstructions}">Read Instructions</button>
                `;
                resultsContainer.appendChild(mealCard);
            });
        } else {
            resultsContainer.innerHTML = "No meals found.";
        }
    })
    .catch(error => console.error('Error fetching data:', error));
});

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("instruction-button")) {
        var instructions = event.target.getAttribute("data-instructions");
        showPopup(instructions);
    }

    if (event.target.classList.contains("close-popup")) {
        hidePopup();
    }
});

function showPopup(instructions) {
    var popup = document.getElementById("popup");
    var popupContent = document.getElementById("popup-content");
    var popupInstructions = document.getElementById("popup-instructions");

    popupInstructions.textContent = instructions;
    popup.style.display = "block";
}

function hidePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}
document.getElementById("popup").addEventListener("click", function(event) {
    if (event.target.classList.contains("popup-close")) {
        hidePopup();
    }
});
