import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div>
    <Link to="/">
      <img style={{width:"100%",height:"100%"}} src="https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-template-10.png" alt="Page not found - 404 error" />
    </Link>
  </div>
  
  );
}

export default PageNotFound;