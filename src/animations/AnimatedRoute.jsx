import React from 'react';
import { Route } from 'react-router-dom';
const AnimatedRoute = (props) => (
    <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }}>
        <Route {...props} />
    </div>
);
export default AnimatedRoute;

//Ressource : https://medium.com/@lebrande/animate-your-routes-with-react-router-and-react-transition-group-66cfdb09deb3