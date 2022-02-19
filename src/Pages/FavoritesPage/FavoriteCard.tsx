import React, {useEffect, useState} from 'react';
import { Card, Button } from 'react-bootstrap';
import './favorite.css';
import {ROOT_WEATHER_ICONS_URL} from "../../Resources/ApiLinks";
import { HashLink as Link } from 'react-router-hash-link';
import { useNavigate  } from 'react-router-dom';
import { SaveToLocal, GetFromLocal, RemoveFromLocal } from '../../Utils/LocalStorageService'


interface IFavoritProps {
    list : any
    cardKey : number
    updateFavorities: (arg: any) => void,
}


 export const FavoriteCard: React.FC<IFavoritProps> = (props) => {


     const loadIcon = (IconNum : any) => `${ROOT_WEATHER_ICONS_URL}${IconNum < 10 ? '0' + IconNum : IconNum}-s.png`;

    const updateFavoritiesList = ():void => {
      
        let favoritesArray = GetFromLocal("favorites");
        props.updateFavorities(favoritesArray); // update parent useState to refresh favorite page
    }

    const removeFavoritehandler = (index: number) => {
        RemoveFromLocal("favorites", index);
        updateFavoritiesList();
    }

return (
<>


<Card border="primary" style={{ width: '18rem', height: '23rem' }}>
            <Card.Header>
            <div className="singleCity--header">
               <Button variant="danger" onClick={()=>removeFavoritehandler(props.cardKey)}>Remove</Button>
            </div>
            </Card.Header>
            <Card.Body>
            <Card.Title><p>{props.list && props.list.CityName}({props.list && props.list.RegionName})</p></Card.Title>
            <Card.Text style={{height: '60%'}}>
                <div>
                    <div>Last shown Temperature: {props.list && props.list.Temperature.Metric.Value}</div>
                </div>
                <div>
                   <img className='main-icon' src={loadIcon(props.list && props.list.WeatherIcon)} alt='${item.WeatherText}' />
                </div>
            </Card.Text>
            <Card.Footer>
               <Link className="btn draw-border" to={"/Weather"}>Get Updated forecast info...</Link>
            </Card.Footer>
            </Card.Body>
        </Card>

</>
)

}

export default FavoriteCard;