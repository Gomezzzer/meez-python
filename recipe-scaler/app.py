from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Route to serve the HTML page
@app.route('/')
def home():
    return render_template('index.html')  # Renders the HTML page from the templates folder


# Existing route to scale the recipe
@app.route('/scale_recipe', methods=['POST'])
def scale_recipe():
    data = request.json
    ingredients = data.get('ingredients', [])
    original_servings = data.get('original_servings', 1)
    desired_servings = data.get('desired_servings', 1)

    # Calculate scale factor
    scale_factor = desired_servings / original_servings
    scaled_ingredients = []

    # Scale each ingredient
    for ingredient in ingredients:
        name = ingredient['name']
        amount = ingredient['amount'] * scale_factor
        unit = ingredient['unit']
        scaled_ingredients.append({
            'name': name,
            'amount': round(amount, 2),
            'unit': unit
        })

    return jsonify(scaled_ingredients)

@app.route('/recipes')
def recipes():
    # You can pass data to the template if you want, like a list of recipes
    recipes_data = [
        {
            'name': 'Spaghetti Carbonara',
            'description': 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
            'amounts': 'Pasta: 200g, Eggs: 2, Pancetta: 100g, Cheese: 50g',
            'yield': '2 servings'
        },
        {
            'name': 'Chicken Curry',
            'description': 'A flavorful curry dish made with chicken, spices, and coconut milk.',
            'amounts': 'Chicken: 500g, Curry Powder: 1 tbsp, Coconut Milk: 200ml, Onion: 1',
            'yield': '4 servings'
        }
        # Add more recipes as needed
    ]
    return render_template('recipes.html', recipes=recipes_data)

if __name__ == '__main__':
    app.run(debug=True)


