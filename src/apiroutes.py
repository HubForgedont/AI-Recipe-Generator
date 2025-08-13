from flask import Blueprint, request, jsonify
from ..ai.recipe_generator import RecipeGenerator
import os

# Initialize the blueprint
api_bp = Blueprint('api', __name__)

# Initialize the recipe generator
recipe_generator = RecipeGenerator(api_key=os.environ.get('OPENAI_API_KEY'))

@api_bp.route('/generate-recipe', methods=['POST'])
def generate_recipe():
    """Generate a recipe based on provided parameters"""
    data = request.json
    
    # Extract parameters from request
    ingredients = data.get('ingredients', [])
    dietary_restrictions = data.get('dietary_restrictions', [])
    cuisine_type = data.get('cuisine_type')
    servings = data.get('servings', 2)
    complexity = data.get('complexity', 'medium')
    
    # Validate inputs
    if not ingredients:
        return jsonify({'error': 'No ingredients provided'}), 400
    
    # Generate recipe
    try:
        recipe = recipe_generator.generate_recipe(
            available_ingredients=ingredients,
            dietary_restrictions=dietary_restrictions,
            cuisine_type=cuisine_type,
            servings=servings,
            complexity=complexity
        )
        return jsonify(recipe)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/ingredient-substitutes', methods=['GET'])
def get_substitutes():
    """Get substitutes for a given ingredient"""
    ingredient = request.args.get('ingredient')
    dietary_restrictions = request.args.getlist('dietary_restrictions')
    
    if not ingredient:
        return jsonify({'error': 'No ingredient provided'}), 400
    
    substitutes = recipe_generator.suggest_ingredient_substitutes(
        ingredient=ingredient,
        dietary_restrictions=dietary_restrictions
    )
    
    return jsonify({'substitutes': substitutes})

@api_bp.route('/ingredient-pairings', methods=['GET'])
def get_pairings():
    """Get ingredients that pair well with a given ingredient"""
    ingredient = request.args.get('ingredient')
    
    if not ingredient:
        return jsonify({'error': 'No ingredient provided'}), 400
    
    pairings = recipe_generator.suggest_ingredient_pairings(ingredient=ingredient)
    
    return jsonify({'pairings': pairings})

@api_bp.route('/cuisines', methods=['GET'])
def get_cuisines():
    """Get list of available cuisine types"""
    from ..data.cuisine_types import get_all_cuisines
    
    cuisines = get_all_cuisines()
    return jsonify({'cuisines': cuisines})
