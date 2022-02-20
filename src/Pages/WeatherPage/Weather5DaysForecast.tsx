import React from 'react';
import { Card } from 'react-bootstrap';
import './weather.css';
import { FormatDate, GetDayOfDate} from '../../Utils/convertes'
import {ROOT_WEATHER_ICONS_URL} from "../../Resources/ApiLinks";


interface IProps {
    data: any,
    CorF: string
}

export const Weather5DaysForecast: React.FC<IProps> = props => {

    const loadIcon = (IconNum : any) => `${ROOT_WEATHER_ICONS_URL}${IconNum < 10 ? '0' + IconNum : IconNum}-s.png`;

    return(
        <>
        <Card border="primary" className="five-days-cards">
            <Card.Header>{GetDayOfDate(props.data.Date)}&nbsp;|&nbsp;{FormatDate(props.data.Date)}</Card.Header>
            <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text style={{height: '70%', 'display':'flex'}}>
                <div className='fivedays-card-body'>
                    <div>Night:  {props.data && props.data.Temperature.Minimum.Value}{props.CorF} &nbsp; <img src={loadIcon(props.data.Night.Icon)} alt='${props.data.Night.IconPhrase}' /> </div>
                    <div>Day:  {props.data && props.data.Temperature.Maximum.Value}{props.CorF} &nbsp; <img src={loadIcon(props.data.Day.Icon)} alt='${props.data.Day.IconPhrase}' /></div>
                </div>
            </Card.Text>
            </Card.Body>
        </Card>
        </>
    )
}

