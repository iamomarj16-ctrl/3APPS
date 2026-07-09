import React, { useState, useEffect } from 'react';

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = '#0f172a';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const fetchWeather = async () => {
    if (!city) return;
    try {
      setError('');
      // Geocoding API to get exact coordinates
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();

      if (geoData.results && geoData.results.length > 0) {
        const { latitude, longitude, name } = geoData.results[0];
        
        // Added &timezone=auto to fetch exact local time temperature
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`);
        const weatherData = await weatherRes.json();
        
        setWeather({
          cityName: name,
          temp: Math.round(weatherData.current_weather.temperature), // Rounding off decimal values
          windspeed: weatherData.current_weather.windspeed
        });
      } else {
        setError('City not found!');
        setWeather(null);
      }
    } catch (err) {
      setError('Failed to load weather data!');
    }
  };

  return (
    <div style={{ 
      display: 'block', 
      clear: 'both', 
      margin: '30px auto', 
      padding: '25px', 
      maxWidth: '400px', 
      borderRadius: '12px', 
      background: '#1e293b', 
      color: '#ffffff', 
      textAlign: 'center',
      boxShadow: '0px 10px 25px rgba(0,0,0,0.5)',
      fontFamily: 'sans-serif'
    }}>
      <h2>Weather App</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Enter City Name..." 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ 
            padding: '12px', 
            width: '65%', 
            marginRight: '10px', 
            border: '1px solid #475569', 
            borderRadius: '6px', 
            color: '#fff', 
            background: '#0f172a', 
            outline: 'none'
          }}
        />
        <button onClick={fetchWeather} style={{ 
          padding: '12px 18px', 
          cursor: 'pointer', 
          background: '#38bdf8', 
          color: '#0f172a', 
          border: 'none', 
          borderRadius: '6px', 
          fontWeight: 'bold'
        }}>
          Search
        </button>
      </div>

      {error && <p style={{ color: '#f87171', fontWeight: 'bold' }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: '25px', borderTop: '1px solid #334155', paddingTop: '20px' }}>
          <h3 style={{ color: '#ffffff', margin: '0 0 10px 0', fontSize: '22px' }}>Location: {weather.cityName}</h3>
          <h1 style={{ color: '#38bdf8', margin: '10px 0', fontSize: '48px' }}>{weather.temp}°C</h1>
          
          <div style={{ background: '#0f172a', padding: '15px', borderRadius: '8px', textAlign: 'left', marginTop: '15px' }}>
            <p style={{ color: '#cbd5e1', margin: 0 }}><strong>Wind Speed:</strong> {weather.windspeed} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;