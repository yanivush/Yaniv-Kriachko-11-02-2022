import React, { useState } from 'react';
import { GetLocationList } from '../Services/webservices'
import { Highlighter, Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { ToastPopup } from './ToastPop'

interface IProps {
    
    updateCityName: (arg: string) => void,
}

const SearchBar: React.FC<IProps> = ({updateCityName}) => {

    const[citySearch, setCitySearch] = useState(''); 
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const[LocalieList,setLocalelist] = useState([]);

    const errors : string[] = [];

    
        const fetchLocalerData = async(value : any) => {
        try
        {

          setCitySearch(value);
              await GetLocationList(value)
            .then(items => { 
                let generateNewCityList = items.map((el : any) => ({
                    Key: el.Key,
                    City: el.LocalizedName,
                    Region: el.Country.LocalizedName
                }));
                setLocalelist(generateNewCityList) ;
            })
            .catch(() => {
                setLocalelist([]);
                errors.push('Network problem.. Please, try again later..');
                setErrorMessages(errors);
                ShowToastMessage('Error', errorMessages, true );
            });
          }
        catch(err)
        {
           console.error("$error: {err}");
           errors.push('Network problem.. Please, try again later..');
           setErrorMessages(errors);
           ShowToastMessage('Error', errorMessages, true );
        }
      }


    const englishOnlyValidate = (value : string) => {
        let isValid = false;
        
        if(/^[a-zA-Z0-9 ]+$/.test(GetValueFromObject(value))) {
          isValid = true;
        }
        return isValid;
      }
    
      const cityValidation =(value : string) => {
    
       
        const isCityValid = value !== "";
    
        if (!isCityValid) {
            errors.push("Please, enter city name.");
        }
        else{
          if (!englishOnlyValidate(value)) {
            errors.push("English Only allowd");
          }
          else{
               updateCityName(GetValueFromObject(value));
          }
        }
    
        if (errors.length > 0) {
          setErrorMessages(errors);
          return false 
          
        }

      }

      const ShowToastMessage = (title : string, showMessage:string[] , isShow : boolean) =>{
        return <div><ToastPopup title={title} messageArr={showMessage} istoshow={isShow} /></div>
      }

       const searchHandle = (value : any) => {
         if(englishOnlyValidate(value))
         {
          fetchLocalerData(value);
         }
       }

       const GetValueFromObject= (value: any) =>{
        if(typeof value === 'object') //indicate between typing and selected from list (selected is object type)
        {
            value = value[0] && value[0]["City"];
        }
        return value;
      }
    

return (
<>
   <Typeahead 
      id="txtSearch"
      options={LocalieList}
      labelKey="City"
      onInputChange={(citySearch) => searchHandle(citySearch)}
      onChange={(citySearch) => searchHandle(citySearch)}
      placeholder="Search..."
    />
   <button onClick={() => cityValidation(citySearch)}>Search</button>
</>
)

}

export default SearchBar;