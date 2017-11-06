import { extendObservable } from 'mobx';
var axios = require("axios");

export default class UserStore {
  constructor() {
    extendObservable(this, {
      user: null,
      message: null,
      success: false,
      get retrieveUser() {
        return this.user
      }
    });
  
    console.log(this.user);
    // if ((this.user)) {
    //   axios.post('/getUser', {user: this.user.id}).then((success)=>{ // check if user is logged in and return the user obj
    //     this.success = success.data.success
    //   })
    // }
  }


  submitLogin(loginObj) {
    console.log(loginObj);
    return new Promise((resolve, reject) => {
    var url = '/login'; 
    axios.post(url, {email: loginObj.email,
      password: loginObj.password}).then((res)=>{
        if (res.data.success) { 
            this.user = res.data.user;
            this.message = res.data.message;
            this.success = res.data.success;
            // this.props.history.push("/"); 
        } else {
          reject(res.data);
        }
        resolve(res.data)
      });
    });
  }

  



}
  

    
