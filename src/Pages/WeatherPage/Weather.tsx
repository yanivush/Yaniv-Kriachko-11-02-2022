import React, {useEffect, useState} from 'react';
import './weather.css';
import { GetLocationInfo, GetLocationList } from '../../Services/webservices';
import { Weather5DaysForecast } from './Weather5DaysForecast'
import { CurrentForecast } from './CurrentForecastCard'
import { Col, Container, Row } from 'react-bootstrap';
import  SearchBar from '../../Components/SearchBar'
import { useLocation } from 'react-router-dom';


const WeatherPage = () => {

   let degree : number = 0;
   let degreeType : string = "C";
   const[weatherList,setWeatherlist] = useState([]);
   const[weather5DaysList,setWeather5DaysList] = useState([]);
   const[temperature, setTemperature] = useState(degree);
   const[getDegreeType, setGetDegreeType] = useState(degreeType)
   const[citySearchValue, setCitySearchValue] = useState(''); 
  
   
   
  useEffect(() => {

    
    const fetchWeatherData = async() => {
      try
      {
        let localData  = localStorage.getItem("apiData");
        let parsedLocal = localData && JSON.parse(localData);
        setCitySearchValue((localData === null) ? ('Tel Aviv') : '')

        if( parsedLocal === null || (parsedLocal[0]["CityName"] !== citySearchValue && citySearchValue !== ''))
        {
         
         await GetLocationInfo(citySearchValue)
        .then(items => { !!items[0] &&
          setWeatherlist(items);  
          setTemperature(items[0].Temperature.Metric.Value); 
          setWeather5DaysList(items[0].Weather5Days.DailyForecasts); 
          localStorage.setItem("apiData", JSON.stringify(items));
        })
        }
        else {
           setWeatherlist(parsedLocal) ;
           setTemperature(parsedLocal[0].Temperature.Metric.Value);
           setWeather5DaysList(parsedLocal[0].Weather5Days.DailyForecasts);
        }
      }
      catch(err)
      {
         console.error("$error: {err}");
      }
    }
    fetchWeatherData();

  }, [citySearchValue]);
  
  const showTemp  = () => {
     return `${temperature}${getDegreeType}`;
  }

  //get result from search component to render data
  const updateCityName = (cityName: string):void => {
    setCitySearchValue(cityName);
  }

  

return (
<>
  <div id="weather-page">
     <div className="weather-card">
     <Container fluid className='search-row'>
      <Row>
      <Col sm></Col>
      <Col sm className='searchBarArea'> 
         <SearchBar updateCityName={updateCityName} />
      </Col>
      <Col sm></Col>
      </Row>
      <Row className='current-forecast-row'>
         <Col>
            <Container fluid>
              <Row>
                <Col sm><CurrentForecast data={weatherList} temperature={showTemp()} CorF = {getDegreeType/*the idea was to set degree in C or F*/}/></Col>
              </Row>
            </Container>
         </Col>
      </Row>
      <Row>
        <Col>
         <Container fluid className='cards-row-container'>
           <Row>
             <Col className="five-days-title">Forecast for next 5 days</Col>
           </Row>
           <Row>
             <Col className="cards-row">
                  {weather5DaysList.map((item, index) => { 
                     return <li key={index}>
                        <Weather5DaysForecast data={item} CorF = {getDegreeType} />
                      </li>
                    } )}
              </Col>
           </Row>
         </Container>
        </Col>
      </Row>
    </Container>
    </div>
  </div>
</>
)

}

export default WeatherPage;