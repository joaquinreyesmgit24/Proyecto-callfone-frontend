<template>
	<div class="min-vh-100 d-flex align-items-center">
  <div class="container">
    <div class="row">
      <div class="col-sm-9 mx-auto">
        <div class="shadow-lg">
          <div class="d-flex align-items-center card-content">
            <div class="d-none d-md-block d-lg-block">
              <img src="../../../assets/img/img-2.jpg" class="objectFit"/>
            </div>
            <div class="p-4" id="formPanel">
              <div class="text-center mb-5">
                <h1 class="customHeading h3 text-uppercase">Bienvenido a Datavoz</h1>
              </div>
              <form @submit.prevent="login" >
                <div class="custom-form-group">
                  <label class="text-uppercase" for="nameUser">Nombre de usuario</label>
                  <input type="text" id="nameUser" class="pb-1" v-model.trim="user.nombre"/><span class="pb-1"><i class='bx bx-envelope'></i></span>
                </div>
                <div class="custom-form-group mt-3">
                  <label class="text-uppercase" for="password">Contraseña</label>
                  <input :type="inputType" id="password" class="pb-1" v-model.trim="user.password" /><span class="pb-1"><i id="showCursor" class="bx bx-low-vision" @click="togglePasswordType"></i></span>
                </div>
                <div class="mt-4">
                  <button class="w-100 p-2 d-block btn btn-primary custom-btn" type="submit">Iniciar sesión</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import "../../../store/index.js";
import { mapActions } from "vuex";
import { useToast } from "vue-toastification";

export default {
  name: "login",
  data() {
    return {
      user: { nombre:"",password:""},
      inputType: "password",
      toast: useToast()
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    login() {
      this.loginUser(this.user).then((response) => {
        if (response.status == 200) {
          this.resetDataUser();
          this.$router.push({ name: "home" });
        } 
      }).catch(e =>{
          let errors = e.response.data.errors;
          let error = e.response.data.error;
          if(errors){
              errors.forEach(error_element => {
                  this.toast.error(error_element.msg)
              });
          }
          else{
            this.toast.error(error)
          }
      })
    },
    resetDataUser() {
            this.user.nombre = "";
            this.user.password = "";
    },
    togglePasswordType() {
          this.inputType = this.inputType === 'password' ? 'text' : 'password';
        }
  },
};
</script>

<style>


</style>