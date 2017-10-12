import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
export default class Footer extends Component{
  render(){ 
    return(
      <footer className="mt-5">
        <p className="float-right"><a>Back to top</a></p>
        <p>© 2017 Company, Inc. · <Link className='nav-link' to='/about'>About</Link>  </p>
        
      </footer>
    );
  };
}