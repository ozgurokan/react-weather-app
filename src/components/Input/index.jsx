import { useContext,useState,useEffect } from "react";
import CityContext from "../../contexts/CityContext";
// import axios from 'axios';
import { Requireable as require } from "react";
import axios from "axios";



function Input() {
    const {city,setCity} = useContext(CityContext);
    const [loading, setLoading] = useState(true);
    const [cityList, setCityList] = useState([]);

    const changeCity = (e) => {
        setCity(e.target.value)
    }
    //"https://turkiyeapi.cyclic.app/api/v1/provinces?name=istanbul"

    const getCities = async () => {
        setLoading(true);

        const cities = await axios.get("https://turkiyeapi.cyclic.app/api/v1/provinces?&limit=81")
        .then((response) => {
            return response.data.data;
        });
        setCityList(cities);
        setLoading(false);
        
    }
    useEffect(() =>{
        getCities();
    },[])
    
    return (  
        
        loading ? "loading" : 
        
        <div>
        <label htmlFor="location"> <h2>Select Location</h2></label>
        <br />
        <select  id="location" value={city} onChange={changeCity}>
            {
                cityList.map((city, id) => {
                    return <option key={id} value={city.name}>{city.name}</option>
                })
            }
        </select>
        </div>
        

        
    );
}

export default Input;
