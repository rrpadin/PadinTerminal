"""
Business Backend Test Template
Copy this to test your custom routes

Example: business/backend/tests/test_email_rules.py
"""

import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
import sys
import os

# Adjust path to reach main.py
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../saas-boilerplate/backend')))

from main import app

client = TestClient(app)

class TestYourFeature:
    """Test your custom business routes"""
    
    def test_your_endpoint_success(self):
        """Test your custom endpoint works"""
        response = client.get("/api/your_feature/")
        
        assert response.status_code == 200
        data = response.json()
        # Add your assertions here
    
    def test_your_endpoint_with_auth(self):
        """Test authenticated endpoint"""
        # Mock authentication
        with patch('saas_boilerplate.core.auth.get_current_user') as mock_auth:
            mock_auth.return_value = MagicMock(
                id="auth0|123",
                email="test@example.com",
                name="Test User"
            )
            
            response = client.get(
                "/api/your_feature/protected",
                headers={"Authorization": "Bearer fake_token"}
            )
            
            assert response.status_code == 200
    
    def test_create_item(self):
        """Test creating item via your API"""
        response = client.post("/api/your_feature/", json={
            "name": "Test Item",
            "value": 123
        })
        
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "Test Item"
        assert data["value"] == 123
    
    def test_invalid_input(self):
        """Test validation works"""
        response = client.post("/api/your_feature/", json={
            "invalid": "data"
        })
        
        assert response.status_code == 422  # Validation error


class TestYourBusinessLogic:
    """Test your business logic functions"""
    
    def test_your_helper_function(self):
        """Test helper functions"""
        # Import your business logic
        # from business.backend.routes.your_feature import your_function
        
        # result = your_function("input")
        # assert result == "expected"
        pass


# Example: InboxTamer Email Rules Test
class TestEmailRulesExample:
    """Example test for InboxTamer email rules"""
    
    @pytest.fixture
    def sample_rule(self):
        return {
            "name": "Archive Newsletters",
            "condition": "from",
            "value": "@newsletter.com",
            "action": "archive"
        }
    
    def test_create_email_rule(self, sample_rule):
        """Test creating email rule"""
        response = client.post("/api/email_rules/", json=sample_rule)
        
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == sample_rule["name"]
        assert "id" in data
    
    def test_list_email_rules(self):
        """Test listing all rules"""
        response = client.get("/api/email_rules/")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
    
    def test_rule_matching(self, sample_rule):
        """Test rule matching logic"""
        # Create rule
        create_response = client.post("/api/email_rules/", json=sample_rule)
        rule_id = create_response.json()["id"]
        
        # Test matching
        test_email = {
            "from": "promo@newsletter.com",
            "subject": "Weekly Update",
            "body": "Here's what's new"
        }
        
        response = client.post(
            f"/api/email_rules/{rule_id}/test",
            json=test_email
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["matches"] == True
        assert data["action"] == "archive"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
