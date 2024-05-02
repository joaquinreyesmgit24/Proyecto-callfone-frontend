<template>
    <Sidebar @logout="logout()" :userName="getUsername" :userRol="getRolName"/>
    <div class="home-section">
        <Navbar @logout="logout()" :userName="getUsername"/>
      <div class="container-fluid">
        <Breadcrumb :breadcrumb="breadcrumb" :key="breadcrumbKey"/>
        <router-view @set-breadcrumb="setBreadcrumb"></router-view>
      </div>
    </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue'
import Sidebar from '../../components/Sidebar.vue'
import Breadcrumb from '../../components/Breadcrumb.vue'
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  components: { Navbar,Sidebar, Breadcrumb },
  data(){
    return({
      breadcrumb: null,
      breadcrumbKey: 0,
    })
  },
  methods:{
    ...mapActions(["logoutUser"]),
    setBreadcrumb(breadcrumb){
        this.breadcrumb = breadcrumb;
        this.breadcrumbKey += 1;
      },
    logout() {
        this.logoutUser().then(response => {
            this.$router.push({ name: "login" });
        })
    }
  },
  computed: {
        ...mapGetters(["getUsername","getRolName"]),
  }
}
</script>

<style>

</style>