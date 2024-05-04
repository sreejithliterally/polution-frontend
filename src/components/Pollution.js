import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { Oval as Loader } from 'react-loader-spinner';

function Pollution() {
  const [pollution, setPollution] = useState({
    loading: true,
    data: {
      CO_Level_ppm: 0.1, // Dummy CO level in ppm
      PM25_Level_µg_m3: 100, // Dummy PM2.5 level in µg/m³
      Temperature_C: 30, // Dummy temperature in Celsius
      Humidity_percent: 60, // Dummy humidity percentage
      Latitude: 9.49,
      Longitude: 76.33,
    },
    error: false,
  });

  const toDate = () => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  useEffect(() => {
    // Dummy data for pollution
    const pollutionData = {
      CO_Level_ppm: 0.1,
      PM25_Level_µg_m3: 100,
      Temperature_C: 30,
      Humidity_percent: 60,
      Latitude: 9.49,
      Longitude: 76.33,
    };
    
    // Update the state with dummy pollution data
    setPollution({ ...pollution, data: { ...pollution.data, ...pollutionData }, loading: false });
  }, []);

  const pollutionStatus = () => {
    const { CO_Level_ppm, PM25_Level_µg_m3 } = pollution.data;
    if (CO_Level_ppm > 0.1 || PM25_Level_µg_m3 > 15) {
      return "Polluted";
    } else if (CO_Level_ppm <= 0.1 && PM25_Level_µg_m3 <= 15) {
      return "Not Polluted";
    } else {
      return "Moderate";
    }
  }

  return (
    <div>
      <h1 className="app-name">
        Pollution App<span>🏭</span>
      </h1>

      {pollution.loading && (
        <>
          <br />
          <br />
          <Loader type="Oval" color="black" height={100} width={100} />
        </>
      )}
      {pollution.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ 'font-size': '20px' }}> Sorry, Data not found</span>
          </span>
        </>
      )}

      {pollution && pollution.data && pollution.data.CO_Level_ppm !== undefined && (
        <div>
          <div className="city-name">
            <h2>
              Alappuza
            </h2>
          </div>
          <div className="date">
            <span>{toDate()}</span>
          </div>
          <div className="pollution-status">
            <h3>Pollution Status</h3>
            <p className={pollutionStatus() === "Polluted" ? "polluted" : "not-polluted"}>
              {pollutionStatus()}
            </p>
          </div>
          <div className="icon-temp">
            <span>CO Level: {pollution.data.CO_Level_ppm} ppm</span><br />
            <span>PM2.5 Level: {pollution.data.PM25_Level_µg_m3} µg/m³</span><br />
            <span>Temperature: {pollution.data.Temperature_C} °C</span>
          </div>
          <div className="des-wind">
            <p>Humidity: {pollution.data.Humidity_percent}%</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pollution;
