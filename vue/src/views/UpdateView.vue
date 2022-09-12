<template>
    <div id="update">

        <div class="container form-update">
            <h4> <b>Update Student</b> </h4>
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

            <button id="update-btn" type="submit" class="btn btn-large btn-block btn-success full-width"
                @click="updateToAPI(nUser.first_name, nUser.last_name, nUser.email, nUser.phone)">Update</button><br><br>
        </div>

    </div>
</template>
  
  <script>
/* eslint-disable */

import axios from 'axios';


export default {
    name: 'UpdateView',
    data() {
        return {
            id:this.$route.params.id,
            nUser: {
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
            },
        }
    },
    async mounted(){
        const previewData=await axios.get('http://localhost:3000/single/'+this.id)
        this.nUser=previewData.data
    },
    methods: {
        updateToAPI(first_name, last_name, email, phone) {
            let LastUpdated = {
                first_name: this.nUser.first_name,
                last_name: this.nUser.last_name,
                email: this.nUser.email,
                phone: this.nUser.phone,
            }
            axios.put('http://localhost:3000/update/' + this.id, LastUpdated)
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });
            window.location.href = '/';
        },
    }



}
</script>
  
  <style>
  </style>