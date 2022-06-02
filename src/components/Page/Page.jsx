import axios from 'axios';
import { useState } from 'react';
import style from './Page.module.scss';

const Page = () => {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState('');
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3fc69a436f78882d60a5e06ac53b6cba`;
  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      axios.get(api).then((response) => {
        setWeather(response.data);
      });
      setLocation('');
    }
  };

  console.log(weather);

  return (
    <>
      <div className={style.search}>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type='text'
          placeholder='Enter location'
          onKeyPress={searchLocation}
        />
      </div>
      <div className={style.container}>
        <div className={style.top}>
          <div className={style.location}>
            {weather ? <p>{weather.name}</p> : null}
          </div>
          <div className={style.temp}>
            {weather.main ? (
              <h1>{Math.ceil(weather.main.temp / 32)} °C</h1>
            ) : null}
          </div>
          <div className={style.description}>
            {weather.description ? (
              <p>{weather.weather[0].description}</p>
            ) : null}
          </div>
        </div>
        <div className={style.bottom}>
          <div className={style.feels}>
            {weather.main ? (
              <p className={style.bold}>
                {Math.ceil(weather.main.feels_like / 32)} °C
              </p>
            ) : null}

            <p>Feels like</p>
          </div>
          <div className={style.humidity}>
            {weather.main ? (
              <p className={style.bold}>{weather.main.humidity} %</p>
            ) : null}

            <p>Humidity</p>
          </div>
          <div className={style.wind}>
            {weather.wind ? (
              <p className={style.bold}>{weather.wind.speed} m/s</p>
            ) : null}
            <p>Wind speed</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
