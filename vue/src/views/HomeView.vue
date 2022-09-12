<template>
  
  <div id="home">

    <div id="createSection">
      <h5> Welcome to the Student Registration Page! Click the button for adding a student. </h5>
      <button id="create-btn" type="button" class="btn btn-large btn-success btn-secondary full-width mt-2"
        @click="goToCreate"><b>Add Student</b></button>

    </div>

    <div class="container cards mt-4" id="homepage">
      <div class="row" v-for="dbUser in nUser" :key="dbUser._id">
        <div class="card my-4 list-group-item-success shadow-lg">
          <div class="card-body">
            <div class="row align-items-center">

              <div class="col-sm-7">
                <ul class="list-group">
                  <li class="list-group-item fw-bold">Name : <span class="fw-normal">{{ dbUser.first_name }}</span></li>
                  <li class="list-group-item fw-bold">Surname : <span class="fw-normal">{{ dbUser.last_name }}</span>
                  </li>
                  <li class="list-group-item fw-bold">E-mail : <span class="fw-normal">{{ dbUser.email }}</span></li>
                  <li class="list-group-item fw-bold">Phone Number : <span class="fw-normal">{{ dbUser.phone }}</span>
                  </li>
                </ul>

              </div>
              <div class="col-sm-17 mt-2">
                <button class="btn btn-primary mx-1" @click="editPage(dbUser._id)">
                  <i class="fa fa-pen"></i>
                </button>

                <button class="btn btn-danger mx-1 " @click="DeleteToAPI(dbUser._id)">
                  <i class="fa fa-trash"></i>
                </button>

                <div class="form-update collapse" id="collapseExample1">
                  <div class="card card-body">
                    <div class="col-md">
                      <label class="justify-content-center"> First Name </label>
                      <input type="text" class="form-control" v-model="nUser.first_name">
                    </div>
                    <div class="col-md">
                      <label class="justify-content-center"> Last Name </label>
                      <input type="text" class="form-control" v-model="nUser.last_name">
                    </div>
                    <div class="col-md">
                      <label class="justify-content-center"> E-mail </label>
                      <input type="text" class="form-control" v-model="nUser.email">
                    </div>
                    <div class="col-md">
                      <label class="justify-content-center"> Phone Number </label>
                      <input type="text" class="form-control" v-model="nUser.phone">
                    </div><br>

                    <!-- <button id="close-btn" type="button"
                    class="btn btn-large btn-block btn-danger full-width justify-content-center my-1 "
                    data-bs-toggle="collapse">Close</button> -->
                    <button id="update-btn" type="submit"
                      class="btn btn-large btn-block btn-success full-width justify-content-center my-1"
                      @click="updateToAPI(dbUser._id, nUser.first_name, nUser.last_name, nUser.email, nUser.phone)">Update</button><br><br>
                  </div>
                  
                </div>







              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
/* eslint-disable */
import axios from 'axios';
import router from '../router/index.js';

export default {
  name: 'HomeView',
  data() {
    return {
      nUser: {
        _id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      },
      theUser:{
        user_name:"",
      }
    }
  },
  created(){
    if(localStorage.getItem('token')===null){
      this.$router.push('/login');
    }
  },
  mounted() {
    axios.get('http://localhost:3000/all')
      .then((response) => {
        console.log(response.data);
        this.nUser = response.data;
      })
      .catch((error) => {
        console.log(error);
      }),
    axios.get('http://localhost:3000/user',{headers: {token: localStorage.getItem('token')}})
    .then(res=>{
      console.log(res);
    })
  },
  methods: {
    goToCreate() {
      this.$router.push('/addStudent');
    },

    DeleteToAPI(delID) {
      axios.delete('http://localhost:3000/delete/' + delID)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      window.location.reload();
    },

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
      window.location.reload();
    },
    updateToAPI(theID, first_name, last_name, email, phone) {
      let LastUpdated = {
        first_name: this.nUser.first_name,
        last_name: this.nUser.last_name,
        email: this.nUser.email,
        phone: this.nUser.phone,
      }
      axios.put('http://localhost:3000/update/' + theID, LastUpdated)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      window.location.reload();
    },
    editPage(theStudentID){
      router.push({
        name: 'Update',
        params: {
          id: theStudentID,
        }
      })
    },
    logout(){
      localStorage.clear();
      this.$router.push('/login');
    }
  },





}
</script>

<style>
</style>