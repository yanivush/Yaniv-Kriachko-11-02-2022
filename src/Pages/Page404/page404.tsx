import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../../Resources/images/404.jpg';

const NotFoundPage = () => {
    return (
      
        <section className="page_404">
            <div className="container">
                <div>
                    <img alt="Not Found 404" src={PageNotFound}  />
                    <span style={{textAlign:"center"}}>
                    <Link to="/">Go to Home </Link>
                    </span>
                </div>;
            </div>
        </section>
   );
};

export default NotFoundPage;