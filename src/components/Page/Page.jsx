import axios from 'axios';
import { useEffect, useState } from 'react';
import style from './Page.module.scss';

const Page = () => {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState('');
  const api = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=3fc69a436f78882d60a5e06ac53b6cba`;
  // useEffect(() => {
  //   const resp = async () => {
  //     await axios(api);
  //     setWeather(resp);
  //   };
  //   resp();
  // }, []);

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
            <p>{location.name}</p>
          </div>
          <div className={style.temp}>
            <h1>23 °C</h1>
          </div>
          <div className={style.description}>
            <p>Clouds</p>
          </div>
        </div>
        <div className={style.bottom}>
          <div className={style.feels}>
            <p className={style.bold}>27 °C</p>
            <p>Feels like</p>
          </div>
          <div className={style.humidity}>
            <p className={style.bold}>20%</p>
            <p>Humidity</p>
          </div>
          <div className={style.wind}>
            <p className={style.bold}> 2 km/h</p>
            <p>Wind speed</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
