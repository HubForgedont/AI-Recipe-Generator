from typing import List, Dict, Any

# Sample cuisine database
# In a real implementation, this would be a proper database or API
CUISINES_DB = {
    "italian": {
        "common_ingredients": ["tomatoes", "basil", "olive oil", "garlic", "parmesan"],
        "common_techniques": ["sautéing", "simmering", "baking"],
        "flavor_profile": "Herbs, tomato-based sauces, cheese"
    },
    "mexican": {
        "common_ingredients": ["chili peppers", "corn", "beans", "cilantro", "lime"],
        "common_techniques": ["grilling", "frying", "slow-cooking"],
        "flavor_profile": "Spicy, citrusy, herb-forward"
    },
    "indian": {
        "common_ingredients": ["cumin", "coriander", "turmeric", "ginger", "garlic"],
        "common_techniques": ["sautéing", "simmering", "pressure cooking"],
        "flavor_profile": "Aromatic, spiced, complex"
    },
    "chinese": {
        "common_ingredients": ["soy sauce", "ginger", "garlic", "green onions", "rice wine"],
        "common_techniques": ["stir-frying", "steaming", "braising"],
        "flavor_profile": "Balanced, umami-rich"
    },
    "japanese": {
        "common_ingredients": ["soy sauce", "mirin", "dashi", "seaweed", "rice"],
        "common_techniques": ["grilling", "simmering", "raw preparation"],
        "flavor_profile": "Clean, umami, subtle"
    },
    "french": {
        "common_ingredients": ["butter", "wine", "shallots", "herbs", "cream"],
        "common_techniques": ["sautéing", "braising", "baking"],
        "flavor_profile": "Rich, buttery, herb-forward"
    },
    "thai": {
        "common_ingredients": ["lemongrass", "fish sauce", "coconut milk", "chili", "lime"],
        "common_techniques": ["stir-frying", "pounding", "grilling"],
        "flavor_profile": "Spicy, sour, sweet, salty balance"
    },
    "mediterranean": {
        "common_ingredients": ["olive oil", "lemon", "herbs", "yogurt", "feta"],
        "common_techniques": ["grilling", "roasting", "baking"],
        "flavor_profile": "Fresh, herbal, citrusy"
    }
    # Add more cuisines as needed
}

def get_all_cuisines() -> List[str]:
    """Get list of all available cuisine types"""
    return list(CUISINES_DB.keys())

def get_cuisine_characteristics(cuisine_type: str) -> Dict[str, Any]:
    """
    Get characteristics of a specific cuisine type
    
    Args:
        cuisine_type: The type of cuisine to get information about
        
    Returns:
        Dictionary containing cuisine characteristics
    """
    cuisine_type = cuisine_type.lower()
    
    if cuisine_type not in CUISINES_DB:
        return {}
    
    return CUISINES_DB[cuisine_type]
