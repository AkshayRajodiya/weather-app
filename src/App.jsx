import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [currentLatLon, setCurrentLatLon] = useState({lat: '', lon: ''})

  const fetchCurrentWeatherData = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLatLon.lat}&lon=${currentLatLon.lon}&units=metric&AppId=${api.key}`)
      .then(res=>res.json()
      .then(result=>{
        setQuery('');
        setWeather(result)
        console.log(result)
      }))
  }

  useEffect(() => {
    if(currentLatLon.lat && currentLatLon.lon) {
      fetchCurrentWeatherData()
    }
  }, [currentLatLon])

  useEffect(() =>{
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function(position) {
        setCurrentLatLon({lat: position.coords.latitude, lon: position.coords.longitude})
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });

      
    } else {
      console.log("Not Available");
    }
  },[])
  const api={
    key:"48ea216f31139b35329ef6b49649837e",
    base:"https://api.openweathermap.org/data/2.5/"
  }
  const[query,setQuery]=useState('');
  const[weather,setWeather]=useState({});

  const search =event=>{
    if(event.key==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&AppId=${api.key}`)
      .then(res=>res.json()
      .then(result=>{
        setQuery('');
        setWeather(result)
        console.log(result)
      }))

    }
  }

  const dateBuilder=(d)=>{
    let months=["January","February","March","April","Mai","June","July","August","Septmber","Octomber","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return `${day} ${date} ${month} ${year}` 
  }
  

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'weather-clr hot' : 'weather-clr') : 'weather-clr'}>
        <main>
<div className='search-box'>
    <input type={"text"} className="search-bar" placeholder='Enter-City'
    onChange={e=>setQuery(e.target.value)} 
    value={query}
    onKeyPress={search}
    />
</div>

{(typeof weather.main != "undefined") ? (<div><div className="location-box">
  <div className="location">{weather.name},{weather.sys.country}</div>

  <div className="date">{dateBuilder(new Date())}</div>
</div>
<div className="weather-box">
  <div className="temp">{Math.round(weather.main.temp)}°C</div>
  <div className="weather">{weather.weather[0].main}</div>
</div></div>):(" ")}


        </main>
    </div>
  )
}

export default App
