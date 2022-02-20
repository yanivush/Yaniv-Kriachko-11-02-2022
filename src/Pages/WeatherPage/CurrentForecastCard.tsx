import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col} from 'react-bootstrap';
import './weather.css';
import { SaveToLocal, GetFromLocal, RemoveFromLocal } from '../../Utils/LocalStorageService'
import {ROOT_WEATHER_ICONS_URL} from "../../Resources/ApiLinks";



interface IProps {
    data: any,
    CorF: string,
    temperature: string
}

export const CurrentForecast: React.FC<IProps> = props => {

    const loadIcon = (IconNum : any) => `${ROOT_WEATHER_ICONS_URL}${IconNum < 10 ? '0' + IconNum : IconNum}-s.png`;
    const [favorites, setfavorites] = useState<object[]>([]);
    const [isFavorite,setIsFavorite] = useState(false);
    

    useEffect(() => {
        //refresh when using favorite button 
    }, [isFavorite])
 

    const SaveFavorite = (obj : any) =>{
        
        const isExistskey = checkIsFavority(obj[0].CityName);

        if(!isExistskey)
        {
            SaveToLocal("favorites", obj);
            setIsFavorite(true);
        }
      }

      const RemoveFavorite = (cityName :string) => {
        let localData  = GetFromLocal("favorites");
        let index = localData && localData.findIndex((item: { CityName: string | any[]; }) => item.CityName.includes(cityName));
        RemoveFromLocal("favorites", index);
        setIsFavorite(false);
      }

      const favoriteButtonToggle =(data:any) => {
          if(data.length > 0 && checkIsFavority(data[0].CityName)){
              return  <Button variant="secondary" onClick={()=>RemoveFavorite(data[0].CityName)}>Remove from favorite</Button>
          }
          else{
             return <Button variant="success" onClick={()=>SaveFavorite(data)}>Add to favorite</Button>
          } 
      }

      const checkIsFavority = (city: string) => {
        let localData  = GetFromLocal("favorites");
        return localData && localData.filter((item: { CityName: string | any[]; }) => item.CityName.includes(city)).length > 0
      }
    
    return(
        <>
        <Card border="primary" style={{ width: '100%', height: '18rem' }}>
            <Card.Header> 
            <Container fluid>
                <Row>
                <Col>
                <div key="1" className='city-name'> {props.data[0] && props.data[0].CityName} <span className="region-name">({props.data[0] && props.data[0].RegionName})</span><span style={{"float" : "right"}}></span></div>
                </Col>
                <Col style={{"display": "flex", "flexDirection": "row-reverse"}}>
                  {favoriteButtonToggle(props.data)}
                </Col>
                </Row>
            </Container>
            </Card.Header>
            <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text style={{height: '60%'}}>
            <Container fluid>
               <Row sm={12}>
                <Col style={{"display": "flex"}}>
                  <div key="1" className='fore-icon-area'><img className='main-icon' src={loadIcon(props.data[0] && props.data[0].WeatherIcon)} alt='${props.data[0] && props.data[0].WeatherText}' /></div>
                  <div>
                  <div className='city-desc'>
                        Now: {props.temperature}
                    </div>
                    <div className='city-desc'>
                         {props.data[0] && props.data[0].WeatherText}
                    </div>
                  </div>
                </Col>
                </Row>
            </Container>
              
            </Card.Text>
            </Card.Body>
        </Card>
        </>
    )
}

