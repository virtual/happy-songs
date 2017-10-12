import React, { Component } from 'react';

export default class About extends Component{
  render(){ 
    return(
      <article>
        <h1>About Us</h1>
        <p>Using sophisticated technology, we are making you less unhappy for your travels and travails.</p>
        <p>We use the (insert science jargon here) to make you happy.*</p>
        <footer><p><small>*These statements are not peer reviewed and should not be taken literally. We make no guarantees as to the effectiveness of our program. Also it's free, so that means we're broke and have no money to fork over in a lawsuit. All we do is provide music that is generally happy. If it doesn't make you happy then it's your own fault, but we will provide a full refund.</small></p></footer>
      </article>
    );
  };
}