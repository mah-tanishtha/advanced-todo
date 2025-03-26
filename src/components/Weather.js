import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, CircularProgress, Container } from "@mui/material";
import { Search } from "@mui/icons-material";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      setWeather(null);

      if (!city.trim()) {
        setError("Please enter a city name.");
        setLoading(false);
        return;
      }

      // 1️⃣ Get Latitude & Longitude
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found! Please enter a valid city.");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2️⃣ Fetch Weather Data
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,rain,is_day,wind_speed_10m,wind_direction_10m`
      );
      const weatherData = await weatherRes.json();

      if (!weatherData.current) {
        setError("Weather data not available.");
        setLoading(false);
        return;
      }

      setWeather({
        city: name,
        country,
        ...weatherData.current,
      });

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch weather data.");
      setLoading(false);
      console.error("❌ Error fetching data:", err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        🌤 Check Weather before stepping out of your house!
      </Typography>

      {/* Search Input */}
      <TextField
        label="Enter City"
        variant="outlined"
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Search Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        startIcon={<Search />}
        onClick={fetchWeather}
      >
        Get Weather
      </Button>

      {loading && <CircularProgress sx={{ mt: 3 }} />}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {/* Weather Card */}
      {weather && (
        <Card sx={{ mt: 3, backgroundColor: "#f0f8ff", boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {weather.city}, {weather.country}
            </Typography>
            <Typography variant="h6">🌡 Temperature: {weather.temperature_2m}°C</Typography>
            <Typography variant="body1">💧 Humidity: {weather.relative_humidity_2m}%</Typography>
            <Typography variant="body1">💨 Wind Speed: {weather.wind_speed_10m} km/h</Typography>
            <Typography variant="body1">🌧 Rain: {weather.rain} mm</Typography>
            <Typography variant="body1">
              ☀️ Daytime: {weather.is_day ? "Yes" : "No"}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default WeatherApp;
