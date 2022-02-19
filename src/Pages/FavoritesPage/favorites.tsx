import React, {useEffect, useState} from 'react';
import { FavoriteCard } from './FavoriteCard'
import { ToastPopup } from '../../Components/ToastPop'
import { SaveToLocal, GetFromLocal } from '../../Utils/LocalStorageService'
import { Container, Row, Col } from 'react-bootstrap';


const FavoritePage = () => {

  const[favoriteList,setFavoriteList] = useState([]);

  useEffect(() => {

    const loadFavoriteWeathers = async() => {

      let favoriteStorage  = GetFromLocal("favorites")
 
      if( favoriteStorage !== null )
      {
        setFavoriteList(favoriteStorage);
      }

    }
    loadFavoriteWeathers();
  }, []);

  const updateNewFavorite = (newList: any):void => {
    setFavoriteList(newList);
  }


return (
<>
 <div id="favorite-page">
   <Container fluid className='cards-row-container'>
           <Row>
             <Col className="fav-title">My Favorite Forecast List</Col>
           </Row>
           <Row>
             <Col className="cards-row">
            { favoriteList.length > 0 ?
             favoriteList.map((item, index) => { 
                     return <li key={index}>
                        <FavoriteCard cardKey ={index} list={item} updateFavorities={updateNewFavorite}/>
                      </li>
                    } )
              : <div>You Don't have Any favorite yet..</div>
            }
              </Col>
           </Row>
         </Container>

   
   
 </div>
</>
)

}

export default FavoritePage;