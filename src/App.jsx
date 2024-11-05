import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [town, setTown] = useState("Kyiv");

  const key = "87aacf19a70177837260510519598a41";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&lang=ua&appid=${key}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const searchWeather = (e) => {
    if (e.key === "Enter") {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  };

  return (
    <div className="App">
      <div className="inp-field">
        <input
          type="text"
          value={town}
          onChange={(e) => setTown(e.target.value)}
          onKeyDown={searchWeather}
        />
      </div>
      <div className="container">
        <div className="header">
          <div className="city">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="desc">
            {data.weather && <p>{data.weather[0].main}</p>}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="footer">
            <div className="feels">
              {data.main && (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              )}
              <p>Feels like</p>
              <div className="humidity">
                {data.main && <p className="bold">{data.main.humidity}%</p>}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind && <p className="bold">{data.wind.speed}M/C</p>}
                <p>Wind</p>
                <div className="pressure">
                  {data.main && <p className="bold">{data.main.pressure}hPa</p>}
                  <p>Pressure</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
