import React, { Component } from 'react';

export default class Footer extends Component{
  render(){ 
    return(
      <footer className="mt-5">
        <p className="float-right"><a>Back to top</a></p>
        <p>© 2017 Company, Inc. · <a>Privacy</a> · <a>Terms</a></p>
      </footer>
    );
  };
}