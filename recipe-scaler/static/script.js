// Array to store ingredients
let ingredients = [];

// Function to add an ingredient to the list
function addIngredient() {
  const name = document.getElementById('ingredientName').value;
  const amount = parseFloat(document.getElementById('ingredientAmount').value);
  const unit = document.getElementById('ingredientUnit').value;

  if (name && amount && unit) {
    ingredients.push({ name, amount, unit });

    // Clear input fields
    document.getElementById('ingredientName').value = '';
    document.getElementById('ingredientAmount').value = '';
    document.getElementById('ingredientUnit').value = '';

    // Optionally, show the added ingredient in the UI (for user feedback)
    alert(`Added ${amount} ${unit} of ${name}`);
  } else {
    alert("Please fill in all ingredient fields.");
  }
}

// Function to scale the recipe
async function scaleRecipe() {
  const originalServings = parseFloat(document.getElementById('originalServings').value);
  const desiredServings = parseFloat(document.getElementById('desiredServings').value);

  if (!originalServings || !desiredServings || ingredients.length === 0) {
    alert("Please fill in servings and add at least one ingredient.");
    return;
  }

  try {
    const response = await fetch('/scale_recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients, original_servings: originalServings, desired_servings: desiredServings })
    });

    const scaledIngredients = await response.json();

    // Display the scaled ingredients in the UI
    const scaledRecipeList = document.getElementById('scaledRecipe');
    scaledRecipeList.innerHTML = '';
    scaledIngredients.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.amount} ${item.unit} of ${item.name}`;
      scaledRecipeList.appendChild(listItem);
    });

  } catch (error) {
    console.error("Error scaling recipe:", error);
    alert("An error occurred while scaling the recipe.");
  }
}


// Get the elements
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');

// Toggle the 'active' class on the navigation links when the hamburger icon is clicked
menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

const carouselImages = document.querySelector('.carousel-images');
let scrollPosition = 0;
const scrollAmount = 200;

function scrollRight() {
  if (scrollPosition < carouselImages.scrollWidth - carouselImages.clientWidth) {
    scrollPosition += scrollAmount;
    carouselImages.style.transform = `translateX(-${scrollPosition}px)`;
  }
}

function scrollLeft() {
  if (scrollPosition > 0) {
    scrollPosition -= scrollAmount;
    carouselImages.style.transform = `translateX(-${scrollPosition}px)`;
  }
}

// Optional: Add arrows or navigation if needed for additional control

