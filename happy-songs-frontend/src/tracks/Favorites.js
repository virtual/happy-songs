import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
var axios = require('axios');

class Favorites extends Component{

  constructor(props){
    super(props);
    this.state = {
      favoritesTracks:[]
    }
  }
  
  componentDidMount(){
    axios.get('user').then((user)=>{
      if (user.data.err){
        this.props.history.push("/login");
      }
      this.setState({
        favoriteTracks:user.data.favoriteTracks
      });
    });
  }

  render(){
    let favorites;
    if (this.state.favoriteTracks){
      favorites = this.state.favoriteTracks.map((track, i)=>{
          return <div key={i}>Here's your favorite track id: {track.trackId}</div>
      });
    }
    return(
      <div>
        <h1>Favoritos</h1>
        {favorites}  
        <h1>...now buzz off</h1>
      </div>
    );
  };
}

export default withRouter(Favorites);
