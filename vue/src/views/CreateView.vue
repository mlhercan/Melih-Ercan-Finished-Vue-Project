<template>
  <div id="create">

    <div class="container form-create">
      <h4> <b>Create Student</b> </h4>
      <div class="col-md">
        <label class="pull-left"> First Name </label>
        <input type="text" class="form-control" v-model="nUser.first_name">
      </div>
      <div class="col-md">
        <label class="pull-left"> Last Name </label>
        <input type="text" class="form-control" v-model="nUser.last_name">
      </div>
      <div class="col-md">
        <label class="pull-left"> E-mail </label>
        <input type="text" class="form-control" v-model="nUser.email">
      </div>
      <div class="col-md">
        <label class="pull-left"> Phone Number </label>
        <input type="text" class="form-control" v-model="nUser.phone">
      </div><br>

      <button id="create-btn" type="submit" class="btn btn-large btn-block btn-success full-width"
        @click="addToAPI">Create</button><br><br>
    </div>

  </div>
</template>
  
<script>
/* eslint-disable */
import axios from 'axios';

export default {
  name: 'CreateView',
  data() {
    return {
      nUser: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      },
    }
  },
  created(){
    if(localStorage.getItem('token')===null){
      this.$router.push('/login');
    }
  },
  mounted() {
    axios.get('http://localhost:3000/user', { headers: { token: localStorage.getItem('token') } })
      .then(res => {
        console.log(res);
      })
  },
  methods: {
    addToAPI() {
      let register = {
        first_name: this.nUser.first_name,
        last_name: this.nUser.last_name,
        email: this.nUser.email,
        phone: this.nUser.phone,
      }
      axios.post('http://localhost:3000/create', register)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      window.location.href = '/';
    },

  },





}
</script>
  
<style>

</style>