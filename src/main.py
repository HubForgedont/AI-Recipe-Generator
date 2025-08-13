from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv
from .api.routes import api_bp

# Load environment variables
load_dotenv()

def create_app():
    """Create and configure the Flask application"""
    app = Flask(__name__)
    
    # Enable CORS
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(api_bp, url_prefix='/api')
    
    @app.route('/')
    def index():
        return {
            "status": "online",
            "message": "AI Recipe Generator API is running"
        }
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=os.environ.get("FLASK_DEBUG", "False") == "True")
