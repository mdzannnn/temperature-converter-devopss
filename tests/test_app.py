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