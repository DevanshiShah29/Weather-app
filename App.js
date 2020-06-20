import React , { useState } from 'react';
const api ={
  key : "d93072d2a844ea9dadbd1f1c404b2f8c" ,
  base : "https://api.openweathermap.org/data/2.5/"
}


function App() {

  const[ query, setQuery ] = useState('');
  const[ weather, setWeather ] = useState({});

  const search = (evt) => {
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log("called",result);
        });
    }
  }

  const dateBuilder = (d) => {
    let Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November","December"];
    let Days = ["Monday", "Tuesday", "Wednesday", "Thursday","Friday","saturday","Sunday"];

    let date = d.getDate();
    let day = Days[d.getDay()];
    let month = Months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (

    <div className={(typeof weather.main != "undefined") ? 
                  ((weather.main.temp > 300) ? 
                  'app warm' : 'app' ) :
                  'app'}>
      <main>
        <div className="search-box">
            <input 
            type="text" 
            className="search-bar" 
            placeholder="Search..."
            onChange ={e => setQuery(e.target.value)}
            value = {query}
            onKeyPress= {search}
            />
        </div>
        {(typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp) - 273}°C</div>
                <div className="weather">{weather.weather[0].description}</div>
            </div>
          </div>
        ) : [''])}
      </main>
    </div>
    
  );
}

export default App;
