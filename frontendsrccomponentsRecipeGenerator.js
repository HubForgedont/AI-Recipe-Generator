import React, { useState } from 'react';
import axios from 'axios';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Chip, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  CircularProgress,
  Grid,
  Box
} from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [cuisineType, setCuisineType] = useState('');
  const [servings, setServings] = useState(2);
  const [complexity, setComplexity] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  const handleAddIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const handleDeleteIngredient = (ingredientToDelete) => {
    setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToDelete));
  };

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${API_URL}/generate-recipe`, {
        ingredients,
        dietary_restrictions: dietaryRestrictions,
        cuisine_type: cuisineType || undefined,
        servings,
        complexity
      });
      
      setRecipe(response.data);
    } catch (err) {
      console.error('Error generating recipe:', err);
      setError(err.response?.data?.error || 'Failed to generate recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          AI Recipe Generator
        </Typography>
        
        {/* Ingredients Input */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            What ingredients do you have?
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter an ingredient"
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddIngredient()}
              />
            </Grid>
            <Grid item xs={3}>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                onClick={handleAddIngredient}
                sx={{ height: '100%' }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {ingredients.map((ingredient, index) => (
              <Chip
                key={index}
                label={ingredient}
                onDelete={() => handleDeleteIngredient(ingredient)}
              />
            ))}
          </Box>
        </Box>
        
        {/* Options */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Dietary Restrictions</InputLabel>
              <Select
                multiple
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                <MenuItem value="vegetarian">Vegetarian</MenuItem>
                <MenuItem value="vegan">Vegan</MenuItem>
                <MenuItem value="gluten-free">Gluten-free</MenuItem>
                <MenuItem value="dairy-free">Dairy-free</MenuItem>
                <MenuItem value="nut-free">Nut-free</MenuItem>
                <MenuItem value="low-carb">Low-carb</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Cuisine Type</InputLabel>
              <Select
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
              >
                <MenuItem value="">Any Cuisine</MenuItem>
                <MenuItem value="italian">Italian</MenuItem>
                <MenuItem value="mexican">Mexican</MenuItem>
                <MenuItem value="indian">Indian</MenuItem>
                <MenuItem value="chinese">Chinese</MenuItem>
                <MenuItem value="japanese">Japanese</MenuItem>
                <MenuItem value="french">French</MenuItem>
                <MenuItem value="thai">Thai</MenuItem>
                <MenuItem value="mediterranean">Mediterranean</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Servings</InputLabel>
              <Select
                value={servings}
                onChange={(e) => setServings(e.target.value)}
              >
                <MenuItem value={1}>1 person</MenuItem>
                <MenuItem value={2}>2 people</MenuItem>
                <MenuItem value={4}>4 people</MenuItem>
                <MenuItem value={6}>6 people</MenuItem>
                <MenuItem value={8}>8 people</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Complexity</InputLabel>
              <Select
                value={complexity}
                onChange={(e) => setComplexity(e.target.value)}
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={handleGenerateRecipe}
          disabled={loading || ingredients.length === 0}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Recipe'}
        </Button>
        
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        
        {/* Recipe Result */}
        {recipe && !loading && (
          <Paper elevation={2} sx={{ mt: 4, p: 3 }}>
            <Typography variant="h5" gutterBottom>
              {recipe.title}
            </Typography>
            
            <Typography variant="body1" paragraph>
              {recipe.description}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Typography variant="body2">
                Prep time: {recipe.prep_time_minutes} min
              </Typography>
              <Typography variant="body2">
                Cook time: {recipe.cook_time_minutes} min
              </Typography>
              <Typography variant="body2">
                Difficulty: {recipe.difficulty}
              </Typography>
            </Box>
            
            <Typography variant="h6" gutterBottom>
              Ingredients:
            </Typography>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            
            <Typography variant="h6" gutterBottom>
              Instructions:
            </Typography>
            <ol>
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
            
            {recipe.tags && recipe.tags.length > 0 && (
              <Box sx={{ mt: 2 }}>
                {recipe.tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" sx={{ mr: 1, mb: 1 }} />
                ))}
              </Box>
            )}
            
            {recipe.nutritional_info && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Nutritional Information (estimated):
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      Calories: {recipe.nutritional_info.calories || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      Protein: {recipe.nutritional_info.protein_g || 'N/A'}g
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      Carbs: {recipe.nutritional_info.carbs_g || 'N/A'}g
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      Fat: {recipe.nutritional_info.fat_g || 'N/A'}g
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      Fiber: {recipe.nutritional_info.fiber_g || 'N/A'}g
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      Sugar: {recipe.nutritional_info.sugar_g || 'N/A'}g
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}
            
            <Button 
              variant="outlined" 
              color="primary" 
              sx={{ mt: 3 }}
              onClick={() => {/* Save recipe functionality */}}
            >
              Save Recipe
            </Button>
          </Paper>
        )}
      </Paper>
    </Container>
  );
};

export default RecipeGenerator;
