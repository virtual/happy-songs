import React, { Component } from 'react';
import AlbumCover from './AlbumCover.js';
import Artist from './Artist';
import Popularity from './Popularity';
import TrackName from './TrackName';
import { Media } from 'reactstrap';
import Play from './Play';
import './tracks.css';
import {withRouter} from "react-router-dom";

var axios = require('axios');

class TrackBlock extends Component{

  constructor(){
    super();
    this.user;
    this.playCount = [];  
    this.state = {
      musicData:{ 
        tracks:{
          items:[]
        }
      }
    }
  }

  componentDidMount(){
    let getSpotify = axios.get('/spotify');
    let getTracks = axios.get('/tracks');

    Promise.all([getSpotify, getTracks]).then((reses)=>{
      if (reses[0].data.err){
        this.props.history.push("/login");
      }
      this.tracks = reses[1].data;
      this.setState({
        musicData: reses[0].data
      });
    });
  }

  render(){ 
    let albums = [];
    this.state.musicData.tracks.items.slice(0, 3).forEach((e, i)=>{
      let trackid = e.track.id;
        let matchTrack = this.tracks.find((track)=>{
        return track.trackId===trackid;
      });
      if (matchTrack === undefined) {
        matchTrack = {
          playCount: 0
        }
      }  
      albums.push(<div key={i}>
        <AlbumCover trackid={trackid} cover={e.track.album.images[0].url} link={e.track.album.external_urls.spotify} /> 
        <Play trackid={trackid} link={e.track.artists["0"].external_urls.spotify} playCount={matchTrack.playCount} />
        <Media body>
          <Artist trackid={trackid} name={e.track.artists["0"].name} link={e.track.artists["0"].external_urls.spotify} />
          <Media heading>
            <TrackName trackid={trackid} link={e.track.external_urls.spotify} name={e.track.name} playCount={matchTrack.playCount} /> 
          </Media>
        </Media> 
        </div>);
    })
    return(
      <div>
        <Media>
        {albums}
        </Media>
      </div>
    );
  };
}

export default withRouter(TrackBlock);


