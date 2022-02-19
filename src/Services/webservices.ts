import { AUTOCOMPLETE_API_URL, ONEDAY_FORCAST_API_URL, FIVEDAYS_FORCAST_API_URL } from "../Resources/ApiLinks";

export const GetLocationList = async(requestString : string) =>
{  
        let data :any = [];
        try {
        data = await fetch(`${AUTOCOMPLETE_API_URL}?q=${encodeURIComponent(requestString)}&apikey=${process.env.REACT_APP_WEATHER_API_KEY}&language=en-us`)
                .then(response => response.json(),
                (error) => {
                        if(error){
                                console.error(error);
                        }
                });
        } catch (error) {
           throw "Network Error"     
        }
        

        return data;
}


export const GetLocationInfo = async(requestString : string ) => {
  
        let weatherInfo :any = [];
        let data :any = [];

        try {

                data = await fetch(`${AUTOCOMPLETE_API_URL}?q=${encodeURIComponent(requestString)}&language=en-us&apikey=${process.env.REACT_APP_WEATHER_API_KEY}`)
                .then(response => response.json(),
                (error) => {
                        if(error){
                                console.error(error);
                        }
                });
                
        } catch (error) {
                throw "Network Error" 
        }


         data = await fetch(`${AUTOCOMPLETE_API_URL}?q=${encodeURIComponent(requestString)}&language=en-us&apikey=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(response => response.json(),
        (error) => {
                if(error){
                        console.error(error);
                }
        });
        
        if(data && data.length > 0)
        {
                const cityId = data[0]["Key"];
                const cityName = data[0].LocalizedName;// ["LocalizedName"];
                const regionName = data[0].Country.LocalizedName;
                
                const weatherInfo = await fetch(`${ONEDAY_FORCAST_API_URL}/${cityId}?apikey=${process.env.REACT_APP_WEATHER_API_KEY}&language=en-us`)
                .then(response => response.json(),
                (error) => {
                        if(error){
                                console.error(error);
                        }
                });

                const weather5DaysInfo = await fetch(`${FIVEDAYS_FORCAST_API_URL}/${cityId}?apikey=${process.env.REACT_APP_WEATHER_API_KEY}&language=en-us&&details=false&&metric=true`)
                .then(response => response.json(),
                (error) => {
                        if(error){
                                console.error(error);
                        }
                });


                Object.keys(weatherInfo).map(
                function(object){
                        weatherInfo[object]["CityName"]= cityName;
                        weatherInfo[object]["RegionName"]= regionName;
                        weatherInfo[object]["Weather5Days"] = weather5DaysInfo;
                });
                return weatherInfo; // return json object which includes also cityname and list of 5 days forecast
        }
        else{
                console.error(`no data fetched`);
                throw "no data fetched";
        }
}




