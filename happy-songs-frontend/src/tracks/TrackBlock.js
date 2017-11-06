import React, { Component } from 'react';
import AlbumCover from './AlbumCover.js';
import Artist from './Artist';
import Popularity from './Popularity';
import TrackName from './TrackName';
import { Media } from 'reactstrap';
import Play from './Play';
import { inject, observer } from 'mobx-react';
import './tracks.css';


var axios = require('axios');
var TrackBlock = observer (class extends Component{ 
  constructor() {
    super()
    this.state = {
      playCount: null
    }

    // this.fetchPlayCount = this.fetchPlayCount.bind(this);
  }


  componentDidMount(){
    // debugger;
    // if (this.props.trackStore.initialized){
      // console.log(this.props.trackStore)
    this.props.trackStore.retrieveTracks().then((res)=>{
      console.log(res);
    this.props.trackStore.fetchPlayCount();
  });
  // }
}
  render(){ 
    console.log(this.props.trackStore);
  let music = this.props.trackStore;
   if(music.initialized){
    let albums = [];
    music.musicData.tracks.items.slice(0, 3).forEach((e, i)=>{
      let trackid = e.track.id;
     
      let matchTrack = music.playCount.find((track)=>{
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
  } else {
    return (
      <div>
        Loading...
        </div>
    )
}
}
});

export default inject("trackStore")(TrackBlock);

