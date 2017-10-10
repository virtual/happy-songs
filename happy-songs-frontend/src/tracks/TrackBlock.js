import React, { Component } from 'react';
import AlbumCover from './AlbumCover.js';
import Artist from './Artist';
import Play from './Play';
import Popularity from './Popularity';
import './tracks.css';

export default class TrackBlock extends Component{
  constructor(){
    super();
  }
  render(){
    let trackBlockHTML = '';
    let albums = [];

    this.props.musicData.tracks.items.forEach((e)=>{
      albums.push(<div> 
        <AlbumCover cover={e.track.album.images[0].url} link={e.track.album.external_urls.spotify} /> 
        <Artist name={e.track.artists["0"].name} link={e.track.artists["0"].external_urls.spotify} />
        <Play link={e.track.external_urls.spotify} />
        <Popularity pop={e.track.popularity} />
        {e.track.name} 
        {/*PLAY .tracks.items["0"].track.external_urls.spotify
      POPULARITY  .tracks.items["0"].track.popularity
      ARTIST NAME  .tracks.items["0"].track.artists["0"].name
      ARTIST LINK .tracks.items["0"].track.artists["0"].external_urls.spotify
      ALBUM LINK .tracks.items["0"].track.album.external_urls.spotify*/}
        </div>);
    })
    return(
      <div>
        {albums}
      </div>
    );
  };
}