from fastapi.testclient import TestClient

from app.main import app


def test_health_endpoint():
    with TestClient(app) as client:
        response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_seeded_problem_list():
    with TestClient(app) as client:
        response = client.get("/api/v1/problems")
    assert response.status_code == 200
    problems = response.json()
    assert isinstance(problems, list)
    assert any(problem["slug"] == "design-url-shortener" for problem in problems)


def test_problem_filter():
    with TestClient(app) as client:
        response = client.get("/api/v1/problems", params={"module": "DSA"})
    assert response.status_code == 200
    assert all(problem["module"] == "DSA" for problem in response.json())
