import { extendObservable } from 'mobx';
var axios = require("axios");

export default class TrackStore {
  constructor() {
    extendObservable(this, {
      musicData: null,
      message: null,
      initialized: false,
      playCount: []
      
    });
  
  }
    retrieveTracks() {
    console.log("HERE")
    return new Promise((resolve, reject) => {
      axios.get('/spotify').then((res)=>{
        console.log(res);
        if(res.data !== undefined){
          this.musicData = res.data;
          console.log(this.musicData);
        } else {
          reject(res.data);
        }
        resolve(res.data)
      });
    })
  }
  
  fetchPlayCount () { 
    // wrap your
    // logic fetching all the weather api data into a method.
    var url = '/tracks';
    axios.get(url).then((trackObj) => {
      if (trackObj !== undefined) {
        console.log(trackObj.data);
        this.playCount= trackObj.data;
        this.initialized = true;
        
      }  else {
        console.log('defined');
      }
    });
  }

}
  