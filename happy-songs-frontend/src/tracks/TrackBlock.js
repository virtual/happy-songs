import React, { Component } from 'react';
import AlbumCover from './AlbumCover.js';
import Artist from './Artist';
import Popularity from './Popularity';
import TrackName from './TrackName';
import { Media } from 'reactstrap';
import './tracks.css';

export default class TrackBlock extends Component{
  render(){ 
    console.log(this.props.playCount);
    let albums = [];
    this.props.musicData.tracks.items.slice(0, 3).forEach((e, i)=>{
      let trackid = e.track.id;
      let matchTrack = this.props.playCount.find((track)=>{
        return track.id===trackid;
      });
      if (matchTrack === undefined) {
        matchTrack = {
          playCount: 0
        }
      }
      console.log(matchTrack);
      albums.push(<div key={i}>
        <AlbumCover trackid={trackid} cover={e.track.album.images[0].url} link={e.track.album.external_urls.spotify} /> 
        <Media body>
          <Media heading>
            <TrackName trackid={trackid} link={e.track.external_urls.spotify} name={e.track.name} /><Popularity pop={matchTrack.playCount} />
          </Media>
          <Artist trackid={trackid} name={e.track.artists["0"].name} link={e.track.artists["0"].external_urls.spotify} />
          
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

