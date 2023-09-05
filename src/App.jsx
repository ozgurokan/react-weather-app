
import './App.css'
import { useState } from 'react';
import Input from './components/Input';
import Card from './components/Card';
import CityContext from './contexts/CityContext';


function App() {

  const [city,setCity] = useState("adana");

  const data = {
    city,
    setCity
  }


  return (
    <>
      <CityContext.Provider value={data}>
        <div className='App'>

            <Input/>
            <Card/>
        </div>
      </CityContext.Provider>

    </>
  )
}

export default App
