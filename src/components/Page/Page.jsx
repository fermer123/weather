import axios from 'axios';
import { useState } from 'react';
import style from './Page.module.scss';

const Page = () => {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState('');

  const api = `http://api.weatherapi.com/v1/current.json?key=6f82136fec71416b8f6113446220406&&q=${location}&aqi=no`;

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
            {weather.location ? <p>{weather.location.name}</p> : null}
          </div>
          <div className={style.temp}>
            {weather.current ? (
              <h1>{Math.ceil(weather.current.temp_c)} °C</h1>
            ) : null}
          </div>
          <div className={style.description}>
            {weather.current ? <p>{weather.current.condition.text}</p> : null}
          </div>
        </div>
        <div className={style.bottom}>
          <div className={style.feels}>
            {weather.current ? (
              <p className={style.bold}>
                {Math.ceil(weather.current.feelslike_c)} °C
              </p>
            ) : null}

            <p>Feels like</p>
          </div>
          <div className={style.humidity}>
            {weather.current ? (
              <p className={style.bold}>{weather.current.humidity} %</p>
            ) : null}

            <p>Humidity</p>
          </div>
          <div className={style.wind}>
            {weather.current ? (
              <p className={style.bold}>{weather.current.wind_kph} kph</p>
            ) : null}
            <p>Wind speed</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
