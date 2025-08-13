from typing import List, Dict, Optional

# Sample ingredient database
# In a real implementation, this would be a proper database or API
INGREDIENTS_DB = {
    "chicken": {
        "substitutes": {
            "default": ["turkey", "tofu", "tempeh"],
            "vegetarian": ["tofu", "tempeh", "seitan"],
            "vegan": ["tofu", "tempeh", "seitan"]
        },
        "pairings": ["garlic", "lemon", "rosemary", "thyme", "onion"]
    },
    "beef": {
        "substitutes": {
            "default": ["bison", "lamb", "portobello mushrooms"],
            "vegetarian": ["beyond meat", "impossible meat", "lentils"],
            "vegan": ["beyond meat", "impossible meat", "lentils"]
        },
        "pairings": ["garlic", "onion", "rosemary", "thyme", "mushrooms"]
    },
    "rice": {
        "substitutes": {
            "default": ["quinoa", "couscous", "barley"],
            "gluten-free": ["quinoa", "millet", "buckwheat"]
        },
        "pairings": ["beans", "peas", "soy sauce", "vegetables"]
    },
    # Add more ingredients as needed
}

def get_ingredient_substitutes(ingredient: str, dietary_restrictions: Optional[List[str]] = None) -> List[str]:
    """
    Get substitutes for a given ingredient based on dietary restrictions
    
    Args:
        ingredient: The ingredient to find substitutes for
        dietary_restrictions: List of dietary restrictions to consider
        
    Returns:
        List of substitute ingredients
    """
    if dietary_restrictions is None:
        dietary_restrictions = []
    
    ingredient = ingredient.lower()
    
    # Check if ingredient exists in database
    if ingredient not in INGREDIENTS_DB:
        return []
    
    substitutes = []
    
    # Get default substitutes
    if "default" in INGREDIENTS_DB[ingredient]["substitutes"]:
        substitutes.extend(INGREDIENTS_DB[ingredient]["substitutes"]["default"])
    
    # Add substitutes for each dietary restriction
    for restriction in dietary_restrictions:
        if restriction in INGREDIENTS_DB[ingredient]["substitutes"]:
            substitutes.extend(INGREDIENTS_DB[ingredient]["substitutes"][restriction])
    
    # Remove duplicates and return
    return list(set(substitutes))

def get_ingredient_pairings(ingredient: str) -> List[str]:
    """
    Get ingredients that pair well with the given ingredient
    
    Args:
        ingredient: The ingredient to find pairings for
        
    Returns:
        List of ingredients that pair well
    """
    ingredient = ingredient.lower()
    
    # Check if ingredient exists in database
    if ingredient not in INGREDIENTS_DB:
        return []
    
    return INGREDIENTS_DB[ingredient].get("pairings", [])
