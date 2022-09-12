
<template>
    <div id="register">

        <div class="container form-register">
            <h4> <b>Register</b> </h4>
            <div class="col-md">
                <label class="pull-left"> Username </label>
                <input type="text" class="form-control" v-model="nUser.user_name">
            </div>
            <div class="col-md">
                <label class="pull-left"> E-Mail </label>
                <input type="text" class="form-control" v-model="nUser.e_mail">
            </div>
            <div class="col-md">
                <label class="pull-left"> Password </label>
                <input type="password" class="form-control" v-model="nUser.pass_word">
            </div><br>

            <button id="register-btn" type="submit" class="btn btn-large btn-block btn-success full-width"
                @click="doRegister">Register</button><br><br>
        </div>

    </div>
</template>
  
<script>
/* eslint-disable */
import axios from 'axios';
export default {
    name: 'RegisterComp',
    data() {
        return {
            nUser: {
                user_name: "",
                e_mail: "",
                pass_word: "",
            },
        }
    },

    methods: {
        doRegister() {
            let registerUser = {
                user_name: this.nUser.user_name,
                e_mail: this.nUser.e_mail,
                pass_word: this.nUser.pass_word,
            }
            axios.post('http://localhost:3000/register', registerUser)
                .then((response) => {
                    console.log(response);
                    window.location.href = '/login'
                })
                .catch((err) => {
                    console.log(err);
                });
            ;
        },

    },





}
</script>
  
<style>

</style>