# AI-Recipe-Generator
An intelligent recipe generator that creates personalized recipes based on available ingredients, dietary restrictions, and cuisine preferences.
# AI Recipe Generator

An intelligent recipe generator that creates personalized recipes based on available ingredients, dietary restrictions, and cuisine preferences.


## 🍽️ Features

- Generate recipes based on ingredients you have
- Filter by dietary restrictions (vegetarian, vegan, gluten-free, etc.)
- Specify cuisine type preferences
- Adjust serving sizes automatically
- Get nutritional information for generated recipes
- Save favorite recipes to a personal collection

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 14+
- OpenAI API key

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/HubForgedont/ai-recipe-generator.git
cd ai-recipe-generator

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your OpenAI API key
echo "OPENAI_API_KEY=your_api_key_here" > .env
echo "FLASK_DEBUG=True" >> .env

# Run the Flask server
python -m src.main
```

### Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file for the frontend
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start the development server
npm start
```

## 📱 Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter the ingredients you have available
3. Select any dietary restrictions
4. Choose a cuisine type (optional)
5. Adjust servings and complexity as needed
6. Click "Generate Recipe" to get a personalized recipe

## 🔧 Configuration

You can customize the application by modifying the following environment variables:

```
# Backend (.env)
OPENAI_API_KEY=your_api_key_here
FLASK_DEBUG=True  # Set to False in production

# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000/api
```

## 🐳 Docker Deployment

```bash
# Build and run the Docker containers
docker-compose up -d

# The application will be available at http://localhost:3000
```

## 📚 API Documentation

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/api/generate-recipe` | POST | Generate a recipe | `ingredients`, `dietary_restrictions`, `cuisine_type`, `servings`, `complexity` |
| `/api/ingredient-substitutes` | GET | Get substitutes for an ingredient | `ingredient`, `dietary_restrictions` |
| `/api/ingredient-pairings` | GET | Get ingredient pairings | `ingredient` |
| `/api/cuisines` | GET | Get available cuisines | None |

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.



---

Made with ❤️ by https://x.com/hubForgeAI
