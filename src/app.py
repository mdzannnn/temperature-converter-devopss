def validate_input(val):
    """Checks if input is a number."""
    if not isinstance(val, (int, float)):
        raise TypeError("Input must be a numeric value")

def celsius_to_fahrenheit(c):
    """Converts C to F with Absolute Zero check."""
    validate_input(c)
    if c < -273.15:
        raise ValueError("Temperature below absolute zero is impossible")
    return round((c * 9/5) + 32, 2)

def fahrenheit_to_celsius(f):
    """Converts F to C with Absolute Zero check."""
    validate_input(f)
    if f < -459.67:
        raise ValueError("Temperature below absolute zero is impossible")
    return round((f - 32) * 5/9, 2)

def celsius_to_kelvin(c):
    """Extra Feature: Kelvin Support for scientific marks."""
    validate_input(c)
    if c < -273.15:
        raise ValueError("Temperature below absolute zero is impossible")
    return round(c + 273.15, 2)

def is_freezing(c):
    """Checks if at or below freezing point."""
    validate_input(c)
    return c <= 0