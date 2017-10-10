import React, { Component } from 'react';
import AlbumCover from './AlbumCover.js';
import Artist from './Artist';
import Play from './Play';
import Popularity from './Popularity';
import TrackName from './TrackName';
import { Container, Media } from 'reactstrap';
import './tracks.css';

export default class TrackBlock extends Component{
  constructor(){
    super();
  }
  render(){
    let trackBlockHTML = '';
    let albums = []; 
    this.props.musicData.tracks.items.slice(0, 3).forEach((e)=>{
      albums.push(<div>
        <AlbumCover cover={e.track.album.images[0].url} link={e.track.album.external_urls.spotify} /> 
        <Media body>
          <Media heading>
            <TrackName link={e.track.external_urls.spotify} name={e.track.name} /><Popularity pop={e.track.popularity} />
          </Media>
          <Artist name={e.track.artists["0"].name} link={e.track.artists["0"].external_urls.spotify} />
        
        
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

