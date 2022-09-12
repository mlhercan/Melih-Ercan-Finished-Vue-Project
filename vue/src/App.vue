<template>
  <nav class="navbar navbar-dark navbar-expand-lg justify-content-center">
    Student Registration Page  |
    <router-link to="/">HomePage</router-link> 
    <router-link to="/addStudent">AddStudent</router-link>
    <button class="btn btn-large btn-primary full-width mt-2" id="registernav-btn"
        @click="registerPush">Register </button> 
    <button class="btn btn-large btn-success btn-secondary full-width mt-2" id="loginnav-btn"
        @click="loginPush">Login </button> 
    <button class="btn btn-large btn-danger btn-secondary full-width mt-2" id="logoutnav-btn"
        @click="logoutPush">Logout </button> 
  </nav>
  <router-view/>
</template>
<script>
  export default{
    name:'NavBar',
    methods: {
      logoutPush(){
        localStorage.clear();
        this.$router.push('/login');
    },
      loginPush(){
        this.$router.push('/login');
    },
      registerPush(){
        this.$router.push('/register');
    },
    }
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  text-align: center;
}

nav a {
  text-align: right;
  color: #ffffff;
  font-weight: bold;
  padding-left: 25px;
  text-shadow: 0px 0px 6px rgb(83, 82, 82);
  
}
.navbar {
  background-color: rgb(253, 182, 1);
  font-weight: bold;
  color: #000000;
}

#loginnav-btn{
  margin-right: 20px;
  margin-left: 20px;
}
#registernav-btn{
  margin-left: 740px;
}

</style>
