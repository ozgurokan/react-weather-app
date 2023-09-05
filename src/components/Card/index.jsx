import { useContext,useEffect,useState } from "react";
import CityContext from "../../contexts/CityContext";
import axios from 'axios';



function Card() {
    const daysOfTheWeek = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    const {city} = useContext(CityContext);
    const [weather, setWeather] = useState([{}]);

    const weatherAPI = {
    key: "702de8856bc6a34b2d2e96ba89337678",
    base: "http://api.openweathermap.org/data/2.5/",
    };

  const searchWeather = async () => {

    const response = await axios.get(`${weatherAPI.base}forecast/?q=${city}&appid=${weatherAPI.key}&units=metric`);
    
    const data = response.data;

    setWeather([{}]);
    let dates = [];
    data.list.map((element) => {
       if(!dates.includes(element.dt_txt.split(" ")[0])){
          dates.push(element.dt_txt.split(" ")[0]);
          setWeather(weather => [...weather, element])
       }
    });
  }

  useEffect( () => {
    searchWeather();

  },[city])
  console.log(weather);
    return ( 
    <>
        <div className="day-list">
          {
            weather.map((element,index) => {
              if(index != 0){
                 return <div key={index} className={index === 1 ? "current-day" : "day"}>
                    <div className="day-name">
                      {new Date(element.dt_txt).toLocaleString('en-us', {weekday:'long'})}
                    </div>
                    <div className="day-list-icon">
                    <img src={`https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`} alt="" /> 
                    </div>
                    <div className="day-list-temp">
                      <p className="maxTemp">{(element.main.temp_max).toFixed(1)} °C</p>
                      <p> {element.main.temp_min} °C </p>
                    </div>
                   </div>
              }
               
            })
          }
        </div>


    </> 
    );
}

export default Card;