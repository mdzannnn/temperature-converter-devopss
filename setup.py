import os

# 1. Define the code for the main application (Robust & Clean)
app_content = """
def validate_input(val):
    \"\"\"Checks if input is a number.\"\"\"
    if not isinstance(val, (int, float)):
        raise TypeError("Input must be a numeric value")

def celsius_to_fahrenheit(c):
    \"\"\"Converts C to F with Absolute Zero check.\"\"\"
    validate_input(c)
    if c < -273.15:
        raise ValueError("Temperature below absolute zero is impossible")
    return round((c * 9/5) + 32, 2)

def fahrenheit_to_celsius(f):
    \"\"\"Converts F to C with Absolute Zero check.\"\"\"
    validate_input(f)
    if f < -459.67:
        raise ValueError("Temperature below absolute zero is impossible")
    return round((f - 32) * 5/9, 2)

def celsius_to_kelvin(c):
    \"\"\"Extra Feature: Kelvin Support for scientific marks.\"\"\"
    validate_input(c)
    if c < -273.15:
        raise ValueError("Temperature below absolute zero is impossible")
    return round(c + 273.15, 2)

def is_freezing(c):
    \"\"\"Checks if at or below freezing point.\"\"\"
    validate_input(c)
    return c <= 0
"""

# 2. Define the test suite (Professional Parametrized Tests)
test_content = """
import pytest
from src.app import celsius_to_fahrenheit, fahrenheit_to_celsius, is_freezing, celsius_to_kelvin

# Testing Normal Conversions
@pytest.mark.parametrize("c, expected_f", [(0, 32), (100, 212), (-40, -40)])
def test_conversions(c, expected_f):
    assert celsius_to_fahrenheit(c) == expected_f

# Testing Logic
def test_freezing_logic():
    assert is_freezing(0) is True
    assert is_freezing(5) is False

# Testing DevOps Robustness (Error Handling)
def test_invalid_inputs():
    with pytest.raises(TypeError):
        celsius_to_fahrenheit("hot")
    
def test_physical_limits():
    with pytest.raises(ValueError):
        celsius_to_fahrenheit(-500)
"""

# 3. Define the GitHub Actions CI Pipeline
yaml_content = """
name: DevOps CI Pipeline
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      - name: Install Pytest
        run: pip install pytest
      - name: Run Automated Tests
        run: python -m pytest
"""

# 4. Define Folder Structure
folders = ["src", "tests", ".github/workflows"]
for folder in folders:
    os.makedirs(folder, exist_ok=True)

# 5. Create Files
files = {
    "src/__init__.py": "",
    "src/app.py": app_content.strip(),
    "tests/test_app.py": test_content.strip(),
    ".github/workflows/main.yml": yaml_content.strip(),
    "requirements.txt": "pytest",
    "README.md": "# Temperature Converter DevOps Project\\nRun tests with `python -m pytest`"
}

for path, content in files.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

print("\\n--- SETUP COMPLETE ---")
print("1. Your project structure is ready.")
print("2. Type 'pip install pytest' if you haven't already.")
print("3. Type 'python -m pytest' to run your tests.")