<template>
    <div id="login">
     
      <div class="container form-login">
          <h4> <b>Login</b> </h4>
          <div class="col-md">
            <label class="pull-left"> Username </label>
            <input type="text" class="form-control" v-model="nUser.user_name"></div>
          <div class="col-md">
            <label class="pull-left"> Password </label>
            <input type="password" class="form-control" v-model="nUser.pass_word"></div><br>
          
          <button id="login-btn" type="submit" class="btn btn-large btn-block btn-success full-width" @click="doLogin">Login</button><br><br>
        </div> 
        
    </div>
  </template>
  
  <script>
  /* eslint-disable */
  import axios from 'axios';

  export default {
    name: 'LoginComp',
    data() {
      return {
        nUser:{
          user_name:"",
          pass_word:"",
        },
      }
    },
    
    methods:{
    doLogin(){
        let user={
          user_name:this.nUser.user_name,
          pass_word:this.nUser.pass_word,
        }
        axios.post('http://localhost:3000/login', user)
          .then(res=>{
            if(res.status===200){
              localStorage.setItem('token',res.data.token);
              window.location.href = '/';
            }
            })
          .catch((err)=>{
            alert("Login Failed");
            console.log(err);
          });
          
      },
    
    },
    
  
  
    
    
  }
  </script>
  
  <style>
  
  
  
  </style>