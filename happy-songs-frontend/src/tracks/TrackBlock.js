import React, { Component } from 'react';
import AlbumCover from './AlbumCover.js';

export default class TrackBlock extends Component{
  constructor(){
    super();
  }
  render(){
    console.log("tb " +this.props);
    let trackBlockHTML = '';
    let albums = [];

    this.props.musicData.tracks.items.forEach((e)=>{
      
      albums.push(<div> <AlbumCover cover={e.track.album.images[0].url} /> {e.track.name} </div>);

      // trackBlockHTML += myAlbum;
      // trackBlockHTML += e.track.name;
    })
    // this.props.musicData.forEach(function(e) {
    //   //trackBlockHTML += <AlbumCover musicData={e}/>
    //   trackBlockHTML+='mew';
    // });

    console.log(albums);
    return(
      <div>
        {/* <AlbumCover cover={this.props.musicData.tracks.items[0].track.album.images[0].url} /> */}
        {albums}
      </div>
    );
  };
}